// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyCJ7O6kNTAxFHIaIRTUPZMVrA_Ogkl30PY",
//   authDomain: "fir-next-chat-349a1.firebaseapp.com",
//   projectId: "fir-next-chat-349a1",
//   storageBucket: "fir-next-chat-349a1.appspot.com",
//   messagingSenderId: "17504100884",
//   appId: "1:17504100884:web:6e021edef74678fb99bd01",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCLvVgzGXc2G6BDi3BDiPvX0KCwyzmzxVQ",
  authDomain: "fir-chat-unirexcity.firebaseapp.com",
  projectId: "fir-chat-unirexcity",
  storageBucket: "fir-chat-unirexcity.appspot.com",
  messagingSenderId: "413436458604",
  appId: "1:413436458604:web:51bd7276180611afc00a49",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
