import React from "react";
import * as app from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Box, Tabs, Tab } from "@mui/material";
import {
    useDocumentData,
    useCollectionData,
} from "react-firebase-hooks/firestore";

import AdminPrediction from "./AdminPrediction";
import AdminFunctions from "./AdminFunctions";

function AdminPage() {
    const [user, loading, error] = useAuthState(app.auth);
    if (error) {
        return <div> You must be signed in to view page! </div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return <AdminPageContent user={user} />;
    }
}




function AdminPageContent(props) {
    const checkAdmin = app.db.collection("/user").doc(props.user.uid);
    const [data, load, e2] = useDocumentData(checkAdmin);
    const [tabIndex, setTabIndex] = React.useState(0);

    if (load) {
        return <div>Loading...</div>;
    }
    if (!data || e2 || data.admin !== true) {
        return <div> You must be an admin to view page! </div>;
    }

    

    const switchComponent = (tabIndex) => {
        switch (tabIndex) {
            case 0:
                return <Predictions />;
            case 1:
                return <AdminFunctions />;
            case 2:
                return <div>Item Three</div>;
            default:
                return <div>Item One</div>;
        }
    }

    const handleChange = (e, newValue) => {
        setTabIndex(newValue);
        console.log(tabIndex);
    }

    return (
        <Container maxWidth="xl">
            <h1>Admin Page</h1>
            <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "15px" }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Open Predictions"/>
                    <Tab label="Admin Functions" />
                    <Tab label="Add a prediction" />
                </Tabs>
            </Box>
            


            {switchComponent(tabIndex)}

        </Container>
    );
}

const Predictions = (props) => {
    const predQuery = app.db
        .collection("/predictions")
        .where("isCompleted", "!=", true);
    const [predictions, load, e] = useCollectionData(predQuery, {
        idField: "id",
    });

    // console.log(predictions);

    if (load) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {predictions.map((prediction) => (
                <AdminPrediction key={prediction.id} data={prediction} />
            ))}
        </>
    );
};

export default AdminPage;
