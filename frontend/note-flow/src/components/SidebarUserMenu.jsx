import React, { useContext, useState, useRef, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { User, LogOut } from "lucide-react";

const SidebarUserMenu = () => {

  const { user, logout } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // close model
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (confirmRef.current && !confirmRef.current.contains(event.target)) {
        setShowConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="px-4 pb-6 mt-auto relative">
        <hr className='text-gray-300' />

        {/* User Info */}
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center justify-between p-3 mt-4 bg-white shadow-lg rounded-lg cursor-pointer transition"
        >
          <div className="flex items-center">
            <div className="flex text-sm text-gray-700 gap-2">
              <User size={18} />
              <p className="font-medium">{user?.name}</p>
            </div>
          </div>

          <button onClick={() => setShowConfirm(true)}
            className=" text-sm text-gray-600 cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* logout Confirmation */}
        <div ref={confirmRef}
          className={`flex flex-col items-center absolute bottom-18 right-2 w-52 bg-gray-300 text-gray-800 p-4 rounded-xl shadow-xl
          transform transition-all duration-300
          ${showConfirm
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"}
        `}
        >
          <h2 className="font-medium ">Are you sure ?</h2>
          <p className="text-sm mb-4">you want to logout</p>

          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm bg-gray-200 rounded-md cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md cursor-pointer"
            >
              Logout
            </button>
          </div>

        </div>

      </div>
    </>
  )
}

export default SidebarUserMenu
