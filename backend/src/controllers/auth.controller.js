import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { registerSchema, loginSchema } from "../validators/auth.schema.js";
import { getIO } from "../socket/io.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none", // Protects against CSRF attacks
  maxAge: 1 * 24 * 60 * 60 * 1000,
};

// ─── Helper — broadcast fresh online/offline lists to all clients ─────────────
const broadcastUserStatus = async () => {
  try {
    const io = getIO();

    const [onlineUsers, offlineUsers] = await Promise.all([
      User.find({ isOnline: true }).select("_id name isOnline lastSeen"),
      User.find({ isOnline: false }).select("_id name isOnline lastSeen"),
    ]);

    // Every connected frontend receives this and refetches / updates state
    io.emit("user_status_changed", {
      online: onlineUsers,
      offline: offlineUsers,
    });
  } catch (err) {
    // Non-fatal — log but don't crash the request
    console.error("broadcastUserStatus error:", err.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    const { name, email, password } = validation.data;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
      isOnline: true,
    });

    // removing password
    const userObject = user.toObject();
    delete userObject.password;

    // generate token
    const token = generateToken(user._id);

    // Notify all other clients that a new user is online
    await broadcastUserStatus();

    return res.status(201).cookie("token", token, cookieOptions).json({
      message: "User registered successfully",
      user: userObject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      const formattedErrors = validation.error.flatten().fieldErrors;
      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    const { email, password } = validation.data;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.isOnline = true;
    await user.save();

    // generate token
    const token = generateToken(user._id);

    const userObject = user.toObject();
    delete userObject.password;

    // Notify all other clients this user is now online
    await broadcastUserStatus();

    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "Login successful",
      user: userObject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        isOnline: false,
        lastSeen: new Date(),
      });

      await broadcastUserStatus();
    }

    return res
      .status(200)
      .clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" })
      .json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
