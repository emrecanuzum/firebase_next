import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase";

export default function useChats(user: { uid: any }) {
  const [snapshot] = useCollection(
    query(
      collection(db, `users/${user.uid}/chats`),
      orderBy("timestamp", "desc")
    )
  );
  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return chats;
}
