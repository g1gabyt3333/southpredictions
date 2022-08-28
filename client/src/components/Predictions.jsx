import React from "react";
import * as app from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Snackbar, Alert } from "@mui/material";
import Prediction from "./Prediction";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Predictions() {
    const [user, loading, error] = useAuthState(app.auth);
    const [openError, setOpenError] = React.useState(false);
    const query = app.db
        .collection("/predictions")
        .orderBy("dateCreated", "desc");
    const [values, load, e] = useCollectionData(query, {
        idField: "id",
    });

    if (!user || error || e) {
        return <div> You must be signed in to view page! </div>;
    }

    if (loading || load) {
        return <div>Loading...</div>;
    }

    const handleClose = () => {
        setOpenError(false);
    };

    console.log(values);
    return (
        <Container
            maxWidth="xl"
            sx={{
                marginTop: "6vh",
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
            }}
        >
            {values.map((prediction) => (
                <Prediction key={prediction.id} data={prediction} user={user} e={setOpenError}/>
            ))}
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    You already voted!
                </Alert>
            </Snackbar>
        </Container>
    );
}
