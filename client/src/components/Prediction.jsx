import * as React from "react";
import * as app from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from "@mui/material/Typography";
import { Chip, requirePropFactory } from "@mui/material";
import Results from "./Results";
import { Divider } from "@mui/material";

export default function Prediction({ data, user }) {
    
    const padding = { paddingLeft: "5px", paddingRight: "5px" };

    // const [user, loading, error] = useAuthState(app.auth);
    // const query = app.db.doc(`/predictions/${data.id}/votes/${user.uid}`);
    // const [value, load, e] = useCollectionData(query);
    

    const addVote = (e) => {
        const ref = app.db
            .collection("/predictions")
            .doc(data.id)
            .collection("/votes")
            .doc(user.uid);

        ref.set({
            vote: e.target.innerText,
        });
    };

    const handleClick = (e) => {
        console.log(e.target.innerText);
        addVote(e)
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {data.dateCreated !== null
                        ? new Date(data.dateCreated.seconds * 1000).toString()
                        : "..."}
                </Typography>
                <Typography variant="h5" component="div">
                    {data.prediction}
                    {data.isCompleted ? " (Completed)" : " (Pending)"}
                </Typography>
            </CardContent>
            <CardActions>
                {data.options.map((option, index) => (
                    <Chip
                        key={index}
                        variant={data.isCompleted ? "outlined" : "filled"}
                        label={option}
                        onClick={data.isCompleted ? null : handleClick}
                        color={data.answer === option ? "primary" : "default"}
                        sx={{ ...padding }}
                    />
                ))}
            </CardActions>
            <Divider />
            <Results
                results={data.results}
                answer={data.answer}
            />
        </Card>
    );
}
