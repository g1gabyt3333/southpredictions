import React, { Component } from "react";
import * as app from "../firebase";
import {
    useCollectionData,
    useDocumentData,
} from "react-firebase-hooks/firestore";
import {Box, Button, TextField, Typography} from "@mui/material";

class ForumPostModule extends Component {
    render() {
        return <div>{this.props.reply}</div>;
    }
}

const FormTitle = (props) => {
    const forumRef = app.db.collection(`/forum`).doc(props.postId);

    // const query = forumRef.where("__name__", "==", props.postId);
    const [values] = useDocumentData(forumRef, {
        //reminder to add loading later
        idField: "id",
    });
    return <h1> {values && values.message}</h1>;
};
export default function ForumPost(props) {
    const forumRef = app.db
        .collection(`/forum`)
        .doc(props.postId)
        .collection("replies");
    const query = forumRef.orderBy("timePosted");
    const [values] = useCollectionData(query, {
        //reminder to add loading later
        idField: "id",
    });

    return (
        <div>
            <FormTitle postId={props.postId} />
            
            {values &&
                values.map((reply) => (
                    <ForumPostModule key={reply.id} reply={reply.message} />
                ))}
                <Typography
                variant="h3"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                }}
            >
                Reply to this post
            </Typography>
            <ForumReply postId={props.postId} />
        </div>
    );
}

const ForumReply = (props) => {
    const [message, setMessage] = React.useState("");

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const forumRef = app.db
            .collection(`/forum`)
            .doc(props.postId)
            .collection("replies");
        const newDoc = await forumRef.add({
            message: message,
            timePosted: app.makeTimestamp(new Date()),
        });
        console.log("Message added to forum ", newDoc.id);
        setMessage("");
    };
    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                display: "flex",
                justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="New Reply"
                    value={message}
                    onChange={handleChange}
                />
            </div>
            <Button variant="contained" type="submit">Submit</Button>
        </Box>
    );
};
