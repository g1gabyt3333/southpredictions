import React from "react";
import * as app from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Snackbar, Alert } from "@mui/material";
import Prediction from "./Prediction";
import TabBar from "./TabBar";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Predictions() {
    const [user, loading, error] = useAuthState(app.auth);
    const [openError, setOpenError] = React.useState(false);
    const [filterType, setFilterType] = React.useState(0); // 0 = pending, 1 = completed, 2= all
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

    const handleFilter = (e, newValue) => {
        setFilterType(newValue);
    }
    let filter = [];
    if(filterType === 0) {
        filter = values.filter(value => value.isCompleted === false);
    } 
    else if(filterType === 1) {
        filter = values.filter(value => value.isCompleted === true);
    }
    else {
        filter = values;
    }
    console.log(filter)
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
            <TabBar handleFilter={handleFilter} filter={filterType}/>
            {filter.map((prediction) => (
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
