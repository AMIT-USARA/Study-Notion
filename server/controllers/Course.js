const Course = require("../models/Course");
const Category = require("../models/categorym");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require('../models/Section');
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get instructor ID from authenticated user
    const userId = req.user.id;

    // Extract course details from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tags,
      category,
      status,
      instructions,
    } = req.body;

    // Get thumbnail image from uploaded files
    const thumbnail = req.files.thumbnailFile;

    // Validate required fields
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tags ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Set default status if not provided
    if (!status || status === undefined) {
      status = "Draft";
    }

    // Verify the user is an instructor
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // Check if category exists
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Upload thumbnail to cloud storage
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME || "CourseImage"
    );

    // Create new course document
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tags: tags,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // Add course to instructor's profile
    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Add course to category
    await Category.findByIdAndUpdate(
      category,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Return success response
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Course creation failed",
      error: error.message,
    });
  }
};

// Get all published courses
exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses with selected fields
    const allCourses = await Course.find({}, {
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      courseDescription: true,
      retingAndReviews: true,
      studentsEnrolled: true,
      status: true,
    })
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}

// Get detailed information for a specific course
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    // Find course and populate related data
    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("retingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        }
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Course not found with ID: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Course details fetched`,
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Update an existing course
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    // Find course with current category
    const course = await Course.findById(courseId).populate('category');
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Handle category changes if needed
    const oldCategoryId = course.category?._id || course.category;
    const newCategoryId = updates.category;

    if (newCategoryId && newCategoryId !== oldCategoryId.toString()) {
      // Remove from old category
      if (oldCategoryId) {
        await Category.findByIdAndUpdate(
          oldCategoryId,
          { $pull: { courses: courseId } }
        );
      }

      // Add to new category
      await Category.findByIdAndUpdate(
        newCategoryId,
        { $addToSet: { courses: courseId } },
        { new: true }
      );

      course.category = newCategoryId;
    } else if (newCategoryId && newCategoryId === oldCategoryId.toString()) {
      delete updates.category;
    }

    // Handle thumbnail update
    if (req.files?.thumbnailFile) {
      const thumbnail = req.files.thumbnailFile;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME || "CourseImage"
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update other fields
    const fieldsToExclude = ['thumbnailFile', 'courseId', 'category'];
    for (const key in updates) {
      if (updates.hasOwnProperty(key) && !fieldsToExclude.includes(key)) {
        try {
          // Handle JSON string fields
          if (key === "tags" || key === "instructions") {
            course[key] = typeof updates[key] === 'string' ?
              JSON.parse(updates[key]) :
              updates[key];
          } else {
            course[key] = updates[key];
          }
        } catch (error) {
          console.error(`Error updating field ${key}:`, error);
        }
      }
    }

    // Save updated course
    await course.save();

    // Return fully populated course data
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" }
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" }
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error during update",
      error: error.message,
    });
  }
};

// Get complete course details including progress
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    // Find course with all related data
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    // Get user's progress in this course
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Course not found with ID: ${courseId}`,
      })
    }

    // Calculate total course duration
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos || [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get all courses for an instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id

    // Find all courses by this instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to get instructor courses",
      error: error.message,
    })
  }
}

// Delete a course and all its components
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course to delete
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Remove course from enrolled students
    const studentsEnrolled = course?.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete all sections and subsections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId)
      if (section) {
        // Delete all subsections
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Finally delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    })
  }
}