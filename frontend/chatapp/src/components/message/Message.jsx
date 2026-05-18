import React from "react";
import ChatHeader from "./message-components/ChatHeader";
import ChatBubble from "./message-components/ChatBubble";
import MessageList from "./message-components/MessageList";
import MessageInput from "./message-components/MessageInput";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../services/user.services";
import Spinner from "../Spinner";

const Message = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        setIsLoading(true);
        const response = await getUserById(id);

        const userData = response?.user;
        setUser(userData);
      } catch (error) {
        console.error("Unable to fetch user data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUserById();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <ChatHeader username={user?.name} status={user?.isOnline} />
      <MessageInput/>
    </div>
  );
};

export default Message;
