import React from "react";
import * as app from "../../firebase";
import { Container, Snackbar, Alert, Typography } from "@mui/material";
import Prediction from "./Prediction";
import TabBar from "./TabBar";
import { useCollectionData } from "react-firebase-hooks/firestore";

 function Predictions({ type }) {
    const [openError, setOpenError] = React.useState(false);
    const [filterType, setFilterType] = React.useState(0); // 0 = pending, 1 = awaiting,  2 = completed, 3 = all
    const query = app.db
        .collection(type === "private" ? "/privatePredictions" : "/predictions")
        .orderBy("dateCreated", "desc");
    const [values, load, e] = useCollectionData(query, {
        idField: "id",
    });

    if (e) {
        return <div> You do not have access to this page! </div>;
    }

    const handleClose = () => {
        setOpenError(false);
    };

    const handleFilter = (e, newValue) => {
        setFilterType(newValue);
    };

    if (load) {
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
                <TabBar handleFilter={handleFilter} filter={filterType} />
                <div> Loading... </div>
            </Container>
        );
    }
    let filter = [];
    if (filterType === 0) {
        filter = values.filter((value) => value.isCompleted === false);
    } else if(filterType === 1) {
        filter = values.filter((value) => value.isCompleted === "awaiting");
    } else if (filterType === 2) {
        filter = values.filter((value) => value.isCompleted === true);
    } else {
        filter = values;
    }
    return (
        <Container
            maxWidth="xl"
            sx={{
                marginTop: "3vh",
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
            }}
        >
            {type === "private" ? (
                <Typography variant="h4">Private Predictions</Typography>
            ) : (
                ""
            )}
            <TabBar handleFilter={handleFilter} filter={filterType} />
            {filter.map((prediction) => (
                <Prediction
                    key={prediction.id}
                    data={prediction}
                    e={setOpenError}
                    type={type}
                />
            ))}
            <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={handleClose}
            >
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


export default React.memo(Predictions)