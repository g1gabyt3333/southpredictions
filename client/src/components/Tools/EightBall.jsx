import React from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";

export default function EightBall() {
    return <EightBallMain />;
}

const EightBallMain = () => {
    const [chance, setChance] = React.useState(0);
    const [input, setInput] = React.useState("");

    const roll = () => {
        setChance(Math.floor(Math.random() * 20));
    };

    return (
        <Container>
            <Message num={chance} />
            <Grid container>
                <Grid item md={4}></Grid>

                <Grid
                    item
                    sm={12}
                    md={4}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <TextField
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ marginLeft: "10px" }}
                        onClick={roll}
                    >
                        Roll
                    </Button>
                </Grid>

                <Grid item md={4}></Grid>
            </Grid>
        </Container>
    );
};

const Message = ({ num }) => {
    const messages = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definitely.",
        "You may rely on it",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
    ];

    return (
        <Typography
            variant="h4"
            component="h6"
            sx={{ textAlign: "center", my: "20px" }}
        >
            {messages[num]}
        </Typography>
    );
};
