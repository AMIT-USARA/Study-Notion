import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/core/DashBoard/Sidebar';
function DashBoard() {

  const {loaading:authLoading} = useSelector((state)=>{state.auth});
  const {loaading:profileLoading} = useSelector((state)=>{state.profile});

  if(authLoading || profileLoading){
    return (
      <div className='mt-20 text-white'>
        Loading...
      </div>
    )
  }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar></Sidebar>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>

        </div>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
          <Outlet></Outlet>
        </div>
    </div>
    )
}

export default DashBoard
