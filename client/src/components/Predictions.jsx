import React from "react";
import * as app from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "@mui/material";
import Prediction from "./Prediction";


const prediction = {
    dateCreated: new Date(),
    prediction: "Will school start on September 6th?",
    options: [
        "Yes",
        "No",
    ]
}
export default function Predictions() {
    const [user, loading, error] = useAuthState(app.auth);
    const [predictions, setPredicitons] = React.useState([]);



    if (!user || error) {
        return <div> You must be signed in to view page! </div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "6vh"}}>
            <Prediction data={prediction}/>
        </Container>
    );
}
