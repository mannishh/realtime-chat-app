import React from "react";
import { getTotalUsersCount } from "../../../services/user.services";
import { useState } from "react";
import { useEffect } from "react";

const StatsBar = () => {
  const [count, setCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const response = await getTotalUsersCount();
        setCount(response.data.count);
        setOnlineCount(response.data.online);
        setOfflineCount(response.data.offline);
      } catch (error) {
        console.error("Failed to fetch user count", error);
      }
    };
    getUserCount();
  }, []);

  const statItems = [
    { label: "Total", value: count, colorClass: "text-[#e2e8f0]" },
    { label: "Online", value: onlineCount, colorClass: "text-[#4ade80]" },
    { label: "Offline", value: offlineCount, colorClass: "text-[#e2e8f0]" },
  ];

  return (
    <div
      className="flex gap-2 px-3 py-3.5"
      style={{ borderBottom: "1px solid #1e2535" }}
    >
      {statItems.map(({ label, value, colorClass }) => (
        <div
          key={label}
          className="flex-1 flex flex-col items-center py-2 rounded-lg"
          style={{ background: "#161b27", border: "1px solid #1e2535" }}
        >
          <span className={`text-lg font-bold leading-none ${colorClass}`}>
            {value}
          </span>
          <span
            className="text-[10px] mt-1 uppercase tracking-wide"
            style={{ color: "#4a5568" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
