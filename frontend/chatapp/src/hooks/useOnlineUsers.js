import { useEffect, useState } from "react";
import socket from "./socket";

/**
 * useOnlineUsers()
 * ─────────────────────────────────────────────────────────────
 * Listens to the "online_users" event broadcast by the server
 * whenever someone connects or disconnects.
 *
 * Returns: array of user objects currently online
 *   [{ _id, name, isOnline, lastSeen }, ...]
 *
 * Usage — in Sidebar or wherever you list users:
 *   const onlineUsers = useOnlineUsers();
 * ─────────────────────────────────────────────────────────────
 */
const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Server emits "online_users" with the full list every time
    // someone connects or disconnects
    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("online_users", handleOnlineUsers);

    // Cleanup — remove listener when component unmounts
    return () => {
      socket.off("online_users", handleOnlineUsers);
    };
  }, []);

  return onlineUsers;
};

export default useOnlineUsers;
