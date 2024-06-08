import { addDoc, collection } from "firebase/firestore";
import { firebaseStore } from "./firebase";

export async function createUser(uid: string, title: string) {
  try {
    console.log("uid: " + uid);
    const docRef = await addDoc(collection(firebaseStore, "users"), {
      uid,
      title,
    });
    console.log(docRef.id);
  } catch (error) {
    console.error(error);
  }
}
