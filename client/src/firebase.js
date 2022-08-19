import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";





firebase.initializeApp({
    apiKey: "AIzaSyDj52gqCohCpZ-g_sXh2Z8O86YnI0oIzew",

    authDomain: "southpredictions.firebaseapp.com",

    projectId: "southpredictions",

    storageBucket: "southpredictions.appspot.com",

    messagingSenderId: "609679122673",

    appId: "1:609679122673:web:f90fc762c71418bd570950",

    measurementId: "G-065M7ZB9K3",
});



/**
 * @returns Authentication service
 */
const auth = firebase.auth();
const db = firebase.firestore();



const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};



const signOut = () => {
    auth.signOut();
};


export {
    signIn, signOut, auth, db
}
