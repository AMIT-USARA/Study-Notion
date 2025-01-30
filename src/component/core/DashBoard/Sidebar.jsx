import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { VscSettingsGear } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../comman/ConfirmationModal'
function Sidebar() {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading.....
            </div>
        )

    }

    return (
        
        <div className={`relative h-full w-[250px]`}>    
            <div className={`flex min-w-[222px] h-full ${open ? "blur-sm w-[100vw] h-[100vh] overflow-hidden" : "blur-0"} flex-col border-r-[1px] border-r-richblack-700 h-full bg-richblack-800 pt-10 pb-2`}> 
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link, index) => {

                            if (link.type && user?.accountType !== link.type) {
                                return null;
                            }
                            return (

                                <SidebarLink link={link} key={link.id} iconName={link.icon} />
                            )
                        }
                        )
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '>

                </div>
                <div className='flex flex-col'>
                    <SidebarLink link={{ name: "Setting", path: "dashboard/settings" }}
                        iconName='VscSettingsGear'>
                    </SidebarLink>
                    <button onClick={() => {
                        setConfirmationModal({

                            text1: "Are you sure?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => {
                                dispatch(logout(navigate));
                                setOpen(false);
                             },
                            btn2Handler: () => { setConfirmationModal(null);
                                setOpen(false);
                             },
                        }
                        );
                        setOpen(true);
                    }}
                        className='text-sm font-medium text-richblack-300'
                    >
                        <div className='flex gap-2 items-center px-[33px] py-[10px] text-white '>
                            <VscSignOut className='text-lg' />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className='absolute top-[32%] xl:left-[300%] lg:left-[150%] sm:left-[100%] left-[50%] max-430:left-[20%] w-full '>
                {
                    confirmationModal && <ConfirmationModal modalData={confirmationModal} />
                }
            </div>

        </div>
    )
}

export default Sidebar
