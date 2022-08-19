import React from "react";
import * as app from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container } from "@mui/material";
import Prediction from "./Prediction";

export default function Predictions() {
    const [user, loading, error] = useAuthState(app.auth);

    if (!user || error) {
        return <div> You must be signed in to view page! </div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "6vh"}}>
            <Prediction />
        </Container>
    );
}
