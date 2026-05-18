import mongoose, { mongo } from "mongoose";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCount = async (req, res) => {
  try {
    //convert to ObjectId for aggregation
    const currentUserId = new mongoose.Types.ObjectId(req.user._id);

    // Run an aggregation pipeline to get all counts in a single database hit
    const stats = await User.aggregate([
      {
        $facet: {
          total: [{ $count: "count" }],
          online: [
            { $match: { isOnline: true, _id: { $ne: currentUserId } } },
            { $count: "count" },
          ],
          offline: [
            { $match: { isOnline: false, _id: { $ne: currentUserId } } },
            { $count: "count" },
          ],
        },
      },
    ]);

    // Extract values safely, defaulting to 0 if no documents match
    const totalCount = stats[0].total[0]?.count || 0;
    const onlineCount = stats[0].online[0]?.count || 0;
    const offlineCount = stats[0].offline[0]?.count || 0;

    return res.status(200).json({
      success: true,
      data: {
        count: totalCount,
        online: onlineCount,
        offline: offlineCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserStatus = async (req, res) => {
  try {
    //convert to ObjectId for aggregation
    const currentUserId = new mongoose.Types.ObjectId(req.user._id);

    const segmentedUsers = await User.aggregate([
      {
        $facet: {
          onlineUsers: [
            { $match: { isOnline: true, _id: { $ne: currentUserId } } },
            { $project: { password: 0, __v: 0 } }, //exclude password
          ],

          offlineUsers: [
            { $match: { isOnline: false, _id: { $ne: currentUserId } } },
            { $project: { password: 0, __v: 0 } },
          ],
        },
      },
    ]);

    const online = segmentedUsers[0]?.onlineUsers || [];
    const offline = segmentedUsers[0]?.offlineUsers || [];

    return res.status(200).json({
      data: {
        online,
        offline,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
