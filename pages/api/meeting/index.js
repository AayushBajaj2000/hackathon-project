import { db } from "@utils/db";
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const id = req.query.id;
  const docRef = doc(db, "Meetings", id);
  const docc = await getDoc(docRef);
  res.status(200).json(docc.data());
}
