// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBnsqcsaqBgCPdbE_VCMp5iH0W7QplbRk",
  authDomain: "sunstatehomes-b37a0.firebaseapp.com",
  projectId: "sunstatehomes-b37a0",
  storageBucket: "sunstatehomes-b37a0.firebasestorage.app",
  messagingSenderId: "874605247731",
  appId: "1:874605247731:web:7385ef809b6ffa33ec8b86",
  measurementId: "G-0DDQKLWXC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);