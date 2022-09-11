import db from "@utils/db";
import { getDocs, query, collection, addDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query.id;
    const docRef = collection(db, "Meetings/" + id + "/Ideas");
    const docc = query(docRef);
    const querySnapshot = await getDocs(docc);
    const ideas = [];
    querySnapshot.forEach((doc) => {
      ideas.push({ data: doc.data(), id: doc.id });
    });
    res.status(200).json({ ideas: ideas });
  } else if (req.method === "POST") {
    const { idea, id, user } = req.body;
    const docRef = collection(db, "Meetings/" + id + "/Ideas");
    const docSnap = await addDoc(docRef, {
      text: idea,
      rating: 0,
      createdAt: new Date(),
      username: user,
    });

    // update the current idea
    const meetingRef = doc(db, "Meetings", id);
    await updateDoc(meetingRef, {
      currentIdea: docSnap.id,
    });

    res.status(200).json({ id: docSnap.id });
  }
}
