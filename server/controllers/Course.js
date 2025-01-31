const Course = require("../models/Course");
const Category = require("../models/categorym");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


//create headler
exports.createCourse = async (req,res) =>{
    try{
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,category,tag,instructions} = req.body;
        let { status}  = req.body;
        const thumbnail = req.files.thumbnailImage;

        //validation
         if (!status || status === undefined) {
			status = "Draft";
		}

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag || !status || !instructions){
            return res.status(400).json({
                success:false,
                message:"All fields are required.",
            });
        }
        
        //
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
       
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor Details not found",
            });
        }
        console.log("Instructor Details: ",instructorDetails);
        //check given tag is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details not found",
            });
        }
    
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        // create an entry in db
        const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );


        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    course:newCourse._id,
                }
            },
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:"Course created successfully.",
            data:newCourse,
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create Course.",
            error:error.message,
        });

    }
}



// get allcourses handler function

exports.getAllCourses = async (req,res) => {
    try{
            const allCourses = await Course.find({},{courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    retingAndReviews:true,
                                                    studentsEnrolled:true,})
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