import Predictions from "./components/Predictions";
import Leaderboard from "./components/Leaderboard";
import "./App.css";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { Grid, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./components/Profile";

import * as app from "./firebase";
import Forum from "./components/Forum";

//create mui dark mode
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App() {
    const [user, loading, error] = useAuthState(app.auth);

    if (user && user.email.split("@")[1] !== "wwprsd.org") {
        setTimeout(() => {
            app.auth.signOut();
        }, 2500);
        return <div>WW-P students only! You will be signed out shortly!</div>;
    }

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <Navbar user={user} />
                <Switch>
                    <Route exact path="/" render={() => <Home user={user} />} />
                    <Route path="/predictions" component={Predictions} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/forum" component={Forum} />
                    <Route
                        path={"/profile/:id"}
                        render={(props) => (
                            <Profile userId={props.match.params.id} />
                        )}
                    />
                </Switch>
            </ThemeProvider>
        </div>
    );
}

/**
 * Sign in with Google.
 */
