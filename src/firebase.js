import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCOdEsmOW2bpTLAvfxEIQjnzDo4wzxzkjs",
  authDomain: "gully-cricket-dashboard.firebaseapp.com",
  projectId: "gully-cricket-dashboard",
  storageBucket: "gully-cricket-dashboard.firebasestorage.app",
  messagingSenderId: "721400424382",
  appId: "1:721400424382:web:1b78a3396d77889ca0bbef",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const googleProvider =
  new GoogleAuthProvider()
