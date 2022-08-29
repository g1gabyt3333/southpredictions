import React from "react";
import * as app from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { Button } from "@mui/material";

export default function AdminFunctions() {
    const addNewPrediction = () => {
        app.db.collection("/predictions").add({
            dateCreated: serverTimestamp(),
            isCompleted: false,
            options: ["Yes", "No"],
            prediction: "Will Rajat Gupta hit diamond?",
            results: {
                Yes: 0,
                No: 0,
            },
        });
    };
    // const [state, dispatch] = React.useReducer(reducer, {});
    return (
        <>
            <Button variant="contained" onClick={addNewPrediction}>Add a temp prediction</Button>
        </>
    );
}
