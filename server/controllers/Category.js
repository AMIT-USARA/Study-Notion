const Category = require("../models/categorym");



exports.createCategory = async (req,res) =>{
    try{
        //fatch data
        const {name,description} = req.body;
        // validation 
        if(!name || !description){
            return res.status(400).json({
                success:true,
                message:"All fields are required.",
            })
        }
        // create entry in db
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully."
        })



    }catch(error){
        return res.status(500).json({
            success:false,
        message:error.message,
        });
    }
};



exports.showAllCategories = async (req,res) =>{
    try{
        const allCategorys = await Category.find({},{name:true,description:true}); // no any sfacific property are define for find but make you will get data must be included name and description.
        return res.status(200).json({
            susccess:true,
            message:"All Category returned successfully.",
            data:allCategorys,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
        message:error.message,
        });
    }
}; 




exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // Validate categoryId
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Get selected category with published courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();


    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Get other categories excluding the selected one
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    }).populate({
      path: "courses",
      match: { status: "Published" },
      populate: {
        path: "instructor",
      },
    });

    // Find a random different category with courses
    let differentCategory = null;
    const categoriesWithCourses = otherCategories.filter(
      (cat) => cat.courses && cat.courses.length > 0
    );

    if (categoriesWithCourses.length > 0) {
      differentCategory =
        categoriesWithCourses[
          Math.floor(Math.random() * categoriesWithCourses.length)
        ];
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: {
        path: "instructor",
      },
    });

    const allCourses = allCategories.flatMap(
      (category) => category.courses || []
    );
    
    const mostSellingCourses = allCourses
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 10);

    // Prepare response data
    const responseData = {
      selectedCategory: {
        ...selectedCategory.toObject(),
        courses: selectedCategory.courses || [],
      },
      differentCategory: differentCategory
        ? {
            ...differentCategory.toObject(),
            courses: differentCategory.courses || [],
          }
        : null,
      mostSellingCourses,
    };

    return res.status(200).json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error in categoryPageDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// exports.categoryPageDetails = async (req, res) => {
// 	try {
// 		const { categoryId } = req.body;

// 		// Get courses for the specified category
// 		const selectedCategory = await Category.findById(categoryId)
// 			.populate("courses")
// 			.exec();
// 		console.log(selectedCategory);
// 		// Handle the case when the category is not found
// 		if (!selectedCategory) {
// 			console.log("Category not found.");
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Category not found" });
// 		}
// 		// Handle the case when there are no courses
// 		if (selectedCategory.courses.length === 0) {
// 			console.log("No courses found for the selected category.");
// 			return res.status(404).json({
// 				success: false,
// 				message: "No courses found for the selected category.",
// 			});
// 		}

// 		const selectedCourses = selectedCategory.courses;

// 		// Get courses for other categories
// 		const categoriesExceptSelected = await Category.find({
// 			_id: { $ne: categoryId },
// 		}).populate("courses");
// 		let differentCourses = [];
// 		for (const category of categoriesExceptSelected) {
// 			differentCourses.push(...category.courses);
// 		}

// 		// Get top-selling courses across all categories
// 		const allCategories = await Category.find().populate("courses");
// 		const allCourses = allCategories.flatMap((category) => category.courses);
// 		const mostSellingCourses = allCourses
// 			.sort((a, b) => b.sold - a.sold)
// 			.slice(0, 10);

// 		res.status(200).json({
// 			selectedCourses: selectedCourses,
// 			differentCourses: differentCourses,
// 			mostSellingCourses: mostSellingCourses,
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 			error: error.message,
// 		});
// 	}
// };


