import React, { useState } from "react";

const MessageInput = () => {
  const [value, setValue] = useState("");
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-3"
      style={{ borderTop: "1px solid #1e2535", background: "#0f1117" }}
    >
      <input
        className="flex-1 rounded-xl px-4 py-2.75 text-sm outline-none transition-colors"
        style={{
          background: "#161b27",
          border: "1px solid #1e2535",
          color: "#c8d3e0",
          caretColor: "#7c3aed",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Message...`}
      />
    </div>
  );
};

export default MessageInput;
