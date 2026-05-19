import { createContext, useContext, useState, useEffect } from "react";
import socket from "../hooks/socket";

const UnreadContext = createContext(null);

export const UnreadProvider = ({ currentUserId, activeChatId, children }) => {
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    const handleMessage = (message) => {
      const senderId = message.senderId.toString();
      const isForMe = message.receiverId.toString() === currentUserId?.toString();
      const isActiveChat = activeChatId?.toString() === senderId;

      if (isForMe && !isActiveChat) {
        setUnreadCounts((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
    };

    socket.on("private_message", handleMessage);
    return () => socket.off("private_message", handleMessage);
  }, [currentUserId, activeChatId]);

  const clearUnread = (senderId) => {
    setUnreadCounts((prev) => {
      const updated = { ...prev };
      delete updated[senderId.toString()];
      return updated;
    });
  };

  return (
    <UnreadContext.Provider value={{ unreadCounts, clearUnread }}>
      {children}
    </UnreadContext.Provider>
  );
};

export const useUnread = () => useContext(UnreadContext);
