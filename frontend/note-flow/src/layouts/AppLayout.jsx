import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

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
          <div className="lg:hidden flex justify-between bg-white pr-4 py-1 shadow">
            <h1 className="font-semibold text-slate-800">
              Note Flow
            </h1>

            <button onClick={() => setSidebarOpen(true)} className="text-slate-700">
              <Menu size={24} />
            </button>
          </div>

          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>

      </div>
    </>
  )
}

export default AppLayout
