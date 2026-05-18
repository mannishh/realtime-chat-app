import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { getAvatarColor } from "../../../utils/avatarUtils";

const UserNavItem = ({ user }) => {
  const name = user.name;
  const initials = name.charAt(0).toUpperCase();

  const colorClass = useMemo(() => getAvatarColor(name), [name]);

  return (
    <NavLink
      to={`/user/message/${user._id}`}
      className="block"
      style={({ isActive }) => ({
        background: isActive ? "#1a2030" : "transparent",
        borderRadius: "8px",
      })}
    >
      {({ isActive }) => (
        <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-[#1a2030]">
          <Avatar
            initials={initials}
            colorClass={colorClass}
            showDot
            isOnline={user.isOnline === true}
          />
          <div>
            <p
              className="text-[13px] font-semibold"
              style={{ color: isActive ? "#e2e8f0" : "#c8d3e0" }}
            >
              {user.name}
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{
                color: user.status === "online" ? "#4ade80" : "#4a5568",
              }}
            >
              {user.lastSeen}
            </p>
          </div>
        </div>
      )}
    </NavLink>
  );
};

export default UserNavItem;
