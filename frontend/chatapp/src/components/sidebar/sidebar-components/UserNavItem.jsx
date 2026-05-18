import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";

const UserNavItem = ({ user }) => {
  const name = user.name;
  const initials = name.charAt(0).toUpperCase();

  const avatarColors = [
    "bg-indigo-600 text-indigo-100",
    "bg-purple-600 text-purple-100",
    "bg-violet-600 text-violet-100",
    "bg-fuchsia-600 text-fuchsia-100",
    "bg-pink-600 text-pink-100",
    "bg-emerald-600 text-emerald-100",
    "bg-teal-600 text-teal-100",
    "bg-cyan-600 text-cyan-100",
    "bg-blue-600 text-blue-100",
  ];

  const colorClass = useMemo(() => {
    if (!name) return avatarColors[0];

    let charCodeSum = 0;
    // Loops through every single letter of the user's name
    for (let i = 0; i < name.length; i++) {
      charCodeSum += name.charCodeAt(i); // Converts letters into numbers (e.g., 'A' = 65)
    }

    // The remainder (%) operation forces the large sum to lock perfectly onto your color array length
    const colorIndex = charCodeSum % avatarColors.length;
    return avatarColors[colorIndex];
  }, [name]); // This means it ONLY recalculates if the name itself changes

  return (
    <NavLink
      to={`/user/${user.id}`}
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
