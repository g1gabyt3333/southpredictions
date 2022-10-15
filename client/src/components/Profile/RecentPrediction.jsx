import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    CardActions,
    Tooltip,
} from "@mui/material";

export default function RecentPrediction({ data, user }) {
    const date = user ? data.date.toDate() : new Date(data.date._seconds * 1000 + data.date._nanoseconds / 1000000);

    return (
        <Grid item xs={12}>
            <Tooltip title={date.toString()} placement="top">
                <Card
                    sx={{
                        minWidth: 275,
                        marginBottom: "15px",
                        borderRadius: "20px",
                        border: "solid 3px",
                        borderColor: data.isCorrect ? "green.reg" : "red.reg",
                    }}
                >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {data.prediction}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Chip
                            variant="filled"
                            label={data.vote}
                            color={data.isCorrect ? "success" : "error"}
                            sx={{ paddingLeft: "5px", paddingRight: "5px" }}
                        />
                    </CardActions>
                </Card>
            </Tooltip>
        </Grid>
    );
}
