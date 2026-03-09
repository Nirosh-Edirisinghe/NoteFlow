import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, X, NotebookPen,Plus } from "lucide-react";
import SidebarUserMenu from './SidebarUserMenu';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
     ${isActive ? "bg-blue-600 text-white" : "text-slate-700 bg-slate-100 hover:bg-slate-200"}`;

  return (
    <>
      {/* Overlay in mobile view */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 p-4 rounded-xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
      >
        <div className='bg-white text-gray-600 flex flex-col rounded-xl h-full '>
          {/* Header section */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-slate-300">

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 border border-blue-500 rounded-lg">
                <NotebookPen className="text-white" size={20} />
              </div>
              <span className="text-xl text-gray-700 font-bold">Note Flow</span>
            </div>


            {/* sidebar close Icon in mobile view */}
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <X size={20} />
            </button>
          </div>

          {/* sidebar link */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/add-note"
              end
              className={linkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <Plus size={18} />
              Add Note
            </NavLink>
          </nav>
          
           <SidebarUserMenu/>
        </div>

       

      </aside>
    </>
  )
}

export default Sidebar
