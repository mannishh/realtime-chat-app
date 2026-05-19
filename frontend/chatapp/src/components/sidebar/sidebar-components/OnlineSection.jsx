import React from "react";
import UserNavItem from "./UserNavItem";

const OnlineSection = ({ users, unreadCounts, clearUnread }) => {
  return (
    <div className="px-3">
      <div
        className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest py-3 pl-1 uppercase"
        style={{ color: "#4a5568" }}
      >
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
        ONLINE — {users.length}
      </div>
      {users.map((u) => (
        <UserNavItem
          key={u._id}
          user={u}
          unreadCount={unreadCounts?.[u._id.toString()] || 0}
          clearUnread={clearUnread}
        />
      ))}
    </div>
  );
};

export default OnlineSection;
