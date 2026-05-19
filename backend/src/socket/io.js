/**
 * io.js
 * ─────────────────────────────────────────────────
 * Stores the Socket.IO instance so any controller
 * can import getIO() and emit events without needing
 * to pass `io` through every function.
 *
 * Pattern: init once in server.js, then getIO() anywhere.
 */

let _io = null;

export const initIO = (ioInstance) => {
  _io = ioInstance;
};

export const getIO = () => {
  if (!_io) throw new Error("Socket.IO not initialized. Call initIO first.");
  return _io;
};
