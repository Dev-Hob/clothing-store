import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAplz-9myii61BMua3oH0FKBPT_qdAnHGc",
  authDomain: "clothing-store-db-f8347.firebaseapp.com",
  projectId: "clothing-store-db-f8347",
  storageBucket: "clothing-store-db-f8347.appspot.com",
  messagingSenderId: "595663700642",
  appId: "1:595663700642:web:8ea7be68d79034988d8dfb",
  measurementId: "G-106VK4XH7S"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    "prompt": "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) 

export const db = getFirestore();

export const create_user_document_from_auth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("User exist : ", userSnapshot.exists())
  if(!userSnapshot.exists()) {
    const date = new Date();
    const { displayName, email } = userAuth;

    try {
      await setDoc(userDocRef, { displayName, email, date });
    } catch (error) {
      console.log("error was encountered while creating user : ", error.message)
    }
  }
  
}