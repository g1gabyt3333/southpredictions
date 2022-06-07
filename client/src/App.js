import Predictions from "./components/Predictions";
import Leaderboard from "./components/Leaderboard";
import "./App.css";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";

//create mui dark mode
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false 
        }
        this.toggleLogin = this.toggleLogin.bind(this);
    }


    toggleLogin() {
        this.setState(st => ({isLoggedIn : !st.isLoggedIn}));
    }
    render() {
        return (
            <div className="App">
                <ThemeProvider theme={darkTheme}>
                    <Navbar isLoggedIn={this.state.isLoggedIn} toggle={this.toggleLogin} />

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/predictions" component={Predictions} />
                        <Route path="/leaderboard" component={Leaderboard} />
                    </Switch>
                </ThemeProvider>
            </div>
        );
    }
}
