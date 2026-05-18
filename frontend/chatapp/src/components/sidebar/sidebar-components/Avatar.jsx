import React from "react";

const Avatar = ({
  initials,
  colorClass,
  size = "md",
  showDot = false,
  isOnline = false,
}) => {
  const sizeClass =
    size === "sm"
      ? "w-[34px] h-[34px] text-[12px]"
      : "w-[38px] h-[38px] text-[13px]";
  return (
    <div className="relative shrink-0">
      <div
        className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-bold text-white select-none`}
      >
        {initials}
      </div>
      {showDot && (
        <span
          className="absolute bottom-0.5 right-0.5 w-2.25 h-2.25 rounded-full border-2"
          style={{
            background: isOnline ? "#4ade80" : "#3a4252",
            borderColor: "#0f1117",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
