import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import { BsCheckCircleFill } from "react-icons/bs";
import { TbClockHour3Filled } from "react-icons/tb";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import ConfirmationModal from '../../../comman/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../Slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';

function CoursesTable({ courses, setCourses }) {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId: courseId }, token);
        let result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    return (
        <div className='w-full box-border'>
            <Table className='w-full'>
                <Thead className='border-2 box-border border-pure-greys-700 rounded-lg'>
                    <Tr className='text-left'>
                        <Th className='px-4 py-3 text-richblack-50 font-medium'>Courses</Th>
                        <Th className='px-4 py-3 text-richblack-50 font-medium'>Duration</Th>
                        <Th className='px-4 py-3 text-richblack-50 font-medium'>Price</Th>
                        <Th className='px-4 py-3 text-richblack-50 font-medium'>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses.length === 0 ? (
                        <Tr>
                            <Td colSpan={4} className='text-center py-8 text-richblack-100'>
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => (
                            <Tr key={course._id} className='hover:border-2  hover:border-pure-greys-800'>
                                <Td className='px-4 py-6 flex flex-col md:flex-row gap-4'>
                                    <img
                                        src={course?.thumbnail}
                                        className='h-[150px] w-[220px] rounded-lg object-cover object-top'
                                        alt="Course Thumbnail"
                                    />
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-lg font-medium text-richblack-5'>{course.courseName}</p>
                                        <p className='text-sm text-richblack-100 line-clamp-2'>{course.courseDescription}</p>
                                        <p className='text-xs text-richblack-400 mt-2'>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                            <div className="mt-2 w-fit flex items-center gap-2 rounded-full bg-richblack-700 px-3 py-1 text-pink-200">
                                                <TbClockHour3Filled className="text-sm" />
                                                <p className="text-xs font-medium">DRAFT</p>
                                            </div>
                                        ) : (
                                            <div className="mt-2 w-fit flex items-center gap-2 rounded-full bg-richblack-700 px-2 py-1 text-yellow-100">
                                                <BsCheckCircleFill className="text-sm" />
                                                <p className="text-xs">PUBLISHED</p>
                                            </div>
                                        )}
                                    </div>
                                </Td>
                                <Td className='px-4 py-6 text-richblack-100'>
                                    2hr 30min
                                </Td>
                                <Td className='px-4 py-6 text-richblack-100'>
                                    ${course.price}
                                </Td>
                                <Td className='px-4 py-6'>
                                    <div className='flex items-center gap-4'>
                                        <button
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                                // edit
                                            }}
                                            className='text-richblack-300 hover:text-caribbeangreen-300 transition-all duration-200'
                                            title="Edit"
                                        >
                                            <MdOutlineModeEditOutline className="text-xl" />
                                        </button>
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => { },
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }}
                                            className='text-richblack-300 hover:text-pink-500 transition-all duration-200'
                                            title="Delete"
                                        >
                                            <TiDelete className="text-xl" />
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CoursesTable