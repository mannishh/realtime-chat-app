import useOnlineUsers from "../../hooks/useOnlineUsers";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CurrentUserFooter from "../sidebar/sidebar-components/CurrentUserFooter";
import StatsBar from "../sidebar/sidebar-components/StatsBar";
import OnlineSection from "./sidebar-components/OnlineSection";
import OfflineSection from "./sidebar-components/OfflineSection";
import { useState } from "react";
import { useEffect } from "react";
import { getUserStatus } from "../../services/user.services";
import SidebarHeader from "./sidebar-components/SidebarHeader";
import Avatar from "./sidebar-components/Avatar";
import socket from "../../hooks/socket";

const Sidebar = () => {
  const { user } = useAuth();
  const username = user.name;
  const isOnline = user.isOnline;
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const fetchUserStatus = async () => {
    try {
      const response = await getUserStatus();
      setOnlineUsers(response.data.online);
      setOfflineUsers(response.data.offline);
    } catch (error) {
      console.error("Failed to get user status:", error.message);
    }
  };

  useEffect(() => {
    fetchUserStatus(); // fetch once on mount
  }, []);

  // ── Socket listener — refetch whenever any user logs in or out 
  useEffect(() => {
    const handleStatusChange = (data) => {
      const currentUserId = user?._id?.toString();

      // Filter incoming socket arrays before updating local state
      const cleanOnline = (data.online || []).filter(
        (u) => u._id.toString() !== currentUserId,
      );
      const cleanOffline = (data.offline || []).filter(
        (u) => u._id.toString() !== currentUserId,
      );

      setOnlineUsers(cleanOnline);
      setOfflineUsers(cleanOffline);
    };

    socket.on("user_status_changed", handleStatusChange);

    return () => {
      socket.off("user_status_changed", handleStatusChange);
    };
  }, [user]); // CRITICAL: Add user as a dependency so the listener always has access to your logged-in ID

  return (
    <aside
      className="w-70 min-w-70 flex flex-col h-screen overflow-y-auto"
      style={{ background: "#0f1117", borderRight: "1px solid #1e2535" }}
    >
      <SidebarHeader />
      <StatsBar />
      {/* <GeneralChannelLink /> */}

      <div className="flex-1 overflow-y-auto">
        {onlineUsers.length > 0 && <OnlineSection users={onlineUsers} />}
        {offlineUsers.length > 0 && <OfflineSection users={offlineUsers} />}
      </div>

      <CurrentUserFooter name={username} isOnline={isOnline} />
    </aside>
  );
};

export default Sidebar;
