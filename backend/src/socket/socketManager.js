import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// ─── 1. Socket Auth Middleware ────────────────────────────────────────────────
const socketAuthMiddleware = async (socket, next) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie || "";

    const tokenCookie = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("token="));

    if (!tokenCookie) {
      return next(new Error("Authentication error: No token provided"));
    }

    const token = tokenCookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Using ._id inside decoded token payload convention
    const user = await User.findById(decoded._id || decoded.userId).select("-password");

    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    socket.user = user; 
    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
};

// ─── 2. Helper — Broadcasts status updates seamlessly ───────────────────────
const broadcastUserStatus = async (io) => {
  try {
    // Single-hit aggregation pipeline to fetch clean online/offline metrics
    const segmentedUsers = await User.aggregate([
      {
        $facet: {
          onlineUsers: [
            { $match: { isOnline: true } },
            { $project: { password: 0, __v: 0 } },
          ],
          offlineUsers: [
            { $match: { isOnline: false } },
            { $project: { password: 0, __v: 0 } },
          ],
        },
      },
    ]);

    const online = segmentedUsers[0]?.onlineUsers || [];
    const offline = segmentedUsers[0]?.offlineUsers || [];

    // Emits the exact structural contract your frontend components listen to!
    io.emit("user_status_changed", { online, offline });
  } catch (error) {
    console.error("Failed to broadcast status updates:", error.message);
  }
};

// ─── 3. Main socket handler ───────────────────────────────────────────────────
export const initSocket = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", async (socket) => {
    const user = socket.user;
    console.log(`✅ ${user.name} connected — socket: ${socket.id}`);

    // Mark user online & store their socketId in DB
    await User.findByIdAndUpdate(user._id, {
      isOnline: true,
      socketId: socket.id,
      lastSeen: null, 
    });

    // Tell everyone this user is now online
    await broadcastUserStatus(io);

    // ── Disconnect ──────────────────────────────────────────────────────────
    socket.on("disconnect", async () => {
      console.log(`❌ ${user.name} disconnected — socket: ${socket.id}`);

      await User.findByIdAndUpdate(user._id, {
        isOnline: false,
        socketId: null,
        lastSeen: new Date(), 
      });

      // Tell everyone this user is now offline
      await broadcastUserStatus(io);
    });
  });
};