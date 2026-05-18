import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/sidebar/Sidebar';


const DashboardLayout = () => {
  return (
     <div
          className="flex h-screen overflow-hidden font-sans"
          style={{ background: "#0c0e13", color: "#8896a8" }}
        >
          <Sidebar />
    
          <main
            className="flex-1 flex flex-col overflow-hidden"
            style={{ background: "#0c0e13" }}
          >
            <Outlet />
          </main>
        </div>
  )
}

export default DashboardLayout
