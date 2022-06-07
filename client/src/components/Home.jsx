import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";

export default class Home extends Component {
    render() {
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                mt="10vh"
            >
                <Grid item justifyContent="center" xs={4} md={4}>
                    <Typography variant="h4">
                        Welcome to South Predictions!
                    </Typography>
                </Grid>
                <Grid
                    item
                    justifyContent="center"
                    xs={4}
                    md={4}
                    
                >
                    <Grid item xs={2} md={1} mt="10vh">
                        <Button variant="contained">Login/Register</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
