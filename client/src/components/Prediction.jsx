import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

export default function Prediction({ data }) {
    const handleClick = (e) => {
        console.log("Hello");
    }
    const padding = {paddingLeft: "5px", paddingRight: "5px"};
    console.log(data.options)
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {data.dateCreated.toString()}
                </Typography>
                <Typography variant="h5" component="div">
                    {data.prediction}
                </Typography>
                
                
            </CardContent>
            <CardActions>
                {data.options.map((option, index) => 
                    <Chip label={option} />
                )}
            </CardActions>
        </Card>
    );
}
