import { auth } from "@utils/db";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  const { email, password } = req.body;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).json({ id: user.uid });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      res.status(400).json({ error: errorMessage });
    });
}
