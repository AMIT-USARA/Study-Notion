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
    <div className="space-y-4">
      {/* Headings */}
      <div className="flex rounded-t-lg bg-richblack-500">
        <p className="w-[60%] px-5 py-3">Course Name</p>
        <p className="w-[20%] px-2 py-3">Price</p>
        <p className="w-[20%] px-2 py-3">Action</p>
      </div>
      
      {/* Course Items */}
      {cart.map((course, i, arr) => (
        <div
          className={`flex items-center border border-richblack-700 ${
            i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
          }`}
          key={i}
        >
          {/* Course Name and Info */}
          <div className="flex w-[60%] items-center gap-4 px-5 py-3">
            <img
              src={course?.thumbnail}
              alt="course_img"
              className="h-14 w-14 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{course.courseName}</p>
              <div className="flex items-center text-yellow-100 text-xs">
                <span className="font-medium mr-1">4.8</span>
                <ReactStars
                  count={5}
                  size={14}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<IoIosStarOutline />}
                  halfIcon={<IoIosStarHalf />}
                  fullIcon={<IoIosStar />}
                />
                <span className="ml-2 text-richblack-300">
                  ({course?.ratingAndReviews?.length} ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="w-[20%] px-2 py-3 text-yellow-50">
            Rs {course?.price}
          </div>

          {/* Remove Button */}
          <div className="w-[20%] px-2 py-3">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center text-pink-300 hover:text-pink-200 transition-all duration-200"
              title="Remove"
            >
              <RiDeleteBin6Line size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourse;