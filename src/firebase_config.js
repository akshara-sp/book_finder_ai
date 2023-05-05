import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "book-finder-ai",
    storageBucket: "book-finder-ai.appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);
export { db, auth }