import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as app from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import {
    ListItemButton,
    ListItemText,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Box,
    Button,
    Container,
    Typography,
    CircularProgress,
} from "@mui/material";
import { serverTimestamp } from "firebase/firestore";

class Forum extends Component {
    render() {
        return (
            <>
                {/* <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "white",
                    }}
                    component={Link}
                    
                >
                    {this.props.message}
                </Typography> */}
                <ListItemButton
                    component={Link}
                    to={`/forum/${this.props.msgId}`}
                    href="#simple-list"
                >
                    <ListItemText primary={this.props.message} />
                </ListItemButton>
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

        if (message === "") {
            return;
        }

        const newDoc = await forumRef.add({
            message: message,
            timePosted: serverTimestamp(),
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
                    label="New Post"
                    value={message}
                    onChange={handleChange}
                />
            </div>
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </Box>
    );
};

const ChangeQueryInput = (props) => {
    const handleChange = (e) => {
        props.setQueryLimit(e.target.value);
    };

    return (
        <FormControl size="medium" sx={{ marginLeft: "15px" }}>
            <InputLabel id="demo-simple-select-label">Posts</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.queryLimit}
                label="Post Limit"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={50}>Fifty</MenuItem>
            </Select>
        </FormControl>
    );
};

export default function ForumPost() {
    const forumRef = app.db.collection("forum");
    const [queryLimit, setQueryLimit] = React.useState(10);
    const query = forumRef.orderBy("timePosted", "desc").limit(queryLimit);

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
        <Container maxWidth="xl">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h3" sx={{ justifyContent: "center" }}>
                    Latest Posts
                </Typography>
                <ChangeQueryInput
                    queryLimit={queryLimit}
                    setQueryLimit={setQueryLimit}
                />
            </div>

            {values &&
                values.map((message) => (
                    <Forum
                        key={message.id}
                        msgId={message.id}
                        message={message.message}
                    />
                ))}
            <Typography
                variant="h3"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                }}
            >
                Add a new Post
            </Typography>
            <ForumInput />
        </Container>
    );
}
