import Predictions from "./components/Predictions";
import Leaderboard from "./components/Leaderboard";
import "./App.css";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { Grid, Button } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyDj52gqCohCpZ-g_sXh2Z8O86YnI0oIzew",

    authDomain: "southpredictions.firebaseapp.com",

    projectId: "southpredictions",

    storageBucket: "southpredictions.appspot.com",

    messagingSenderId: "609679122673",

    appId: "1:609679122673:web:f90fc762c71418bd570950",

    measurementId: "G-065M7ZB9K3",
});

const auth = firebase.auth();
const db = firebase.firestore();

//create mui dark mode
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App() {
    const [user, loading, error] = useAuthState(auth);

    if(user && user.email.split("@")[1] !== "wwprsd.org"){

        setTimeout(() => {
            auth.signOut();
        }, 2500);
        return <div>WW-P students only! You will be signed out shortly!</div>
    };

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <Navbar user={user} signIn={google} signOut={signOut} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Home
                                user={user}
                                signIn={google}
                                signOut={signOut}
                            />
                        )}
                    />
                    <Route path="/predictions" component={Predictions} />
                    <Route path="/leaderboard" component={Leaderboard} />
                </Switch>
            </ThemeProvider>
        </div>
    );
}

/**
 * Sign in with Google.
 */
const google = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

const signOut = () => {
    auth.signOut();
};
