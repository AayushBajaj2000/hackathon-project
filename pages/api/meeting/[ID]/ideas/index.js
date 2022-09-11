import db from "../../../../../utils/db"
import { getDocs, query, collection } from "firebase/firestore";


export default async function handler(req, res) {
    const docRef = collection(db, "Meetings/" + req.query.ID + "/Ideas")
    const docc = query(docRef)
    const querySnapshot = await getDocs(docc);
    const ideas = []
    querySnapshot.forEach((doc) => {

        ideas.push(doc.data())
    });
    res.status(200).json({ ideas: ideas.sort((a, b) => b.rating - a.rating) })
}
