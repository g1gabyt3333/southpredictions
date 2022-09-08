import Predictions from "./components/Predictions/Predictions";
import Leaderboard from "./components/Leaderboard";
import "./App.css";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import Profile from "./components/Profile";
import ForumPost from "./components/ForumPost";
import AdminPage from "./components/Admin/AdminPage";
import { Box } from "@mui/system";

import * as app from "./firebase";
import Forum from "./components/Forum";
import { CircularProgress } from "@mui/material";

//create mui dark mode
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#333333",
        },
    },
    //make buttons use light theme
});

// const lightTheme = createTheme({
//     palette: {
//         mode: "light",
//         primary: {
//             //make appbar background light
//             main: "#fff",
//         },
//         }
//     },
// );

export default function App() {
    const [user, loading] = useAuthState(app.auth);

    if (user && user.email.split("@")[1] !== "wwprsd.org") {
        setTimeout(() => {
            app.auth.signOut();
        }, 2500);
        return <div>WW-P students only! You will be signed out shortly!</div>;
    }
    if (loading) {
       return <Loading />;
    }
    
    



    return <AppLoggedIn user={user} />;
}

const Loading = () => {
    return (
        <div
            style={{
                //center the loading screen on page
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <CircularProgress />
            Loading...
        </div>
    );
};

const AppLoggedIn = ({user}) => {
    
    
    const query = app.db.collection("/user").doc(user.uid);
    const [data, loading, error] = useDocumentDataOnce(query);

    if (loading) {
        return <Loading />;
    }
    return (
        <Box>
            <div className="App">
                <ThemeProvider theme={darkTheme}>
                    <Navbar user={user} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Home user={user} />}
                        />
                        <Route
                            exact
                            path="/predictions"
                            component={Predictions}
                        />
                        <Route
                            exact
                            path="/leaderboard"
                            component={Leaderboard}
                        />
                        <Route
                            exact
                            path="/forum/:id"
                            render={(props) => (
                                <ForumPost postId={props.match.params.id} />
                            )}
                        />
                        <Route exact path="/forum" component={Forum} />
                        <Route
                            path={"/profile/:id"}
                            render={(props) => (
                                <Profile userId={props.match.params.id} />
                            )}
                        />
                        <Route path={"/admin"} component={AdminPage} />
                    </Switch>
                </ThemeProvider>
            </div>
        </Box>
    );
};

/**
 * Sign in with Google.
 */
