
import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {
  return (
    <div className="bg-richblack-700 w-full p-6 rounded-lg shadow-lg">
      <div>
        <p className="mb-4 text-lg font-semibold">
            {modalData.text1}
        </p>
        <p className="mb-4 text-sm text-gray-600">
            {modalData.text2}
        </p>

        <div className="flex justify-between">
            <IconBtn 
                onClick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
                active='true'
                className="mr-2"
            />
            <IconBtn onClick={modalData?.btn2Handler}>
                {modalData?.btn2Text}
            </IconBtn>
        </div>
      </div>
    </div>
  )
}


export default ConfirmationModal