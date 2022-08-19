import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

export default function Prediction(props) {
    const handleClick = (e) => {
        console.log("Hello");
    }
    const padding = {paddingLeft: "5px", paddingRight: "5px"};

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                >
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    real rx
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Chip label="Hello" onClick={handleClick} sx={{...padding}}/>
            </CardActions>
        </Card>
    );
}
