import { collection, doc, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../utils/firebase";

export default function useUsers(user: any) {
  const [snapshot] = useCollection(
    query(collection(db, "users"), orderBy("timestamp", "desc"))
  );

  const users: { id: string }[] = [];

  snapshot?.docs.forEach((doc) => {
    const id =
      doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`;

    if (doc.id !== user.uid) {
      users.push({ id, ...doc.data() });
    }
  });
  return users;
}
