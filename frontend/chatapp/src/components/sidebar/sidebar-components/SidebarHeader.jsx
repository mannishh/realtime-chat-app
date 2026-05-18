import React from 'react'

const SidebarHeader = () => {
  return (
    <div
      className="flex items-center gap-3 px-4 py-4.5"
      style={{ borderBottom: "1px solid #1e2535" }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: "#1e1b4b" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[15px] font-bold leading-tight" style={{ color: "#e2e8f0" }}>
          LiveChat
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "#4a5568" }}>
          Real-time messaging
        </p>
      </div>
    </div>
  )
}

export default SidebarHeader
