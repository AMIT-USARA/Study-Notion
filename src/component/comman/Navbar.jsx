// import React, { useEffect, useState } from 'react'
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import NavbarLinks from "../../data/navbar-links"
// import { Link } from 'react-router-dom';
// import { matchPath } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import ProfileDropDown from '../core/Auth/ProfileDropDown';
// import { apiConnector } from '../../services/apiconnector';
// import { categories } from '../../services/api';
// import { MdKeyboardArrowDown } from "react-icons/md";





// function Navbar() {
//     console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     const { totalItams } = useSelector((state) => state.cart);
//     const location = useLocation();

//     const [sublinks, setSubLinks] = useState([]);



//     const fetchSublinks = async () => {
//         try {
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             console.log("Printing Sublinks result:",result)
//             setSubLinks(result?.data?.data || []);
//         } catch (error) {
//             console.error("Could not fetch the category list:", error.message);
//         }
//     };
//     useEffect(() => {
//         fetchSublinks();
//     }, [])


//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);// match path for yellow color 
//     }

//     return (
//         <div className='w-[100vw] overflow-x-hidden h-16 flex items-center justify-center border-b-[1px] border-[#2C333F] '>
//             <div className='w-8/12  h-full flex items-center justify-between'>
//                 <Link to='/' className='h-[32px] w-[160px]'>
//                     <img src={logo} alt="" />
//                 </Link>
//                 <nav >
//                     <ul className='bg-richblack-700 h-[32px] text-[#DBDDEA] items-center flex gap-6'>
//                         {
//                             NavbarLinks.map((item, idx) => {
//                                 return (
//                                     <li key={idx}>
//                                         {
//                                             item.title === "Catalog" ? (
//                                                 <div className='flex gap-1 static items-center justify-center group'>
//                                                     <p>{item.title}</p>
//                                                     <MdKeyboardArrowDown />

//                                                     <div className='`invisible opacity-0 group-hover:visible group-hover:opacity-[100%] absolute top-[55px] ml-[90px] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900  transition-all duration-200  w-[300px]'>
//                                                         <div className='absolute left-[41%]  top-[-5px] h-6 w-6  rotate-45 rounded bg-richblack-5'>
//                                                         </div>
//                                                         <div className='flex flex-col'>
//                                                             {sublinks.length ? (
//                                                                 sublinks.map((subLink, index) => (
//                                                                     <Link key={index} to={subLink.link} className="hover:text-richblack-700">
//                                                                         {subLink.title}
//                                                                     </Link>
//                                                                 ))
//                                                             ) : (
//                                                                 <p>No categories available</p>
//                                                             )}
//                                                         </div>

//                                                     </div>
//                                                 </div>
//                                             )
//                                                 :
//                                                 (
//                                                     <Link className={`${matchRoute(item?.path) ? "text-[#FFD60A]" : "text-[#DBDDEA]"}`} to={item?.path}>
//                                                         {item.title}
//                                                     </Link>
//                                                 )
//                                         }

//                                     </li>
//                                 )
//                             }
//                             )
//                         }


//                     </ul>

//                 </nav>
//                 <div className=' w-[160px] flex justify-between'>
//                     {/* login/signup/dashboard */}
//                     {
//                         user && user?.accountType !== "instructor" && (
//                             <Link to="/dashboard/cart" className=' relative'>
//                                 <AiOutlineShoppingCart />
//                                 {
//                                     totalItams > 0 && (
//                                         <span>
//                                             {totalItams}
//                                         </span>
//                                     )
//                                 }
//                             </Link>
//                         )
//                     }
//                     {
//                         token === null && (
//                             <Link to="/login">
//                                 <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                     Log in
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token === null && (
//                             <Link to="/signup">
//                                 <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                     Sign Up
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token !== null && <ProfileDropDown />
//                     }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar





// import React, { useEffect, useState } from 'react';
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import NavbarLinks from "../../data/navbar-links";
// import { Link } from 'react-router-dom';
// import { matchPath, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import ProfileDropDown from '../core/Auth/ProfileDropDown';
// import { apiConnector } from '../../services/apiconnector';
// import { categories } from '../../services/api';
// import { MdKeyboardArrowDown, MdMenu } from "react-icons/md";

// function Navbar() {
//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     const { totalItams } = useSelector((state) => state.cart);
//     const location = useLocation();

//     const [sublinks, setSubLinks] = useState([]);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const fetchSublinks = async () => {
//         try {
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             setSubLinks(result?.data?.data || []);
//         } catch (error) {
//             console.error("Could not fetch the category list:", error.message);
//         }
//     };

//     useEffect(() => {
//         fetchSublinks();
//     }, []);

//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     };

//     return (
//         <div className="w-full bg-richblack-800 border-b-[1px] border-[#2C333F]">
//             <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
//                 {/* Logo */}
//                 <Link to="/" className="h-[32px] w-[160px]">
//                     <img src={logo} alt="Logo" />
//                 </Link>

//                 {/* Mobile Hamburger Icon */}
//                 <div className="md:hidden flex items-center">
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//                         <MdMenu size={24} className="text-[#DBDDEA]" />
//                     </button>
//                 </div>

//                 {/* Desktop Navigation Links */}
//                 <nav className={`flex items-center gap-6 md:flex-row ${isMobileMenuOpen ? "flex-col absolute bg-richblack-700 w-full top-16 left-0 py-4 md:py-0 md:flex-row md:relative md:top-0 md:w-auto md:bg-transparent" : "hidden md:flex"}`}>
//                     <ul className="md:flex md:flex-row flex-col gap-6 md:gap-8 text-[#DBDDEA]">
//                         {NavbarLinks.map((item, idx) => (
//                             <li key={idx} className="relative mb-2">
//                                 {item.title === "Catalog" ? (
//                                     <div className="flex gap-1 cursor-pointer items-center group">
//                                         <p>{item.title}</p>
//                                         <MdKeyboardArrowDown />
//                                         <div className="absolute top-[35px] -left-24 ml-2 flex flex-col rounded-md bg-richblack-200 p-4 text-richblack-900 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-[300px] z-50">
//                                             <div className="absolute left-1/2 transform -translate-x-1/2 top-[-5px] h-6 w-6 rotate-45 bg-richblack-5" />
//                                             {sublinks.length ? (
//                                                 sublinks.map((subLink, index) => (
//                                                     <Link key={index} to={subLink.link} className="hover:text-richblack-700 py-1 px-2 transition-colors duration-200">
//                                                         {subLink.title}
//                                                     </Link>
//                                                 ))
//                                             ) : (
//                                                 <p className='text-black' >No categories available</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <Link
//                                         to={item?.path}
//                                         className={`${
//                                             matchRoute(item?.path) ? "text-[#FFD60A]" : "text-[#DBDDEA]"
//                                         } hover:text-[#FFD60A] transition-all duration-200`}
//                                     >
//                                         {item.title}
//                                     </Link>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>

//                 {/* User Actions */}
//                 <div className="hidden md:flex items-center gap-4">
//                     {/* Cart Icon */}
//                     {user && user?.accountType !== "Instructor" && (
//                         <Link to="/dashboard/cart" className="relative">
//                             <AiOutlineShoppingCart size={24} className="text-[#DBDDEA]" />
//                             {totalItams > 0 && (
//                                 <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
//                                     {totalItams}
//                                 </span>
//                             )}
//                         </Link>
//                     )}

//                     {/* Login / Sign Up Buttons */}
//                     {!token ? (
//                         <>
//                             <Link to="/login">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
//                                     Log in
//                                 </button>
//                             </Link>
//                             <Link to="/signup">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
//                                     Sign Up
//                                 </button>
//                             </Link>
//                         </>
//                     ) : (
//                         <ProfileDropDown />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;





// import React, { useEffect, useState } from 'react';
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import NavbarLinks from "../../data/navbar-links";
// import { Link } from 'react-router-dom';
// import { matchPath, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import ProfileDropDown from '../core/Auth/ProfileDropDown';
// import { apiConnector } from '../../services/apiconnector';
// import { categories } from '../../services/api';
// import { MdKeyboardArrowDown, MdMenu } from "react-icons/md";

// function Navbar() {
//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     const { totalItams } = useSelector((state) => state.cart);
//     const location = useLocation();

//     const [sublinks, setSubLinks] = useState([]);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const fetchSublinks = async () => {
//         try {
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             setSubLinks(result?.data?.data || []);
//         } catch (error) {
//             console.error("Could not fetch the category list:", error.message);
//         }
//     };

//     useEffect(() => {
//         fetchSublinks();
//     }, []);

//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     };

//     return (
//         <div className="w-full bg-richblack-800 border-b-[1px] border-[#2C333F]">
//             <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
//                 {/* Logo */}
//                 <Link to="/" className="h-[32px] w-[160px]">
//                     <img src={logo} alt="Logo" />
//                 </Link>

//                 {/* Mobile Hamburger Icon */}
//                 <div className="md:hidden flex items-center">
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//                         <MdMenu size={24} className="text-[#DBDDEA]" />
//                     </button>
//                 </div>

//                 {/* Desktop Navigation Links */}
//                 <nav className={`flex items-center gap-6 md:flex-row ${isMobileMenuOpen ? "flex-col absolute bg-richblack-700 w-full top-16 left-0 py-4 md:py-0 md:flex-row md:relative md:top-0 md:w-auto md:bg-transparent" : "hidden md:flex"}`}>
//                     <ul className="md:flex md:flex-row flex-col gap-6 md:gap-8 text-[#DBDDEA]">
//                         {NavbarLinks.map((item, idx) => (
//                             <li key={idx} className="relative mb-2">
//                                 {item.title === "Catalog" ? (
//                                     <div className="flex gap-1 cursor-pointer items-center group">
//                                         <p>{item.title}</p>
//                                         <MdKeyboardArrowDown />
//                                         <div className="absolute top-[35px] -left-24 ml-2 flex flex-col rounded-md bg-richblack-200 p-4 text-richblack-900 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-[300px] z-50">
//                                             <div className="absolute left-1/2 transform -translate-x-1/2 top-[-5px] h-6 w-6 rotate-45 bg-richblack-5" />
//                                             {sublinks.length ? (
//                                                 sublinks.map((subLink, index) => (
//                                                     <Link key={index} to={subLink.link} className="hover:text-richblack-700 py-1 px-2 transition-colors duration-200">
//                                                         {subLink.title}
//                                                     </Link>
//                                                 ))
//                                             ) : (
//                                                 <p className='text-black' >No categories available</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <Link
//                                         to={item?.path}
//                                         className={`${
//                                             matchRoute(item?.path) ? "text-[#FFD60A]" : "text-[#DBDDEA]"
//                                         } hover:text-[#FFD60A] transition-all duration-200`}
//                                     >
//                                         {item.title}
//                                     </Link>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Mobile User Actions */}
//                     <div className="flex flex-col gap-4 md:hidden mt-4">
//                         {/* Cart Icon */}
//                         {user && user?.accountType !== "Instructor" && (
//                             <Link to="/dashboard/cart" className="relative flex items-center justify-between text-[#DBDDEA]">
//                                 <AiOutlineShoppingCart size={24} />
//                                 {totalItams > 0 && (
//                                     <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
//                                         {totalItams}
//                                     </span>
//                                 )}
//                             </Link>
//                         )}

//                         {/* Login / Sign Up Buttons */}
//                         {!token ? (
//                             <>
//                                 <Link to="/login">
//                                     <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-center">
//                                         Log in
//                                     </button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-center">
//                                         Sign Up
//                                     </button>
//                                 </Link>
//                             </>
//                         ) : (
//                             <ProfileDropDown />
//                         )}
//                     </div>
//                 </nav>

//                 {/* Desktop User Actions */}
//                 <div className="hidden md:flex items-center gap-4">
//                     {/* Cart Icon */}
//                     {user && user?.accountType !== "Instructor" && (
//                         <Link to="/dashboard/cart" className="relative">
//                             <AiOutlineShoppingCart size={24} className="text-[#DBDDEA]" />
//                             {totalItams > 0 && (
//                                 <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
//                                     {totalItams}
//                                 </span>
//                             )}
//                         </Link>
//                     )}

//                     {/* Login / Sign Up Buttons */}
//                     {!token ? (
//                         <>
//                             <Link to="/login">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
//                                     Log in
//                                 </button>
//                             </Link>
//                             <Link to="/signup">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
//                                     Sign Up
//                                 </button>
//                             </Link>
//                         </>
//                     ) : (
//                         <ProfileDropDown />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;



// import React, { useEffect, useState } from 'react';
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import NavbarLinks from "../../data/navbar-links";
// import { Link } from 'react-router-dom';
// import { matchPath, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import ProfileDropDown from '../core/Auth/ProfileDropDown';
// import { apiConnector } from '../../services/apiconnector';
// import { categories } from '../../services/api';
// import { MdKeyboardArrowDown, MdMenu } from "react-icons/md";

// function Navbar() {
//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     const { totalItams } = useSelector((state) => state.cart);
//     const location = useLocation();

//     const [sublinks, setSubLinks] = useState([]);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const fetchSublinks = async () => {
//         try {
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             setSubLinks(result?.data?.data || []);
//             console.log("result setSublinks:-",result?.data?.data);
//         } catch (error) {
//             console.error("Could not fetch the category list:", error.message);
//         }
//     };

//     useEffect(() => {
//         fetchSublinks();
//     }, []);

//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     };

//     return (
//         <div className="w-full bg-richblack-800 border-b-[1px] border-[#2C333F]">
//             <div className="md:max-w-screen-xl w-11/12 mx-auto flex items-center justify-between py-4 px-6">
//                 {/* Logo */}
//                 <Link to="/" className="h-[32px] w-[160px]">
//                     <img src={logo} alt="Logo" />
//                 </Link>

//                 {/* Mobile Hamburger Icon */}
//                 <div className="min-850:hidden flex items-center">
//                     <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//                         <MdMenu size={24} className={`text-[#DBDDEA] ${isMobileMenuOpen ?" rotate-45" :"rotate-0"} duration-300`} />
//                     </button>
//                 </div>

//                 {/* Desktop Navigation Links */}
//                 <nav className={`flex items-center gap-6 min-850:flex-row ${isMobileMenuOpen ? "flex-col absolute min-850:flex-row  w-full top-16 left-0 py-4 md:py-0 min-850:relative min-850:top-0 min-850:w-auto min-850:bg-transparent" : "hidden min-850:flex"}`}>
//                    <div className='max-850:absolute z-40 rounded-t-3xl bg-gradient-to-br to-[#ffffff,#65C7F7] from-[#0052D4] w-8/12 block min-850:hidden max-850:h-[280px] blur-[20px]'></div>
//                     <ul className="min-850:flex z-50 min-850:flex-row flex-col gap-6 min-850:gap-8 min-850:text-[#DBDDEA] text-richblack-900">
//                         {NavbarLinks.map((item, idx) => (
//                             <li key={idx} className="relative mb-2">
//                                 {item.title === "Catalog" ? (
//                                     <div className="flex gap-1 cursor-pointer items-center group">
//                                         <p>{item.title}</p>
//                                         <MdKeyboardArrowDown />
//                                         <div className="absolute top-[35px] -left-24 ml-2 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-[300px] z-50">
//                                             <div className="absolute left-1/2 transform -translate-x-1/2 top-[-5px] h-6 w-6 rotate-45 bg-richblack-5" />
//                                             {sublinks.length ? (
//                                                 sublinks.map((subLink, index) => (
//                                                     <Link key={index} to={`/catalog/${subLink.name.replace(" ",'-')}`} className="hover:text-richblack-700 py-1 px-2 transition-colors duration-200">
//                                                         {subLink.name}
//                                                     </Link>
//                                                 ))
//                                             ) : (
//                                                 <p className='text-black' >No categories available</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <Link
//                                         to={item?.path}
//                                         className={`${
//                                             matchRoute(item?.path) ? "text-[#FFD60A]" : "min-850:text-[#DBDDEA] text-richblack-900"
//                                         } hover:text-[#FFD60A] transition-all duration-200`}
//                                     >
//                                         {item.title}
//                                     </Link>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Mobile User Actions */}
//                     <div className="max-850:z-50 flex flex-col gap-4 min-850:hidden mt-4">
//                         {/* Cart Icon */}
//                         {user && user?.accountType !== "Instructor" && (
//                             <Link to="/dashboard/cart" className="relative flex items-center justify-between text-[#DBDDEA]">
//                                 <AiOutlineShoppingCart size={24} />
//                                 {totalItams > 0 && (
//                                     <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
//                                         {totalItams}
//                                     </span>
//                                 )}
//                             </Link>
//                         )}

//                         {/* Login / Sign Up Buttons */}
//                         {!token ? (
//                             <>
//                                 <Link to="/login">
//                                     <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-center">
//                                         Log in
//                                     </button>
//                                 </Link>
//                                 <Link to="/signup">
//                                     <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md w-full text-center">
//                                         Sign Up
//                                     </button>
//                                 </Link>
//                             </>
//                         ) : (
//                             <ProfileDropDown />
//                         )}
//                     </div>
//                 </nav>

//                 {/* Desktop User Actions */}
//                 <div className="hidden min-850:flex items-center gap-4">
//                     {/* Cart Icon */}
//                     {user && user?.accountType !== "Instructor" && (
//                         <Link to="/dashboard/cart" className="relative">
//                             <AiOutlineShoppingCart size={24} className="text-[#DBDDEA]" />
//                             {totalItams > 0 && (
//                                 <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
//                                     {totalItams}
//                                 </span>
//                             )}
//                         </Link>
//                     )}

//                     {/* Login / Sign Up Buttons */}
//                     {!token ? (
//                         <>
//                             <Link to="/login">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
//                                     Log in
//                                 </button>
//                             </Link>
//                             <Link to="/signup">
//                                 <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
//                                     Sign Up
//                                 </button>
//                             </Link>
//                         </>
//                     ) : (
//                         <ProfileDropDown />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;


import { useEffect, useRef, useState } from "react";
// import { AiOutlineCaretDown } from "react-icons/ai";
// import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
// import { logout } from "../../services/operations/authAPI";







// import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import { Link } from "react-router-dom";
import { matchPath, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";
import { MdKeyboardArrowDown} from "react-icons/md";
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi";
import { setUserauth } from "../../Slices/authSlice";
import '../../App.css'
function Navbar() {
    let { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setOpen(false));

    useEffect(() => {
        if (!user) {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            dispatch(setUserauth(JSON.parse(storedUser))); // Update Redux store with user data
          }
        }
      }, [user, dispatch]);

    const { token } = useSelector((state) => state.auth);
    const { totalItams } = useSelector((state) => state.cart);
    const location = useLocation();

    const [sublinks, setSubLinks] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result?.data?.data || []);
        } catch (error) {
            console.error("Could not fetch the category list:", error.message);
        }
    };

    useEffect(() => {
        fetchSublinks();
    }, []);

    const matchRoute = (route) => matchPath({ path: route }, location.pathname);

    return (
        <div className="w-full bg-[#000814] border-b border-[#2C333F]">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link to="/" className="h-8 w-40">
                    <img src={logo} alt="Logo" />
                </Link>

                {/* Mobile Hamburger Icon */}
                <div className="min-850:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-[#DBDDEA] transition-transform duration-300"
                    >
                        <PiDotsThreeOutlineVerticalDuotone
                            size={24}
                            className={`${isMobileMenuOpen ? "rotate-90 duration-700" : "rotate-0 duration-700"}`}
                        />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav
                    className={`flex items-center gap-6 ${isMobileMenuOpen
                            ? "flex flex-col absolute top-16 left-0 w-full bg-gradient-to-br from-[#0052D4] to-[#65C7F7] z-40 py-6 px-4"
                            : "hidden min-850:flex"
                        }`}
                >
                    <ul className="flex flex-row min-850:flex-row gap-6 text-richblack-900 min-850:text-[#DBDDEA]">
                        {NavbarLinks.map((item, idx) => (
                            <li key={idx} className="relative group">
                                {item.title === "Catalog" ? (
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        <p className="hover:text-[#FFD60A]">{item.title}</p>
                                        <MdKeyboardArrowDown />
                                        <div className="absolute top-8 left-0 w-[200px] rounded-md z-50 bg-richblack-5 p-4 shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            {sublinks.length ? (
                                                sublinks.map((subLink, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`/catalog/${subLink.name.replace(
                                                            " ",
                                                            "-"
                                                        )}`}
                                                        className="block hover:text-richblack-700 text-richblack-500 py-1 px-2"
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <p>No categories available</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={item?.path}
                                        className={`${matchRoute(item?.path)
                                                ? "text-[#FFD60A]"
                                                : "text-richblack-900 min-850:text-[#DBDDEA]"
                                            } hover:text-[#FFD60A] transition-all duration-200`}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}


                    </ul>
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {token && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart size={24} className="text-[#DBDDEA]" />
                            {totalItams > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
                                    {totalItams}
                                </span>
                            )}
                        </Link>
                    )}
                    {!token ? (
                        <>
                            <Link to="/login">
                                <button className="btn-primary">Log in</button>
                            </Link>
                            <Link to="/signup" className="max-500:hidden">
                                <button className="btn-primary">Sign Up</button>
                            </Link>
                        </>
                    ) : (
                        <div className="text-4xl text-white">
                            <ProfileDropDown />
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;











