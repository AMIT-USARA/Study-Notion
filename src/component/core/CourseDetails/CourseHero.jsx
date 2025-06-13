import React from 'react'
import RatingStars from '../../comman/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

const CourseHero = ({ courseData }) => {
    const avgReviewCount = GetAvgRating(courseData?.data?.ratingAndReviews)

    return (
        <div className='bg-richblack-800'>
            <div className='mx-auto w-11/12 max-w-maxContent py-8'>
                {/* Breadcrumbs */}
                <div className='flex items-center gap-2 text-sm text-richblack-300 mb-4'>
                    <span>Home</span>
                    <span>/</span>
                    <span>Learning</span>
                    <span>/</span>
                    <span className='text-yellow-50'>
                        {courseData?.data?.category?.name}
                    </span>
                </div>

                {/* Course Title and Description */}
                <div className='mb-2'>
                    <h1 className='text-3xl font-bold text-richblack-5 mb-2'>
                        {courseData?.data?.courseName}
                    </h1>
                    <p className='text-richblack-200 max-w-3xl'>
                        {courseData?.data?.courseDescription}
                    </p>
                </div>

                {/* Rating and reviews */}
                <div className="flex items-center gap-2">
                    <span className="text-yellow-50 font-semibold">
                        {avgReviewCount?.toFixed(1) || 0}
                    </span>
                    <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
                    <span className="text-richblack-300 text-sm">
                        ({courseData?.data?.ratingAndReviews?.length || 0} ratings)
                    </span>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-2 mt-2 text-richblack-50">
                    <span>
                        Created by {courseData?.data?.instructor?.firstName} {courseData?.data?.instructor?.lastName}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CourseHero;