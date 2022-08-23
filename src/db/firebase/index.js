// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web index's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase
export const app = initializeApp({
  ...firebaseConfig,
  custom: undefined,
});
export const db = getFirestore(app);
