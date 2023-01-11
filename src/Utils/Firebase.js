import firebase from 'firebase/compat/app';
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyDRxJU8fd9v5LfXqRggf8tIBQaOo44DBv4",
    authDomain: "musicfy-100799.firebaseapp.com",
    projectId: "musicfy-100799",
    storageBucket: "musicfy-100799.appspot.com",
    messagingSenderId: "1021806606158",
    appId: "1:1021806606158:web:2ea4d21305633158d4d01f"
  };

export default firebase.initializeApp(firebaseConfig);