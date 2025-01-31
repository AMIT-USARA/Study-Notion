const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


exports.createRating = async (req,res)=>{
    try{
        const {courseId,rating,review} = req.body;
        const userId = req.user.id;

        const courseDetails = await Course.findOne(
            {
                _id:courseId,
                studentsEnrolled:{$elematch:{$eq:userId}},

            }
        );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in the course",
            });
        }
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:`Course is already reviewed by the user`,
            });
        }
        const ratingReview = await RatingAndReview.create({
            rating,review,course:courseId,user:userId,
        });
        const UpdatedRatingAndReview = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                retingAndReviews:ratingReview._id,
            }
        },{new:true});
        console.log(UpdatedRatingAndReview);
        return res.status(200).json({
            success:true,
            message:`Rating And Review created successfully.`,
            ratingReview,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message,});
    }
};



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRatingReview = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}