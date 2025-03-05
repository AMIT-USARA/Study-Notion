import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourse from "./RenderCartCourse";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItem } = useSelector((state) => state.cart);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-8">
      <div className="w-9/12 bg-richblack-600 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist</h1>
        <p className="text-lg text-gray-600">{totalItem} Courses in cart</p>

        {total > 0 ? (
          <div className="mt-6">
            <RenderCartCourse />
            <RenderTotalAmount />
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">Your Cart is Empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
