import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import { setUser } from "../../../Slices/authSlice" // Import setUser action from authSlice

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.auth); // Use state from authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Restore user from localStorage on component mount
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser))); // Update Redux store with user data
      }
    }
  }, [user, dispatch]);

  // Show a placeholder if user data is not available
  if (!user) return <div className="text-3xl text-white">au</div>;

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-x-1"
        onClick={() => setOpen((prev) => !prev)} // Toggle dropdown visibility
      >
        <img
          src={user?.image || "/default-avatar.png"}
          alt={`profile-${user?.firstName || "user"}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 divide-y divide-gray-200 rounded-md bg-richblack-700 shadow-lg">
          <Link
            to="/dashboard/my-profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)} // Close dropdown when link clicked
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              dispatch(logout(navigate)); // Dispatch logout action
              setOpen(false); // Close dropdown after logout
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
