export default function ChatMessages({ messages, user, roomId }) {
  if (!messages) return null;

  return messages.map((message) => {
    const isSender = message.uid == user.uid;
    return (
      <div
        key={message.id}
        className={`chat-message ${isSender ? " absolute right-4" : ""}`}
      >
        <span className="chat-name">{message.name}</span>
        <span className="chat-message-message">{message.message}</span>

        <span className="chat-time">{message.time}</span>
      </div>
    );
  });
}
