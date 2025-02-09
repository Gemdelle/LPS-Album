// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBrJv9eWV1l0fHuBo3SQk2Xwc21D6Qyr2o",
    authDomain: "lps-album-565bb.firebaseapp.com",
    projectId: "lps-album-565bb",
    storageBucket: "lps-album-565bb.firebasestorage.app",
    messagingSenderId: "382974334095",
    appId: "1:382974334095:web:4b79c5bd0c837f77444cfa",
    measurementId: "G-NSST6H413P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);