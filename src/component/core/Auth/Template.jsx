import React from 'react'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import frameImage from '../../../assets/Images/frame.png'
import { FcGoogle } from 'react-icons/fc'
import { useSelector } from 'react-redux';


const Template = ({ title, desc1, desc2, image, formtype }) => {
  const { loading } = useSelector((state) => state.auth)
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (

        <div className='flex lg:justify-between justify-center w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0'>
          <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
            <p className='text-[1.125rem] leading-[1.625rem] mt-4 flex flex-col'>
              <span className='text-richblack-100'>{desc1}</span>
              <span className='text-blue-100 italic'>{desc2}</span>
            </p>

            {formtype === 'signup' ? (<SignupForm />) : (<LoginForm />)}

            <div className='flex w-full items-center my-4 gap-x-2'>
              <div className='bg-richblack-700 w-full h-[1px]'></div>
              <p className='font-medium leading-[1.375rem] text-richblack-700'>OR</p>
              <div className='bg-richblack-700 w-full h-[1px]'></div>
            </div>
            <button className='w-full text-white flex justify-center items-center rounded-[8px] font-medium to-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>
              <FcGoogle></FcGoogle>
              <p>Sign in With Google</p></button>
          </div>
          <div className='relative lg:block hidden w-11/12 max-w-[450px]'>
            <img src={frameImage}
              alt="students"
              width={558}
              height={490}
              loading='lazy' />
            <img src={image}
              alt="Pattern"
              width={558}
              height={504}
              loading='lazy'
              className='absolute -top-4 right-4'
            />
          </div>
        </div>
      )}
      </div>
      )
      }

      export default Template
