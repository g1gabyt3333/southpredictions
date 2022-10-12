import React from "react";
import * as app from "../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { Button } from "@mui/material";

// const setUsers = async() => {
//     let makeUser = app.functions.httpsCallable("makeUser");
//     let userArray = await (await makeUser()).data.users;
//     userArray.forEach((user) => {
//         if(user.email.split("@")[1] === "wwprsd.org" && user.email.split("@")[0] !== "23ak0321") {
//             const query = app.db.collection(`/user`).doc(user.uid);
//             console.log(user)
//             const newDoc =  query.set({
//                 admin: false,
//                 email: user.email,
//                 name: user.displayName,
//                 uid: user.uid,
//                 predictions: {
//                     wins: 0,
//                     losses: 0,
//                 }
//             })
//             console.log(newDoc)
//         }
//     })
// }

export default function AdminFunctions() {
    const addNewPrediction = async () => {
        await app.db.collection("/predictions").add({
            dateCreated: serverTimestamp(),
            isCompleted: false,
            options: ["Yes", "No"],
            prediction: "Will I get an a on my next test?",
            results: {
                Yes: 0,
                No: 0,
            },
        });
    };

    const debug = async () => {
        // async function docTemplate() {
        //     let getCollectionTemplate = app.functions.httpsCallable("docTemplate");
        //     let userArray = await getCollectionTemplate();
        //     console.log(userArray);
        // }

        // async function getUserTest() {
        //     const getUser = app.functions.httpsCallable("getUser");
        //     let { data } = await getUser({ userId: "J5KxihjeU1aqKNDLmkZgKHOe11b2" });
        //     console.log(data);
        // }

        const uq = app.db.collection("/user");
        // let arr = [];
        uq.get().then((data) => {
            data.docs.forEach((doc) => {
                const query = app.db.collection("/user").doc(doc.id);

                query.update({
                    privateProfile: false
                })
                .then(
                    (data) => {
                        console.log(data)
                    }
                )
            });
        });
    };
    // const [state, dispatch] = React.useReducer(reducer, {});
    return (
        <>
            <Button variant="contained" onClick={addNewPrediction}>
                Add a temp prediction
            </Button>
            <Button variant="contained" onClick={debug}>
                Debug
            </Button>
        </>
    );
}
