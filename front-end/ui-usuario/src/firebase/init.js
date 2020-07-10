
import firebase from 'firebase';/* 
import firestore from 'firebase/firebase'; */
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAHSlOlb1Rd7oe6sqCqrQ8MbvJ7iNaQjKE",
    authDomain: "eltornilloquetefalta-51284.firebaseapp.com",
    databaseURL: "https://eltornilloquetefalta-51284.firebaseio.com",
    projectId: "eltornilloquetefalta-51284",
    storageBucket: "eltornilloquetefalta-51284.appspot.com",
    messagingSenderId: "918376933061",
    appId: "1:918376933061:web:3beb41f1600c75dccf32ac",
    measurementId: "G-6LJXVMEQNP"
  };

const firebaseApp= firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true});

export default firebaseApp.firestore();