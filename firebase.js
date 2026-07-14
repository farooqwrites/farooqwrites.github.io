// ===============================
// Farooq Writes Firebase
// Final Version
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaWAkE-RT2BROPAnxXINTgR-2SBR5r_I8",
  authDomain: "farooq-writes.firebaseapp.com",
  projectId: "farooq-writes",
  storageBucket: "farooq-writes.firebasestorage.app",
  messagingSenderId: "968386759160",
  appId: "1:968386759160:web:d095bc9d505d098b6eee0d",
  measurementId: "G-Z5PPK164B1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics
const analytics = getAnalytics(app);

// Firestore
const db = getFirestore(app);

// Export for app.js
export { app, db, analytics };
