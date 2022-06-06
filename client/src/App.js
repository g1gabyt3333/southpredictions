import logo from "./logo.svg";
import "./App.css";
import Ok from "./Ok";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";

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
                <Ok />
                <Ok />
                <Ok />
            </ThemeProvider>
        </div>
    );
}

export default App;
