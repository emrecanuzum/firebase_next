import React from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import useRoom from "../hooks/useRoom";
import useUsers from "../hooks/useUsers";

const Chat = ({ user }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomID = searchParams.get("roomId") || "";
  //const roomId = router.query.roomId || "";
  const userId = user.uid;
  const room = useRoom(roomID, userId);

  console.log(room);

  return (
    <div>
      <h2>Chat</h2>
    </div>
  );
};

export default Chat;
