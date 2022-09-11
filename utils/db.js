import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY0btPmkUw1kMeeutMc_h3Mph12mJnfXM",
  authDomain: "omega-f42bc.firebaseapp.com",
  projectId: "omega-f42bc",
  storageBucket: "omega-f42bc.appspot.com",
  messagingSenderId: "420195828639",
  appId: "1:420195828639:web:06b2fdfd23bdd8c0f6f3aa",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
