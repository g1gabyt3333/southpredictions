import React, { Component } from "react";
import * as app from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography } from "@mui/material";
import { ClassNames } from "@emotion/react";

class Forum extends Component {
    render() {
        return (
            <>
                <Typography variant="h6">{this.props.message}</Typography>
            </>
        );
    }
}

export default function ForumPost() {
    const forumRef = app.db.collection("forum");
    const query = forumRef.orderBy("message").limit(10);

    const [values, loading, error, snapshot] = useCollectionData(query, {
        idField: 'id',
    });
    console.log(values)

    // console.log(values);
    if (error) {
        return <div> You must be signed in to do that!</div>;
    }

    return (
        <div>
            {values &&
                values.map((message) => (
                    <Forum key={message.id} message={message.message} />
                ))}
        </div>
    );
}
