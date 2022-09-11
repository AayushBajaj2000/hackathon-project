import { db, auth } from "@utils/db";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const { email, password, role } = req.body;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Add a new document with a generated id.
      const addUser = async () => {
        const docRef = await setDoc(doc(db, "User", user.uid), {
          email: email,
          stats: "",
          role: role,
        });
        return res.status(200).json({ id: user.uid });
      };

      addUser();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return res.status(400).json({ error: errorMessage });
    });
}
