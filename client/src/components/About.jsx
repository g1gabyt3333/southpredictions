import React from "react";
import { Container, Typography, Divider } from "@mui/material";

export default function About() {
    return (
        <Container maxWidth="xl">
            <Typography
                variant="h3"
                sx={{ display: "flex", justifySelf: "center" }}
            >
                About
            </Typography>
            <Divider
                sx={{
                    my: "10px",
                }}
            />
        </Container>
    );
}
