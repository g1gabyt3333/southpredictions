import React from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";

export default function EightBall() {
    return <EightBallMain />;
}

const EightBallMain = () => {
    const [chance, setChance] = React.useState(-1);
    const [input, setInput] = React.useState("");

    const roll = () => {};

    return (
        <Container>
            <Typography
                variant="h4"
                component="h6"
                sx={{ textAlign: "center", my: "20px" }}
            >
                Try again...
            </Typography>

            <Grid container>
                <Grid item md={4}></Grid>

                <Grid item sm={12} md={4} sx={{display: "flex", justifyContent: "center"}}>
                    <TextField
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </Grid>

                <Grid item md={4}></Grid>
            </Grid>
        </Container>
    );
};
