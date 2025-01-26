import React from 'react'
import sidebarLinks from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useSelector } from 'react-redux'

function Sidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => { state.auth });

    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading.....
            </div>
        )

    }

    return (
        <div>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link,index)=>(
                            <div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar
