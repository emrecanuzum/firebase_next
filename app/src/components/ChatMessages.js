import { Avatar } from "@nextui-org/react";
import { useRef, useEffect } from "react";

export default function ChatMessages({ messages, user, roomId }) {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom when the component initially loads
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  if (!messages) return null;

  return (
    <div
      className="flex flex-col max-h-[calc(100vh - 200px) overflow-y-auto]"
      ref={messagesContainerRef}
    >
      {messages.map((message) => {
        const isSender = message.uid == user.uid;
        return (
          <div
            key={message.id}
            className="grid w-screen grid-cols-4 margin-bottom-1"
          >
            <div
              className={` grid ${
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
      })}
    </div>
  );
}
