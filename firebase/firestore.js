import { collection, addDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";

import { firestore } from './firebase_setup';

export async function addExpense(expense) {
  try {
    const docRef = await addDoc(collection(firestore, "expenses"), expense);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteExpense(key) {
  try {
    await deleteDoc(doc(firestore, "expenses", key));
  } catch (err) {
    console.log(err);
  }
}

export async function toggleImportance(key) {
  try {
    const exp = doc(firestore, "expenses", key);
    const item = await getDoc(exp);
    await setDoc(exp, { important: !item.data().important }, { merge: true });
  } catch (err) {
    console.log(err);
  }
}
