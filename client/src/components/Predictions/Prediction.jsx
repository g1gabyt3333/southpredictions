import * as React from "react";
import * as app from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from "@mui/material/Typography";
import { Chip, requirePropFactory } from "@mui/material";
import Results from "./Results";
import { Divider } from "@mui/material";

export default function Prediction(props) {
    const padding = { paddingLeft: "5px", paddingRight: "5px" };

    const [user] = useAuthState(app.auth);
    const query = app.db
        .collection("/predictions")
        .doc(props.data.id)
        .collection("/votes")
        .doc(user.uid);
    const [value, error] = useDocumentData(query, { idField: "id" });

    const addVote = (e) => {
        const ref = app.db
            .collection("/predictions")
            .doc(props.data.id)
            .collection("/votes")
            .doc(user.uid);

        ref.set({
            vote: e.target.innerText,
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                props.e(true);
            });
    };

    const handleClick = (e) => {
        console.log(e.target.innerText);
        addVote(e);
    };
    // data.answer === option ? \

    const chipColor = (option) => {
        if (option === props.data.answer) {
            //if answer
            return "success";
        } else if (value && value.vote === option) {
            //your option
            return "primary";
        } else {
            return "default";
        }
    };

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {props.data.dateCreated !== null
                        ? new Date(
                              props.data.dateCreated.seconds * 1000
                          ).toString()
                        : "..."}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.data.prediction}
                    {props.data.isCompleted === true
                        ? " (Completed)"
                        : props.data.isCompleted === "awaiting"
                        ? " (Awaiting results)"
                        : " (Pending)"}
                </Typography>
            </CardContent>
            <CardActions>
                {props.data.options.map((option, index) => (
                    <Chip
                        key={index}
                        variant={props.data.isCompleted ? "outlined" : "filled"}
                        label={option}
                        onClick={props.data.isCompleted ? null : handleClick}
                        color={chipColor(option)}
                        sx={{ ...padding }}
                    />
                ))}
            </CardActions>
            <Divider />
            <Results results={props.data.results} answer={props.data.answer} />
        </Card>
    );
}
