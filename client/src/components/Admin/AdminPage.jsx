import React from "react";
import * as app from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Container} from "@mui/material";
import { useDocumentData, useCollectionData } from "react-firebase-hooks/firestore";
import { serverTimestamp }  from "firebase/firestore";
import  AdminPrediction  from "./AdminPrediction";

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
    const checkAdmin = app.db
        .collection("/user")
        .doc(props.user.uid);
    const [data, load, e2] = useDocumentData(checkAdmin);


    if(load) {
        return <div>Loading...</div>;
    }
    if (!data || e2 || data.admin !== true) {
        return <div> You must be an admin to view page! </div>;
    }

    const addNewPrediction = () => {
        app.db.collection("/predictions").add({
            dateCreated: serverTimestamp(),
            isCompleted: false,
            options: [
                "Yes",
                "No",
            ],
            prediction: "Will Rajat Gupta pull Minthra GIN?",
            results: {
                "Yes" : 0,
                "No": 0
            }
                
            

        })



    }

    return ( 

        <Container>

            <h1>Admin Page</h1>
            <button onClick={addNewPrediction}>Click</button>
            <Predictions />

        </Container>
    );

    
}

const Predictions = (props) => { 
    const predQuery = app.db.collection("/predictions").where("isCompleted", "!=", true)
    const [predictions, load, e] = useCollectionData(predQuery, {
        idField: "id",
    });

    console.log(predictions)


    if (load) {
        return <div>Loading...</div>;
    }
    return <> 
    
        {
            predictions.map((prediction) => (
                <AdminPrediction key={prediction.id} data={prediction} />
            ))
        }
    </>;



}

export default AdminPage;
