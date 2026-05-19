import { useEffect } from "react";
import socket from "./socket";

/**
 * useSocket(user)
 * ─────────────────────────────────────────────────────────────
 * Call this ONCE at the top of your app (e.g. in App.jsx or
 * a layout component) and pass the logged-in user object.
 *
 * - Connects socket when user is present (logged in)
 * - Disconnects socket when user is null (logged out)
 *
 * Usage:
 *   const { user } = useAuthStore();
 *   useSocket(user);
 * ─────────────────────────────────────────────────────────────
 */
const useSocket = (user) => {
  useEffect(() => {
    if (user) {
      // User just logged in → connect
      if (!socket.connected) {
        socket.connect();
      }

      socket.on("connect", () => {
        console.log("🟢 Socket connected:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("🔴 Socket connection error:", err.message);
      });
    } else {
      // User logged out → disconnect
      if (socket.connected) {
        socket.disconnect();
        console.log("🔴 Socket disconnected (logout)");
      }
    }

    // Cleanup listeners when user changes (e.g. logout → login as someone else)
    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [user]);
};

export default useSocket;
