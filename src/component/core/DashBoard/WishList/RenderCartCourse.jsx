import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../Slices/cartSlice";

function RenderCartCourse() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="mt-6 space-y-6">
      {cart.map((course, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          {/* Thumbnail & Course Info */}
          <div className="flex items-center space-x-4">
            <img
              src={course?.thumbnail}
              alt="CourseThumbnail"
              className="w-28 h-20 object-cover rounded-lg"
            />
            <div>
              <p className="text-lg font-semibold text-gray-900">{course.courseName}</p>
              <p className="text-sm text-gray-600">{course?.category?.name}</p>
              <div className="flex items-center text-yellow-500 text-sm mt-1">
                <span className="font-medium">4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<IoIosStarOutline />}
                  halfIcon={<IoIosStarHalf />}
                  fullIcon={<IoIosStar />}
                />
                <span className="ml-2 text-gray-600">{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
          </div>

          {/* Price & Remove Button */}
          <div className="flex items-center space-x-6">
            <p className="text-lg font-semibold text-blue-600">Rs {course?.price}</p>
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center text-red-500 hover:text-red-700 transition duration-200"
            >
              <RiDeleteBin6Line size={20} />
              <span className="ml-1 text-sm font-medium">Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourse;
  