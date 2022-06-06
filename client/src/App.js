import Predictions from './components/Predictions';
import Leaderboard from './components/Leaderboard';
import "./App.css";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";

//create mui dark mode
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <Navbar />
                
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/predictions" component={Predictions} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    
                </Switch>

            </ThemeProvider>
        </div>
    );
}

export default App;
