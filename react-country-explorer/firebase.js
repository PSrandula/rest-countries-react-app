// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyAK-30WR5jdv_d41V1SWifVzkMxrd-um6E",
  authDomain: "rest-countries-react.firebaseapp.com",
  databaseURL: "https://rest-countries-react-default-rtdb.firebaseio.com",
  projectId: "rest-countries-react",
  storageBucket: "rest-countries-react.firebasestorage.app",
  messagingSenderId: "430287841596",
  appId: "1:430287841596:web:2aa26b96fdfc16db019639",
  measurementId: "G-YHNGTCSZNX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); 

export { auth, db };
