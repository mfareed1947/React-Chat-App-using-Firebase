
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM131QSaseXRFNUvNOFJR6cLsTZqmMzPE",
  authDomain: "chat-app-5fcec.firebaseapp.com",
  projectId: "chat-app-5fcec",
  storageBucket: "chat-app-5fcec.appspot.com",
  messagingSenderId: "533204755363",
  appId: "1:533204755363:web:43b136fe828824edacb016"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()