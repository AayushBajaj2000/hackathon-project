import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "omega-f42bc.firebaseapp.com",
    projectId: "omega-f42bc",
    storageBucket: "omega-f42bc.appspot.com",
    messagingSenderId: "420195828639",
    appId: "1:420195828639:web:06b2fdfd23bdd8c0f6f3aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;