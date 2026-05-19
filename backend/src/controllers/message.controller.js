import { Message } from "../models/message.model.js";

/**
 * GET /api/message/:receiverId
 * Returns full chat history between the logged-in user and receiverId.
 * Protected by verifyJwt — req.user is the logged-in user.
 */
export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 }); // oldest first

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
