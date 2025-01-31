const Profile = require("../models/Profile");
const User = require("../models/User");
const cloudinary=require("../config/cloudinary");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.updateProfile = async (req,res) =>{
    try{
        //get data
        const {dateOfBirth='',about="",contectNumber="",gender=""} = req.body;
        //get userId
        const id = req.user.id;
        // console.log(id);
        console.log(contectNumber);
        console.log(about);
        console.log(gender);
        console.log(dateOfBirth);

        //validation
        // console.log(formData)
        if(!contectNumber || !gender || !id || !dateOfBirth || !about){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile using :- save() -: methode.
        profileDetails.dateOfBirth = dateOfBirth;
        
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contectNumber = contectNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated successfully.",
            profileDetails,
        });


    }
    catch(error){
      
        return res.status(500).json({
            success:false,
            message:"Issue occure in Updating Profile,please try again.",
            error:error.message,
        });
    }
};


exports.deleteAccount = async (req,res) => {
    try{
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //delete user
        await User.findByIdAndDelete({_id:id});
        //return response.
        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully.",
        })
    }catch(error){
      console.log(error);
        return res.status(500).json({
            success:false,
            message:"Not Delete your account,please try again.",
            error:error.message,
        });
    }
};



exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//updateDisplayPicture

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      console.log(image);
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  };