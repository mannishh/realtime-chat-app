import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getUserById } from "../../services/user.services";
import { getMessages } from "../../services/message.services";
import socket from "../../hooks/socket";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import ChatHeader from "./message-components/ChatHeader";
import MessageList from "./message-components/MessageList";
import MessageInput from "./message-components/MessageInput";
import Spinner from "../Spinner";

const Message = () => {
  const { id } = useParams(); // receiverId from URL
  const { user: currentUser } = useAuth();
  const { clearUnread } = useUnread();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bottomRef = useRef(null); // auto-scroll anchor

  useEffect(() => {
    if (id) clearUnread(id);
  }, [id]);

  // ── Fetch receiver info + chat history when user changes ──────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [userRes, msgRes] = await Promise.all([
          getUserById(id),
          getMessages(id),
        ]);
        setReceiver(userRes.user);
        setMessages(msgRes?.messages || []);
      } catch (error) {
        console.error("Failed to load conversation:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  // ── Listen for incoming real-time messages ────────────────────────────────
  useEffect(() => {
    const handleMessage = (message) => {
      // Only add to this conversation if it belongs here
      const isRelevant =
        (message.senderId.toString() === id &&
          message.receiverId.toString() === currentUser._id.toString()) ||
        (message.senderId.toString() === currentUser._id.toString() &&
          message.receiverId.toString() === id);

      if (isRelevant) {
        setMessages((prev) => {
          // Avoid duplicates (sender gets echo + direct emit)
          const exists = prev.find(
            (m) => m._id.toString() === message._id.toString(),
          );
          if (exists) return prev;
          return [...prev, message];
        });
      }
    };

    socket.on("private_message", handleMessage);
    return () => socket.off("private_message", handleMessage);
  }, [id, currentUser._id]);

  // ── Auto-scroll to latest message ─────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Send message ──────────────────────────────────────────────────────────
  const handleSend = (text) => {
    if (!text.trim()) return;
    socket.emit("private_message", { receiverId: id, text });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        username={receiver?.name}
        status={receiver?.isOnline}
        chatCount={messages.length}
      />

      <MessageList
        messages={messages}
        currentUserId={currentUser._id}
        receiver={receiver}
        currentUser={currentUser}
        bottomRef={bottomRef}
      />

      <MessageInput onSend={handleSend} receiverName={receiver?.name} />
    </div>
  );
};

export default Message;
