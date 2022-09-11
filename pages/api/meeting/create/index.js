import { db } from "@utils/db";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { name } = req.body;
  const docRef = await addDoc(collection(db, "Meetings"), {
    currentIdea: "",
    num_users: 0,
    status: 0,
    team_name: name,
  });
  res.status(200).json({ id: docRef.id });
}
