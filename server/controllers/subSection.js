const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();
exports.createSubSection = async (req, res) => {
    try {
        // fetch data from req.body

        const { sectionId, title, timeDuration, description } = req.body;

        //extract file /video

        const video = req.files.videoFile;
        // const thumbnail = req.files.thumbnailImage;
        console.log("video:-",video);
        console.log(sectionId,title,timeDuration,description);
        //validetion

        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are reqired",
            });
        }

        //upload video to cloudinary 
        console.log("hello jee11");
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);


        console.log("hello jee2");

        //create a subsection

        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })

        console.log("hello jee");

        //update section with this section objectId. 

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: SubSectionDetails._id,
                }
            },
            { new: true }
        ).populate("subSection").exec();

        console.log(updatedSection);

        //return response
        return res.status(200).json({
            success: true,
            message: "Sub-section created successfully.",
            data:updatedSection,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server mai error",
            error: error.message,
        });
    }
};


exports.updateSubSection = async (req, res) => {
    try {
        //data input

        const { title, subSectionId, videoUrl } = req.body;



        //data validation
        if (!title || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "missing Properties",
            });
        }
        //update data

        const updetedSubSection = await SubSection.findByIdAndUpdate(subSectionId, { title: title, videoUrl: videoUrl }, { new: true });



        //return response;

        return res.status(200).json({
            success: true,
            message: "SubSection Updated successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to update Subsection, please try again",
            error: error.message,
        });
    }
}



exports.deleteSubSection = async (req, res) => {
    try {
        //get id
        const { subSectionId } = req.params;
        //use findByIdAndDelete
        await Section.findByIdAndDelete(subSectionId);
        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-section Deleted successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to Delete Sub-section, please try again",
            error: error.message,
        });
    }
}