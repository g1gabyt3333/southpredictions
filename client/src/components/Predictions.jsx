import React from "react";
import * as app from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "@mui/material";
import Prediction from "./Prediction";


const predictionsArray = [
    {
        dateCreated: new Date(),
        prediction: "Will school start on September 6th?",
        options: ["Yes", "No"],
        isCompleted: false,
        results : [
            {"Yes": 32},
            {"No": 3}
        ]
    },
    {
        dateCreated: new Date(),
        prediction: "Will we have split lunches this year?",
        options: ["Yes", "No"],
        isCompleted: true,
        results : [
            {"Yes": 10},
            {"No": 33}
        ]
    },
];
export default function Predictions() {
    const [user, loading, error] = useAuthState(app.auth);
    const [predictions, setPredicitons] = React.useState(predictionsArray);

    if (!user || error) {
        return <div> You must be signed in to view page! </div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: "6vh", display: "flex", flexDirection: "column", rowGap: "20px" }}>

            {predictions.map((prediction, index) => (
                <Prediction key={index} data={prediction} />
            ))}
        </Container>
    );
}
