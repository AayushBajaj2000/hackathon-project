import { db } from "@utils/db";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { currentIdea, meetingId } = req.body;
  const docRef = doc(db, "Meetings", meetingId);
  const docSnap = await updateDoc(docRef, {
    currentIdea: currentIdea,
  });
  res.status(200).json({ id: "updated" });
}
