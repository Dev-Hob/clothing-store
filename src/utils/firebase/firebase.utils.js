import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore"
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider) 
export const signInWithEmail = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}
export const signUpWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);  


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach( (object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q)
  const category = querySnapshot.docs.map( docSnapshot => docSnapshot.data())
  return category;
}


export const create_user_document_from_auth = async (userAuth) => { 
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log("User exist : ", userSnapshot)
  if(!userSnapshot.exists()) {
    const date = new Date();
    const { displayName, email } = userAuth;

    try {
       await setDoc(userDocRef, { displayName, email, date });
    } catch (error) {
      console.log("error was encountered while creating user : ", error.message)
    }
  }

  return userSnapshot;
  
}

export const getCurrentUser = () => {
  return new Promise( (resolve, reject) => {
   const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth)
   },
   reject
   )
  })
}