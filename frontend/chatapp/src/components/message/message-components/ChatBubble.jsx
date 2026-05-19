import { useMemo } from "react";
import Avatar from "../../sidebar/sidebar-components/Avatar";
import { getAvatarColor } from "../../../utils/avatarUtils";

/**
 * ChatBubble
 * Props:
 *   text       — message text
 *   time       — formatted time string
 *   isOwn      — true if sent by logged-in user
 *   senderName — display name of sender
 */
const ChatBubble = ({ text, time, isOwn, senderName }) => {
  const initials  = senderName?.charAt(0).toUpperCase();
  const colorClass = useMemo(() => getAvatarColor(senderName), [senderName]);

  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div>
          <p className="text-xs mb-1.5 text-right" style={{ color: "#4a5568" }}>
            {time}&nbsp;&nbsp;
            <strong style={{ color: "#8896a8" }}>You</strong>
          </p>
          <div className="flex items-center gap-2 justify-end">
            <div
              className="text-white rounded-[14px_4px_14px_14px] px-4 py-2.5 text-sm max-w-xs"
              style={{
                background: "linear-gradient(135deg,#6d28d9,#7c3aed)",
                boxShadow: "0 2px 14px rgba(109,40,217,0.4)",
              }}
            >
              {text}
            </div>
            <Avatar initials={initials} colorClass={colorClass} size="sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <Avatar initials={initials} colorClass={colorClass} />
      <div>
        <p className="text-xs mb-1.5" style={{ color: "#4a5568" }}>
          <strong style={{ color: "#c8d3e0" }}>{senderName}</strong>
          <span className="ml-2">{time}</span>
        </p>
        <div
          className="text-sm px-4 py-2.5 inline-block"
          style={{
            background: "#1a2030",
            border: "1px solid #1e2535",
            color: "#c8d3e0",
            borderRadius: "4px 14px 14px 14px",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
