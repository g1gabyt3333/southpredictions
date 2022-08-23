import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import Results from "./Results";
import {Divider} from "@mui/material";

export default function Prediction({ data }) {
    const handleClick = (e) => {
        console.log(e.target.innerText);
    };
    const padding = { paddingLeft: "5px", paddingRight: "5px" };
    
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {data.dateCreated !== null ? (new Date((data.dateCreated.seconds * 1000))).toString() : "..."}
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
                        sx={{...padding}}
                    />
                ))}
            </CardActions>
            <Divider />
            <Results results={data.results} answer={data.answer} />
        </Card>
    );
}
