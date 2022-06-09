import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as app from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography } from "@mui/material";
import { ClassNames } from "@emotion/react";

class Forum extends Component {
    render() {
        return (
            <>
                <Typography
                    variant="h6"
                    sx={{
                        display: "block",
                        textDecoration: "none",
                        color: "white",
                    }}
                    component={Link}
                    to={`/forum/${this.props.msgId}`}
                >
                    {this.props.message}
                </Typography>
            </>
        );
    }
}

export default function ForumPost() {
    const forumRef = app.db.collection("forum");
    const query = forumRef.orderBy("message").limit(10);

    const [values, loading, error, snapshot] = useCollectionData(query, {
        idField: "id",
    });

    console.log(values);
    if (error) {
        return <div> You must be signed in for access!</div>;
    }

    return (
        <div>
            {values &&
                values.map((message) => (
                    <Forum
                        key={message.id}
                        msgId={message.id}
                        message={message.message}
                    />
                ))}
        </div>
    );
}
