import React, {useEffect, useContext } from "react";
import * as app from "../../firebase";
import { Container,Box, Tabs, Tab} from "@mui/material";
import {
    useCollectionData,
} from "react-firebase-hooks/firestore";
import { UserContext } from "../../Providers/UserContext";
import AdminPrediction from "./AdminPrediction";
import AdminFunctions from "./AdminFunctions";
import AddPrediction from "./AddPrediction";

function AdminPage() {
    
    useEffect(() => {
        document.title = "Admin Page";
    }, []);

    
        return <AdminPageContent/>;
    
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
                if(user.userData.private === false) {
                    return <div>You can't access this page!</div>
                }
                return <Predictions type="private" />;
            case 2:
                return <AdminFunctions />;
            case 3:
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
                    <Tab label="Private Predictions" />
                    <Tab label="Admin Functions" />
                    <Tab label="Add a prediction" />
                </Tabs>
            </Box>
            <SwitchComponent tabIndex={tabIndex}/>
        </Container>
    );
}

const Predictions = ({type}) => {
    const predQuery = app.db
        .collection(type === "private" ? "/privatePredictions" : "/predictions")
        .where("isCompleted", "!=", true);
    const [predictions, load, error] = useCollectionData(predQuery, {
        idField: "id",
    });



    // console.log(predictions);
    if(error) {
        return <div> You do not have access to this page! </div>;
    }
    if (load) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {predictions.map((prediction) => (
                <AdminPrediction key={prediction.id} data={prediction} type={type}/>
            ))}
        </>
    );
};

export default AdminPage;
