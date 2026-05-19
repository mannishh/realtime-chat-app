import ChatBubble from "./ChatBubble";

const MessageList = ({ messages, currentUserId, receiver, currentUser, bottomRef }) => {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
      {messages.map((msg) => {
        const isOwn = msg.senderId.toString() === currentUserId.toString();
        return (
          <ChatBubble
            key={msg._id}
            text={msg.text}
            time={new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isOwn={isOwn}
            senderName={isOwn ? currentUser.name : receiver?.name}
          />
        );
      })}
      {/* Auto-scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
