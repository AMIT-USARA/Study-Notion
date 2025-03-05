import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../comman/IconBtn";

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought These Courses: ", courses);
  };

  return (
    <div className="mt-8 p-6 bg-richblack-700 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold text-gray-800">Total:</p>
        <p className="text-2xl font-bold text-blue-600">Rs {total}</p>
      </div>
      <IconBtn
        text="Buy Now"
        active={true}
        onClick={handleBuyCourse}
        customClasses="w-full mt-4 py-3 text-lg"
      />
    </div>
  );
}

export default RenderTotalAmount;
