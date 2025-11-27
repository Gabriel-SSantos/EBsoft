// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, initializeFirestore, persistentLocalCache,persistentMultipleTabManager } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoSlruYA1OFVlN40m1HEs9EX3kb1kfDGc",
  authDomain: "db-ebd-soft.firebaseapp.com",
  projectId: "db-ebd-soft",
  storageBucket: "db-ebd-soft.firebasestorage.app",
  messagingSenderId: "799912624559",
  appId: "1:799912624559:web:639d7da797314f8bd6af5a",
  measurementId: "G-S2LBS3SVRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app,{
  localCache: persistentLocalCache({
    //Resolve o problema de multiplas abas
    tabManager: persistentMultipleTabManager()
  })
});
const analytics = getAnalytics(app); 
