


import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/api'
import { FaStar } from 'react-icons/fa'

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;       


    useEffect(() => {
        const fetchAllReviews = async () => {
            const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
           // console.log("LOgging response in rating", data?.data?.highRatingReviews);

            if (data?.success) {
                setReviews(data?.data?.highRatingReviews);
            }

           // console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);


    return (
        <div className='text-center w-9/12 mb-24'>
            <p className='text-3xl '>Reviews from other learners</p>
            <div className='text-white mt-10'>

                <div className='h-[190px] max-w-maxContent'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={24}
                        loop={true}
                        freeMode={true}
                        autoplay={{
                            delay: 2500,
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className='w-full '
                    >

                        {
                            reviews.map((review, index) => (
                                <SwiperSlide key={index} className='bg-brown-900  p-3 rounded-xl  flex-wrap max-w-[410px] min-w-[270px]'>

                                    <div className='flex items-center gap-4 w-full'>
                                        <img
                                            src={review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                            alt='Profile Pic'
                                            className='h-9 w-9 object-cover rounded-full'
                                        />
                                        <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                    </div>
                                     <div className='flex items-center px-3'>
                                        <p>
                                            {review?.rating.toFixed(1)}
                                        </p>
                                        <div>
                                            <ReactStars
                                                count={5}
                                                value={review.rating}
                                                size={20}
                                                edit={false}
                                                activeColor="#ffd700"
                                                emptyIcon={<FaStar />}
                                                fullIcon={<FaStar />}
                                            />
                                        </div>
                                    </div>

                                    <p className='px-3 text-left'>{review?.course?.courseName}</p>
                                    <p className='px-3 text-left'>
                                        {review?.review}
                                    </p>
                                   
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </div>

        </div>
    )
}

export default ReviewSlider
