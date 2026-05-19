import React from "react";
import { Outlet, useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";
import { UnreadProvider } from "../context/UnreadContext";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { id: activeChatId } = useParams();

  useSocket(user);

  return (
    <UnreadProvider currentUserId={user?._id} activeChatId={activeChatId}>
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
    </UnreadProvider>
  );
};

export default DashboardLayout;
