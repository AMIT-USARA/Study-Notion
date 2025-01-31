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
        console.log(categoryDetails);

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
		// Extract categoryId from the request body
		const { categoryId } = req.body;

		// Validate if categoryId is provided
		if (!categoryId) {
			return res.status(400).json({
				success: false,
				message: "Category ID is required.",
			});
		}

		// Fetch the selected category and its courses
		const selectedCategory = await Category.findById(categoryId)
			.populate("courses") // Include the 'courses' field linked with this category
			.lean(); // Optimize query by returning plain JavaScript object
			// .exec();
		// Check if the category exists
		if (!selectedCategory) {
			return res.status(404).json({
				success: false,
				message: "Category not found.",
			});
		}

		// Extract courses from the selected category
		const selectedCourses = selectedCategory.courses || [];
		if (selectedCourses.length === 0) {
			// If no courses are available in the selected category
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}

		// Fetch all categories except the selected one, along with their courses
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId }, // Exclude the selected category
		})
			.populate("courses") // Include their linked courses


			// .lean(); // Optimize the query by reducing overhead
			
			
			.exec();
		// Combine courses from other categories into a single array
		const differentCourses = categoriesExceptSelected.flatMap(
			(category) => category.courses
		);

		// Fetch all categories and their courses to calculate top-selling courses
		const allCategories = await Category.find().populate("courses").lean();

		// Flatten all courses from all categories into a single array
		const allCourses = allCategories.flatMap((category) => category.courses);

		// Sort the courses by their 'sold' count in descending order and get the top 10
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		// Send the response with all the required details
		res.status(200).json({
			success: true,
			selectedCourses, // Courses in the selected category
			differentCourses, // Courses from other categories
			mostSellingCourses, // Top 10 best-selling courses across all categories
		});
	} catch (error) {
		// Log the error for debugging
		console.error("Error fetching category page details:", error);

		// Send a 500 response in case of any server-side error
		res.status(500).json({
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


