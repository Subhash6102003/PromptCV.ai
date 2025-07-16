// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MEASUREMENT"
};

// Initialize Firebase with error handling
let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize Analytics (only in browser environment)
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Continue without Firebase
}

// Export Firebase services
export { auth, db, storage, analytics };

// Helper functions for authentication
export const signInWithGoogle = async () => {
  if (!auth) throw new Error('Firebase auth not initialized');
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

export const signOutUser = async () => {
  if (!auth) throw new Error('Firebase auth not initialized');
  return await signOut(auth);
};

export const onAuthStateChange = (callback) => {
  if (!auth) {
    console.warn('Firebase auth not initialized');
    return () => {}; // Return empty unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
};

export default app;
