import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";
import * as app from "../firebase";

export default class Home extends Component {



    componentDidMount() {
        document.title = "Home";
    }
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
                <Grid item justifyContent="center" xs={4} md={4}>
                    <Grid item xs={2} md={12} mt="10vh">
                        <HomeMsg
                            signIn={app.signIn}
                            user={this.props.user}
                            creatingUser={this.props.creatingUser}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const HomeMsg = (props) => {
    if(props.creatingUser) {
        return <Typography variant="h6">Creating User...</Typography>
    }
    if (props.user) {
        return <Typography variant="h6">{props.user.displayName}!</Typography>;
    }

    

    return (
        <Button
            onClick={app.signIn}
            variant="contained"
        >
            Login / SignUp
        </Button>
    );
};
