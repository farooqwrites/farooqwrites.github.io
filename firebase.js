import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaWAkE-RT2BROPAnxXINTgR-2SBR5r_I8",
  authDomain: "farooq-writes.firebaseapp.com",
  projectId: "farooq-writes",
  storageBucket: "farooq-writes.firebasestorage.app",
  messagingSenderId: "968386759160",
  appId: "1:968386759160:web:d095bc9d505d098b6eee0d",
  measurementId: "G-Z5PPK164B1"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const db = getFirestore(app);

export {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
};
