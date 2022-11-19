import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoNrB4SEk7VMU7q2IoWv5UlSOoBP11Dag",
    authDomain: "email-application-3408b.firebaseapp.com",
    projectId: "email-application-3408b",
    storageBucket: "email-application-3408b.appspot.com",
    messagingSenderId: "408208002281",
    appId: "1:408208002281:web:aba11b020ac484698df478"
};

const app = initializeApp(firebaseConfig);
// Initialize service that we want to use in this case firestore.
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };