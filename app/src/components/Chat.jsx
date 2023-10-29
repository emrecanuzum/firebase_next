import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ChatFooter from "./ChatFooter";
import ChatMessages from "./ChatMessages";
import { useState } from "react";

import useChatMessages from "../hooks/useChatMessages";
import useRoom from "../hooks/useRoom";
import useUsers from "../hooks/useUsers";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Menu, MenuBook } from "@mui/icons-material";
import { send } from "process";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const Chat = ({ user }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [input, setInput] = useState("");
  const roomID = searchParams.get("roomId") || "";
  //const roomId = router.query.roomId || "";
  const userId = user.uid;
  const room = useRoom(roomID, userId);
  const messages = useChatMessages(roomID);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of messages when the component initially loads
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [roomID]);

  async function sendMessage(event) {
    event.preventDefault();

    setInput("");

    await setDoc(doc(db, `users/${userId}/chats/${roomID}`), {
      name: room.name,
      photoURL: room.photoURL || null,
      timestamp: serverTimestamp(),
    });
    const newDoc = await addDoc(collection(db, `rooms/${roomID}/messages`), {
      name: user.displayName,
      message: input,
      uid: user.uid,
      timestamp: serverTimestamp(),
      time: new Date().toUTCString(),
    });
  }

  async function deleteRoom() {
    try {
      const userChatsRef = doc(db, `users/${userId}/chats/${roomID}`);
      const roomRef = doc(db, `rooms/${roomID}`);
      const roomMessagesRef = collection(db, `rooms/${roomID}/messages`);
      const roomMessages = await getDocs(query(roomMessagesRef));
      await Promise.all([
        deleteDoc(userChatsRef),
        deleteDoc(roomRef),
        ...roomMessages.docs.map((doc) => deleteDoc(doc.ref)),
      ]);
    } catch (error) {}
  }

  if (!room) return null;

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="flex  p-2 items-center border-b-2 w-screen">
        <div className="avatar-container">
          <Avatar src={room.photoURL} alt={room.name} />
        </div>
        <div className="px-2">
          <h3>{room.name}</h3>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Menu></Menu>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={deleteRoom}>Delete Room</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className=" flex-1 overflow-y-auto" ref={messagesContainerRef}>
        <ChatMessages messages={messages} user={user} roomId={roomID} />
      </div>

      <ChatFooter
        input={input}
        onChange={(event) => setInput(event.target.value)}
        user={user}
        room={room}
        roomId={roomID}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
