import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Menu } from "lucide-react"; 
import useSocket from "../hooks/useSocket";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";
import { UnreadProvider } from "../context/UnreadContext";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id: activeChatId } = useParams();

  useSocket(user);

  return (
    <UnreadProvider currentUserId={user?._id} activeChatId={activeChatId}>
      <div
        className="flex h-screen overflow-hidden font-sans"
        style={{ background: "#0c0e13", color: "#8896a8" }}
      >
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        <main
          className="flex-1 flex flex-col overflow-hidden"
          style={{ background: "#0c0e13" }}
        >
          {/* Mobile topbar */}
          <div
            className="md:hidden flex items-center px-4 py-3"
            style={{ background: "#0f1117", borderBottom: "1px solid #1e2535" }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {/* 2. Swapped text glyph with Lucide Component */}
              <Menu size={24} /> 
            </button>
          </div>

          <Outlet />
        </main>
      </div>
    </UnreadProvider>
  );
};

export default DashboardLayout;