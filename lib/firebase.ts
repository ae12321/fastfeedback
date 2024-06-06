import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseOptions: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
const firebaseApp = initializeApp(firebaseOptions);

export const firebaseAuth = getAuth(firebaseApp);
