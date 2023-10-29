import { Avatar } from "@nextui-org/react";

export default function ChatMessages({ messages, user, roomId }) {
  if (!messages) return null;

  return messages.map((message) => {
    const isSender = message.uid == user.uid;
    return (
      <div key={message.id} className="grid w-screen grid-cols-4">
        <div
          className={`chat-message grid ${
            isSender
              ? " bg-neutral-300 rounded-md col-start-3 m-4 p-2"
              : " bg-neutral-100 rounded-md m-4 p-2"
          }`}
        >
          <div className="flex items-center  border-b-2 py-2 mb-2">
            <span className="chat-name">{message.name}</span>
          </div>

          <span className="chat-message-message">{message.message}</span>

          <span className="chat-time text-xs">{message.time}</span>
        </div>
      </div>
    );
  });
}
