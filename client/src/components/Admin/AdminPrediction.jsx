import React from "react";
import { Card, CardContent, Typography, CardActions, Chip} from "@mui/material";
import { db } from "../../firebase";



export default function AdminPrediction({data, type}) {
    const padding = { paddingLeft: "5px", paddingRight: "5px" };
    const path = type === "private" ? "privatePredictions" : "predictions";
    const setVote = async(e) => {
        
        const ref = db.collection(path).doc(data.id);
        await ref.update({
            answer: e.target.innerText,
            isCompleted: true,
        });


    }

    const changeState = async(e) => {
        const ref = db.collection(path).doc(data.id);
        if(data.isCompleted === "awaiting") {
            await ref.update({isCompleted: false})
        }
        else if(data.isCompleted === false) {
            await ref.update({isCompleted: "awaiting"})
        }
        else {
            console.log("error")
        }
    }

    const removePrediction = async(e) => {
        const ref = db.collection(path).doc(data.id);
        await ref.delete();
    }

    return (
        <Card sx={{ minWidth: 275, marginBottom: "15px" }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {data.prediction}
                    {data.isCompleted === "awaiting" ? " (Awaiting results)" : " (Pending)"}
                </Typography>
            </CardContent>
            <CardActions>
                {data.options.map((option, index) => (
                    <Chip
                        key={index}
                        variant={data.isCompleted === true ? "outlined" : "filled"}
                        label={option}
                        onClick={data.isCompleted === true ? null : setVote}
                        color={"default"}
                        sx={{ ...padding }}
                    />
                ))}
                <Chip 
                    variant="filled"
                    label="Toggle State"
                    onClick={changeState}
                    color={"default"}
                    sx={{ ...padding }}
                />
                <Chip 
                    variant="filled"
                    label="Remove"
                    onClick={removePrediction}
                    color={"default"}
                    sx={{ ...padding }}
                />
            </CardActions>
        </Card>
    );
}
