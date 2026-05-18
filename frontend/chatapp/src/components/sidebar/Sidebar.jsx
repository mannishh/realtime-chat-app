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

const Sidebar = () => {
  const { user } = useAuth();
  const username = user.name;
  const isOnline = user.isOnline;
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await getUserStatus();
        setOnlineUsers(response.data.online);
        setOfflineUsers(response.data.offline);
      } catch (error) {
        console.error(error.message, "Failed to get user based on status");
      }
    };

    fetchUserStatus();
  }, []);

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
