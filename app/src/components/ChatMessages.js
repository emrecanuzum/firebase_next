import { Avatar } from "@nextui-org/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useRef, useEffect, useState } from "react";
import { db } from "../utils/firebase";

export default function ChatMessages({ messages, user, roomId }) {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  async function deleteMessage() {
    await deleteDoc(doc(db, `rooms/${roomId}/messages/${selectedMessageId}`));
    setSelectedMessageId(null); // Silme işlemi tamamlandıktan sonra seçili mesajı sıfırla
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col max-h-[calc(100vh - 200px)]  overflow-y-auto">
      {messages &&
        messages.map((message) => {
          const isSender = message.uid == user.uid;
          return (
            <div
              key={message.id}
              className="grid grid-cols-2 margin-bottom-1"
              onClick={() => setSelectedMessageId(message.id)}
            >
              <div
                className={` grid ${
                  isSender
                    ? " bg-neutral-300 rounded-md col-start-2 m-4 p-2"
                    : " bg-neutral-100 rounded-md m-4 p-2"
                }`}
              >
                <div className="flex items-center  border-b-2 py-2 mb-2">
                  <span className="chat-name">{message.name}</span>
                </div>

                <span className="chat-message-message">{message.message}</span>

                <span className="chat-time text-xs pb-2">{message.time}</span>
                {isSender && selectedMessageId === message.id && (
                  <div className=" border-t-2 pt-2 text-center">
                    <button onClick={deleteMessage}>Mesajı Sil</button>
                    <button
                      className="ml-2 bg-red-500 text-white items-center px-2 rounded-md"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedMessageId(null);
                      }}
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      <div className="w-0 h-0" ref={messagesEndRef}></div>
    </div>
  );
}
