import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as app from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

class Forum extends Component {
    render() {
        return (
            <>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
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

const ForumInput = () => {
    const [message, setMessage] = React.useState("");
    const forumRef = app.db.collection("forum");

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        const newDoc = await forumRef.add({
            message: message,
            timePosted: app.makeTimestamp(new Date()),
            
        });
        
        
       

    
        

        console.log("Message added to forum ", newDoc.id);

        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type a message..."
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default function ForumPost() {
    const forumRef = app.db.collection("forum");
    const query = forumRef.orderBy("timePosted", "desc").limit(100);

    const [values, loading, error] = useCollectionData(query, {
        idField: "id",
    });

    if (error) {
        return <div> You must be signed in for access!</div>;
    }
    if (loading) {
        return <CircularProgress />;
    }
    return (
        <div>
            <Typography
                variant="h3"
                sx={{ display: "flex", justifyContent: "center" }}
            >
                Latest Posts
            </Typography>

            {values &&
                values.map((message) => (
                    <Forum
                        key={message.id}
                        msgId={message.id}
                        message={message.message}
                    />
                ))}
            <ForumInput />
        </div>
    );
}
