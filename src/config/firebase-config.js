// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// http://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqt6qaDOrBSUi2UxoqcInQr8YJWIw-DqE",
  authDomain: "collector-4d30d.firebaseapp.com",
  projectId: "collector-4d30d",
  storageBucket: "collector-4d30d.appspot.com",
  messagingSenderId: "723730779933",
  appId: "1:723730779933:web:0e5c5dbc066156ea809bf4",
  measurementId: "G-CRD1P8G2VT",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const google = new GoogleAuthProvider();
