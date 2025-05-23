
//create headler
const Course = require("../models/Course");
const Category = require("../models/categorym");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const multer = require('multer');
const path = require('path');

// // Configure multer storage
// const storage = multer.memoryStorage(); // Store file in memory for Cloudinary upload

// // File filter for images only
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
// };

// // Create multer middleware
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
//   fileFilter: fileFilter
// }).single('thumbnail'); // 'thumbnail' is the field name for the file input

// // Create handler

exports.createCourse = async (req, res) => {


    try {
        // Get user ID from request object

        const userId = req.user.id;

        // Get all required fields from request body
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        // Get thumbnail image from request files
        // const thumbnail = req.files.thumbnailFile;

        // Check if any of the required fields are missing
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            // !thumbnail ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        if (!status || status === undefined) {
            status = "Draft";
        }
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        // Check if the tag given is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }
        // // Upload the Thumbnail to Cloudinary
        // const thumbnailImage = await uploadImageToCloudinary(
        // 	thumbnail,
        // 	process.env.FOLDER_NAME
        // );
        // console.log(thumbnailImage);
        // Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            // thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        // Add the new course to the Categories
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        );
        // Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};
// get allcourses handler function

exports.getAllCourses = async (req,res) => {
    try{
            const allCourses = await Course.find({},{courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    courseDescription:true,
                                                    retingAndReviews:true,
                                                    studentsEnrolled:true,
                                                    status:true,
                                                })
                                                    .populate("instructor")
                                                    .exec();
            return res.status(200).json({
                success:true,
                message:"Data for all courses fetched successfully."
                ,data:allCourses,
            });
    }catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message:"Cannot fatch Course data.",
            error:error.message,
        });

    }
}

exports.getCourseDetails = async (req,res) =>{
    try{
        const {courseId} = req.body;
        const courseDetails = Course.find({_id:courseId}).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
            }
        ).populate("catagory").populate("retingAndReviews").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }
        return res.status(200).json({
            success:true,
            message:`Course details fetched successfully`,
            data:courseDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
}