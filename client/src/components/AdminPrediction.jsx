import React from "react";
import { Card, CardContent, Typography, CardActions, Chip} from "@mui/material";
import { db } from "../firebase";


export default function AdminPrediction({data}) {
    const padding = { paddingLeft: "5px", paddingRight: "5px" };
    const handleClick = async(e) => {
        
        const ref = db.collection("/predictions").doc(data.id);
        await ref.update({
            answer: e.target.innerText,
            isCompleted: true,
        });


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
                        variant={data.isCompleted ? "outlined" : "filled"}
                        label={option}
                        onClick={data.isCompleted ? null : handleClick}
                        color={"default"}
                        sx={{ ...padding }}
                    />
                ))}
            </CardActions>
        </Card>
    );
}
