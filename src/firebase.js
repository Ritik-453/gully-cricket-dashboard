import { initializeApp } from "firebase/app"

import {
  getFirestore,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCOdEsmOW2bpTLAvfxEIQjnzDo4wzxzkjs",
  authDomain: "gully-cricket-dashboard.firebaseapp.com",
  projectId: "gully-cricket-dashboard",
  storageBucket: "gully-cricket-dashboard.firebasestorage.app",
  messagingSenderId: "721400424382",
  appId: "1:721400424382:web:1b78a3396d77889ca0bbef",
  measurementId: "G-34NDLM2NE3"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)