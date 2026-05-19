import { useState, useEffect } from "react";
import socket from "./socket";

/**
 * useUnreadMessages(currentUserId, activeChatId)
 * ─────────────────────────────────────────────────
 * Tracks unread message counts per sender.
 *
 * activeChatId — the userId whose chat is currently open.
 *                Pass null if no chat is open.
 *
 * Returns:
 *   unreadCounts  — { [senderId]: number }
 *   clearUnread   — (senderId) => void  — call when opening a chat
 */
const useUnreadMessages = (currentUserId, activeChatId) => {
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    const handleMessage = (message) => {
      const senderId = message.senderId.toString();
      const isForCurrentUser =
        message.receiverId.toString() === currentUserId?.toString();

      // Only count if message is for us AND we're not already in that chat
      const isActiveChat = activeChatId?.toString() === senderId;

      if (isForCurrentUser && !isActiveChat) {
        setUnreadCounts((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
    };

    socket.on("private_message", handleMessage);
    return () => socket.off("private_message", handleMessage);
  }, [currentUserId, activeChatId]);

  // Call this when opening a conversation
  const clearUnread = (senderId) => {
    setUnreadCounts((prev) => {
      const updated = { ...prev };
      delete updated[senderId];
      return updated;
    });
  };

  return { unreadCounts, clearUnread };
};

export default useUnreadMessages;
