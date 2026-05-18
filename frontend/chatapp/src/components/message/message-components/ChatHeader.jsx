import React, { useMemo } from "react";
import Avatar from "../../sidebar/sidebar-components/Avatar";
import { getAvatarColor } from "../../../utils/avatarUtils";

const ChatHeader = ({ username, status, chatCount }) => {
  const initials = username.charAt(0).toUpperCase();

  const colorClass = useMemo(() => getAvatarColor(username), [username]);
  
  return (
    <div
      className="flex items-center justify-between px-5 py-3.5"
      style={{ borderBottom: "1px solid #1e2535", background: "#0f1117" }}
    >
      <div className="flex items-center gap-3">
        <Avatar initials={initials} colorClass={colorClass} showDot isOnline />
        <div>
          <p
            className="text-[15px] font-bold leading-tight"
            style={{ color: "#e2e8f0" }}
          >
            {username}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: "#4a5568" }}>
            {status && <span>Online</span>} · {chatCount} messages
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
