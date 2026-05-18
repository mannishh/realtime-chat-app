import React, { useMemo } from "react";
import { LogOut } from "lucide-react";
import Avatar from "./Avatar";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

const CurrentUserFooter = ({ name, isOnline }) => {
  const { logout } = useAuth();
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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout sucessful!");
    } catch (error) {
      console.error(error.message, "Unable to logout");
    }
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ borderTop: "1px solid #1e2535" }}
    >
      <div className="flex items-center gap-2.5">
        <Avatar initials={initials} colorClass={colorClass} showDot isOnline />
        <div>
          <p className="text-[13px] font-semibold text-white">{name}</p>
          <p
            className={`text-[11px] mt-0.5 ${isOnline ? "text-emerald-400" : "text-gray-400"}`}
          >
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="p-1 rounded-md cursor-pointer transition-colors"
        style={{ background: "transparent", border: "none" }}
      >
        <LogOut />
      </button>
    </div>
  );
};

export default CurrentUserFooter;
