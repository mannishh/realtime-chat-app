import { io } from "socket.io-client";

/**
 * socket.js
 * ─────────────────────────────────────────────────────────────
 * Creates ONE socket instance for the whole app.
 * autoConnect: false → we manually call socket.connect()
 * only after the user is confirmed logged in.
 * This prevents unauthenticated connection attempts.
 * ─────────────────────────────────────────────────────────────
 */
const socket = io("http://localhost:8000", {
  withCredentials: true, // sends the JWT cookie on handshake
  autoConnect: false,    // we control when to connect
});

export default socket;
