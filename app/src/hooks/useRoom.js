import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase";

export default function useRoom(roomId, userId) {
  console.log(roomId);
  console.log(userId);
  const isUserRoom = roomId.includes(userId);
  const collectionId = isUserRoom ? "users" : "rooms";
  const docId = isUserRoom ? roomId.replace(userId, "") : roomId;

  console.log(docId);
  const [snapshot] = useDocument(
    docId ? doc(db, `${collectionId}/${docId}`) : null
  );

  if (!snapshot?.exists()) return null;

  return {
    id: snapshot.id,
    photoURL:
      snapshot.photoURL ||
      `https://avatars.dicebear.com/api/jdenticon/${snapshot.id}.svg`,
    ...snapshot.data(),
  };
}