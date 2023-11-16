// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANBWsm5BQTabne5xARconN2tkL89JletA",
  authDomain: "agricultureproject-b13bc.firebaseapp.com",
  databaseURL: "https://agricultureproject-b13bc-default-rtdb.firebaseio.com",
  projectId: "agricultureproject-b13bc",
  storageBucket: "agricultureproject-b13bc.appspot.com",
  messagingSenderId: "250658576594",
  appId: "1:250658576594:web:ea6732c5a38f36ef43b50b",
  measurementId: "G-4Y3GJV5JRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database }; // Export the database object
