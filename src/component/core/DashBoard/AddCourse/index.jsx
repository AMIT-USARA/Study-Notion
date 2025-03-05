import React from 'react'
import RenderStaps from './RenderStaps'

function AddCourse() {
  return (
    <div>
      <div>
        <h1>
            Add Course
        </h1>
        <div>
            <RenderStaps/>
        </div>
      </div>
      <div className='w-[384px] h-[390px] text-[#F1F2FF] bg-[#161D29] border-[1px] border-[#2C333F] rounded-lg flex flex-col items-center justify-center gap-[19px] p-[24px]'>
        <p className='w-[336px] h-[26px] font-semibold text-[18px] leading-[26px] text-[#F1F2FF]'>⚡Course Upload Tips</p>
        <ul className='w-[336px] h-[297px] gap-[11px] text-[#F1F2FF]'>
            <li className='w-full h-[20px] text-[1px] font-medium leading-[20px]'>Set the Course Price option or make it free.</li>
            <li className='w-full h-[20px] text-[12px] font-medium leading-[20px]'>Standard size for the course thumbnail is 1024x576.</li>
            <li className='w-full h-[20px] text-[12px] font-medium leading-[20px]'>Video section controls the course overview video.</li>
            <li className='w-full h-[40px] text-[12px] font-medium leading-[20px]'>Course Builder is where you create & organize a course.</li>
            <li className='w-full h-[40px] text-[12px] font-medium leading-[20px]'>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li className='w-full h-[40px] text-[12px] font-medium leading-[20px]'>Information from the Additional Data section shows up on the course single page.</li>
            <li className='w-full h-[20px] text-[12px] font-medium leading-[20px]'>Make Announcements to notify any important</li>
            <li className='w-full h-[20px] text-[12px] font-medium leading-[20px]'>Notes to all enrolled students at once.</li>

        </ul>
      </div>
    </div>
  )
}

export default AddCourse


