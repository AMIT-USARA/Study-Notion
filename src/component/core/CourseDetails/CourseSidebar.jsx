import React, { useState } from 'react'
import { FaFileCircleCheck } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../../../services/operations/studentFeaturesAPI';

const CourseSidebar = ({ courseData }) => {
const [loading,setLoading] = useState(false);
const navigate = useNavigate();
const {user} = useSelector((state)=>state.profile);
const {token} = useSelector((state)=>state.auth);
const dispatch = useDispatch();
const {courseId} = useParams();
    const handleBuyCourse=()=>{
        if(token){
            buyCourse(token,[courseId],user,navigate,dispatch);
            return;
        }
    }


    const handleOnClick = () =>{
        
        navigate("/dashboard/wishlist")
    }

    // Calculate total duration
    const calculateTotalDuration = () => {
        if (!courseData?.data?.courseContent) return "0 hours"
        
        let totalMinutes = 0
        courseData.data.courseContent.forEach(section => {
            section.subSection.forEach(sub => {
                const [minutes, seconds] = sub.timeDuration.split(":").map(Number)
                totalMinutes += minutes + (seconds / 60)
            })
        })
        
        const hours = Math.floor(totalMinutes / 60)
        const remainingMinutes = Math.round(totalMinutes % 60)
        
        return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''} ${remainingMinutes > 0 ? `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : ''}`.trim()
    }

    return (
        <div className='bg-richblack-800 p-6 rounded-lg sticky top-4'>
            {/* Course Thumbnail */}
            <img 
                src={courseData?.data?.thumbnail} 
                alt={courseData?.data?.courseName}
                className='w-full h-48 object-cover rounded-lg mb-4'
            />

            {/* Price */}
            <div className='text-3xl font-bold mb-4'>
                ₹ {courseData?.data?.price}
            </div>

            {/* Buttons */}
            <div className='space-y-3 mb-6'>
                <button onClick={()=>handleBuyCourse()} className='w-full bg-yellow-50 text-richblack-900 py-2 rounded-lg font-semibold hover:bg-yellow-25 transition-all duration-200'>
                    Buy now
                </button>
                <button onClick={handleOnClick} className='w-full bg-richblack-700 text-richblack-5 py-2 rounded-lg font-semibold hover:bg-richblack-600 transition-all duration-200'>
                    Add to Cart
                </button>
            </div>

            {/* Guarantee */}
            <div className='text-center text-richblack-200 mb-6'>
                30-Day Money-Back Guarantee
            </div>

            {/* Course Includes */}
            <div>
                <h3 className='font-semibold mb-3'>This course includes:</h3>
                <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                        <span>✓</span>
                        <span>{calculateTotalDuration()} on-demand video</span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <span><FaFileCircleCheck /></span>
                        <span>Certificate of completion</span>
                    </li>
                </ul>
            </div>

            {/* Share Button */}
            <button className='w-full mt-6 text-yellow-50 font-semibold py-2 rounded-lg border border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-200'>
                Share
            </button>
        </div>
    )
}

export default CourseSidebar;