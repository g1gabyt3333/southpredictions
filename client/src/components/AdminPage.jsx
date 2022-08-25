import React from "react";
import * as app from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container, Tabs, Tab } from "@mui/material";
import { useDocumentData } from "react-firebase-hooks/firestore";

function AdminPage() {
    const [user, loading, error] = useAuthState(app.auth);
    console.log(user);
    if (error) {
        return <div> You must be signed in to view page! </div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        return <AdminPageContent user={user} />;
    }
}

function AdminPageContent(props) {
    const checkAdmin = app.db
        .collection("/user")
        .doc(props.user.email.split("@")[0]);
    const [data, load, e2] = useDocumentData(checkAdmin);
    console.log(e2);
    console.log(data);


    if(load) {
        return <div>Loading...</div>;
    }
    if (!data || e2 || data.admin !== true) {
        return <div> You must be an admin to view page! </div>;
    }

    return ( 

        <Container>

            <h1>Admin Page</h1>

        </Container>
    );

    
}

export default AdminPage;
