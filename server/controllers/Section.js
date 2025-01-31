const Section = require("../models/Section");
const Course = require("../models/Course");


exports.createSection = async (req,res)=>{
    try{
        //data Fetch
        const {sectionName,courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",

            });
        }

        const newSection = await Section.create({sectionName});

        // HW:use populate to replace section/sub-section boyh in the updatedCourseDetails  ::done


        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id, // Push the new section ID into courseContent
                },
            },
            {
                new: true, // Return the updated document
            }
        ).populate('courseContent').exec();


        // return response

        return res.status(200).json({
            success:true,
            message:"section created successfully.",
            updatedCourseDetails,
        });






    }catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to create section, please try again",
            error:error.message,
        });
    }
}



exports.updateSection = async (req,res)=>{
    try{
        //data input

        const {sectionName,sectionId} = req.body;



        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"missing Properties",
            });
        }
        //update data

        const section  = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});



        //return response;

        return res.status(200).json({
            success:true,
            message:section,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to update section, please try again",
            error:error.message,
        });
    }
}



exports.deleteSection = async (req,res) =>{
    try{
        //get id
        const {sectionId} = req.params;
        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);
        // return response
        return res.status(200).json({
            success:true,
            message:"section Deleted successfully.",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to Delete section, please try again",
            error:error.message,
        });
    }
}