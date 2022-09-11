import { db } from "@utils/db";
import { doc, increment, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { ideaId, meetingId, rating } = req.body;
  const docRef = doc(db, "Meetings/" + meetingId + "/Ideas/" + ideaId);
  const docSnap = await updateDoc(docRef, {
    rating: increment(rating),
  });
  res.status(200).json({ id: "updated" });
}
