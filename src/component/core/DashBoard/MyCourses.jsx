import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllCourses } from '../../../services/operations/profileAPI';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

function MyCourses() {
    const [allCourses, setAllCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const getAllCoursesData = useCallback(async () => {
        try {
            const response = await getAllCourses();
            if (Array.isArray(response)) {
                setAllCourses(response);
            } else {
                setAllCourses([]); // Ensures it's always an array
            }
            console.log("response getAllCourses:-", response);
        } catch (error) {
            console.log("Unable to Fetch All Courses.");
            setAllCourses([]); // In case of error, avoid breaking UI
        }
    }, []);

    useEffect(() => {
        getAllCoursesData();
    }, [getAllCoursesData]);



    return (
        <div className="min-h-screen  p-10">
            <h2 className="text-3xl font-bold text-left  mb-8">All Courses</h2>

            {allCourses.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No Courses Found.</p>
            ) : (
                <div className='grid grid-rows-1'>
<div className='grid grid-cols-12'>
                <div className='flex  items-center col-span-2'>Course</div>
                <div className='flex justify-center items-center col-span-6'></div>
                <div className='flex justify-center items-center col-span-1'>Status</div>
                <div className='flex justify-center items-center col-span-1'>Price</div>
                <div className='flex justify-center items-center col-span-1'>Action</div>
</div>
<div className='flex flex-col gap-4 '>{


allCourses.map((course, index) => {
    return (
        <div key={index} >
            {course.instructor._id === user._id ? <div key={course._id || index} className="grid  grid-cols-12  gap-4 shadow-lg rounded-xl overflow-hidden p-3">
                
                
                
                <div className='col-span-2 flex justify-center items-center '>
                    {course.thumbnail && (
                        <img
                            src={course.thumbnail}
                            alt={course.courseName}
                            className="w-3/4 object-cover rounded-lg  hover:scale-[1.1]"
                        />
                    )}

                </div>
                <div className='col-span-6  grid grid-row-4'>
                    <h3 className="text-xl font-semibold">{course.courseName}</h3>
                    <p className=" text-pure-greys-500 font-normal text-sm">{course.courseDescription}</p>
                    <p className="text-gray-600">Instructor: <span className="font-medium">{course?.instructor?.firstName} {course?.instructor?.lastName}</span></p>
                    
                    <p className="text-yellow-500 font-medium">Rating: {course.ratingAndReviews?.rating || "N/A"}</p>
                    <p className="text-gray-700">Students Enrolled: {course.studentsEnrolled.length}</p>
                    

                </div>

                <div className='col-span-1 flex flex-col items-center justify-evenly  '>
                <p className='text-sm w-fit p-2 text-yellow-5 bg-pure-greys-400 rounded-full block'>{course.status}</p>

                </div>
                <div className='col-span-1 flex flex-col items-center justify-evenly  '>
                    <div className=''><p className="text-gray-700 font-semibold mt-2"><span className="text-yellow-50">${course.price}</span></p></div>

                </div>

                <div className='col-span-1  flex items-center justify-evenly '>
                    <button><RiDeleteBin6Line /></button>
                    <button><MdOutlineEdit /></button>
                </div>

                

            </div> : <div></div>}

        </div>
    )
})}

</div>
                </div>
            )}
        </div>

    )
}

export default MyCourses

