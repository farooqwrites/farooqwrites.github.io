import {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "./firebase.js";

const counter = document.getElementById("visitor-count");

async function updateVisitors() {
  try {
    const ref = doc(db, "website", "stats");

    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        visitors: 1
      });

      counter.textContent = 1;
      return;
    }

    await updateDoc(ref, {
      visitors: increment(1)
    });

    const updated = await getDoc(ref);

    counter.textContent = updated.data().visitors;

  } catch (err) {
    console.error(err);
  }
}

updateVisitors();
