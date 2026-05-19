import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import { getUserStatus } from "../../services/user.services";
import socket from "../../hooks/socket";
import SidebarHeader from "./sidebar-components/SidebarHeader";
import StatsBar from "./sidebar-components/StatsBar";
import OnlineSection from "./sidebar-components/OnlineSection";
import OfflineSection from "./sidebar-components/OfflineSection";
import CurrentUserFooter from "./sidebar-components/CurrentUserFooter";

const Sidebar = () => {
  const { user } = useAuth();
  const { unreadCounts, clearUnread } = useUnread(); // ← from context
  const [onlineUsers,  setOnlineUsers]  = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);

  const fetchUserStatus = async () => {
    try {
      const response = await getUserStatus();
      setOnlineUsers(response.data.online);
      setOfflineUsers(response.data.offline);
    } catch (error) {
      console.error("Failed to get user status:", error.message);
    }
  };

  useEffect(() => { fetchUserStatus(); }, []);

  useEffect(() => {
    const handleStatusChange = (data) => {
      setOnlineUsers(data.online);
      setOfflineUsers(data.offline);
    };
    socket.on("user_status_changed", handleStatusChange);
    return () => socket.off("user_status_changed", handleStatusChange);
  }, []);

  const currentUserId = user?._id?.toString();
  const filteredOnline  = onlineUsers.filter((u) => u._id.toString() !== currentUserId);
  const filteredOffline = offlineUsers.filter((u) => u._id.toString() !== currentUserId);

  return (
    <aside
      className="w-70 min-w-70 flex flex-col h-screen overflow-y-auto"
      style={{ background: "#0f1117", borderRight: "1px solid #1e2535" }}
    >
      <SidebarHeader />
      <StatsBar
        total={filteredOnline.length + filteredOffline.length}
        online={filteredOnline.length}
        offline={filteredOffline.length}
      />
      <div className="flex-1 overflow-y-auto">
        {filteredOnline.length > 0 && (
          <OnlineSection
            users={filteredOnline}
            unreadCounts={unreadCounts}
            clearUnread={clearUnread}
          />
        )}
        {filteredOffline.length > 0 && (
          <OfflineSection
            users={filteredOffline}
            unreadCounts={unreadCounts}
            clearUnread={clearUnread}
          />
        )}
      </div>
      <CurrentUserFooter name={user?.name} isOnline={user?.isOnline} />
    </aside>
  );
};

export default Sidebar;
