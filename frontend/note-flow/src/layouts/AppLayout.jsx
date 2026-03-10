import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { Outlet, Link } from "react-router-dom";
import { Menu, NotebookPen } from "lucide-react";

const AppLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-200">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">

          {/* Top bar for mobile screen */}
          <div className="lg:hidden flex justify-between bg-white px-4 py-2 shadow">

            <Link to='/' className='flex items-center gap-2'>
              <div className="w-6 h-6 flex items-center justify-center bg-blue-600 border border-blue-500 rounded-md">
                <NotebookPen className="text-white" size={16} />
              </div>
              <span className="font-semibold text-slate-800">Note Flow</span>
            </Link>


            <button onClick={() => setSidebarOpen(true)} className="text-slate-700 cursor-pointer">
              <Menu size={24} />
            </button>
          </div>

          <main className="flex-1 overflow-y-auto p-4 notes-scrollbar">
            <Outlet />
          </main>
        </div>

      </div>
    </>
  )
}

export default AppLayout
