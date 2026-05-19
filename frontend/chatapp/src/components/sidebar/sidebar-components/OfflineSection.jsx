import React from "react";
import UserNavItem from "./UserNavItem";

const OfflineSection = ({ users, unreadCounts, clearUnread }) => {
  return (
    <div className="px-3">
      <div
        className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest py-3.5 pl-1 uppercase"
        style={{ color: "#4a5568" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <line
            x1="1"
            y1="1"
            x2="23"
            y2="23"
            stroke="#4a5568"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
            stroke="#4a5568"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        OFFLINE — {users.length}
      </div>
      {users.map((u) => (
        <UserNavItem
          key={u.id}
          user={u}
          unreadCount={unreadCounts?.[u._id.toString()] || 0} // ← add
          clearUnread={clearUnread}
        />
      ))}
    </div>
  );
};

export default OfflineSection;
