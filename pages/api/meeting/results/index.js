import { db } from "@utils/db";
import { getDocs, query, collection } from "firebase/firestore";

export default async function handler(req, res) {
  const id = req.query.id;
  const docRef = collection(db, "Meetings/" + id + "/Ideas");
  const docc = query(docRef);
  const querySnapshot = await getDocs(docc);
  const ideas = [];
  querySnapshot.forEach((doc) => {
    ideas.push({ data: doc.data(), id: doc.id });
  });
  res
    .status(200)
    .json({ ideas: ideas.sort((a, b) => a.data.rating > b.data.rating) });
}
