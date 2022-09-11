import db from "../../utils/db"
import { doc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  // for testing purposes
  const docRef = doc(db, "Meetings", "4h4FkhG26qvySbDyUDDx")
  const docc = await getDoc(docRef)
  res.status(200).json(docc.data())
}
