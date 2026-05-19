import { useState } from "react";

const MessageInput = ({ onSend, receiverName }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex items-center gap-2.5 px-4 py-3"
      style={{ borderTop: "1px solid #1e2535", background: "#0f1117" }}
    >
      <input
        className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
        style={{
          background: "#161b27",
          border: "1px solid #1e2535",
          color: "#c8d3e0",
          caretColor: "#7c3aed",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`Message ${receiverName ? receiverName : ""}...`}
      />
      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!value.trim()}
        className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
        style={{
          background: value.trim() ? "linear-gradient(135deg,#6d28d9,#7c3aed)" : "#161b27",
          border: "1px solid #1e2535",
          cursor: value.trim() ? "pointer" : "not-allowed",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
            stroke={value.trim() ? "#fff" : "#4a5568"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
