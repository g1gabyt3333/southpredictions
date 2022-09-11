import React, {useEffect, useContext } from "react";
import * as app from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Box, Tabs, Tab} from "@mui/material";
import {
    useCollectionData,
} from "react-firebase-hooks/firestore";
import { UserContext } from "../../Providers/UserContext";
import AdminPrediction from "./AdminPrediction";
import AdminFunctions from "./AdminFunctions";
import AddPrediction from "./AddPrediction";

function AdminPage() {
    const [user, loading, error] = useAuthState(app.auth);

    useEffect(() => {
        document.title = "Admin Page";
    }, []);

    if (error || user === null) {
        return <div> You must be signed in to view page! </div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        
        

        return <AdminPageContent user={user} />;
    }
}




function AdminPageContent(props) {
    // const checkAdmin = app.db.collection("/user").doc(props.user.uid);
    // const [data, load, e2] = useDocumentData(checkAdmin);

    const user = useContext(UserContext);
    // console.log(user)
    const [tabIndex, setTabIndex] = React.useState(0);

    if (user.userData.admin === false) {
        return <div>You are not an admin!</div>;
    }

    const SwitchComponent = ({tabIndex}) => {
        switch (tabIndex) {
            case 0:
                return <Predictions />;
            case 1:
                return <AdminFunctions />;
            case 2:
                return <AddPrediction />;
            default:
                return <div>Item One</div>;
        }
    };

    const handleChange = (e, newValue) => {
        setTabIndex(newValue);
        console.log(tabIndex);
    };

    return (
        <Container maxWidth="xl">
            <h1>Admin Page</h1>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginBottom: "15px",
                }}
            >
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    <Tab label="Open Predictions" />
                    <Tab label="Admin Functions" />
                    <Tab label="Add a prediction" />
                </Tabs>
            </Box>
            <SwitchComponent tabIndex={tabIndex}/>
        </Container>
    );
}

const Predictions = (props) => {
    const predQuery = app.db
        .collection("/predictions")
        .where("isCompleted", "!=", true);
    const [predictions, load] = useCollectionData(predQuery, {
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
