
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDZPD96vMxytYLxiUp6B1vgLWz6uKYzQdM",
    authDomain: "water-purifier-website.firebaseapp.com",
    databaseURL: "https://water-purifier-website-default-rtdb.firebaseio.com",
    projectId: "water-purifier-website",
    storageBucket: "water-purifier-website.appspot.com",
    messagingSenderId: "858370338165",
    appId: "1:858370338165:web:30387392c035b11b48b73c"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };  
