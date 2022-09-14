import React from "react";
import {
    Grid,
    Card,
    Container,
    Typography,
    CircularProgress,
    Box,
    Alert
} from "@mui/material";
import { UserContext } from "../../Providers/UserContext";

import * as app from "../../firebase";
import { useEffect } from "react";

export default function Profile({ userId }) {
    const { userData } = React.useContext(UserContext);

    if (!userId) {
        //load your cached stats from your profile
        return <ProfileLayout userData={userData} />;
    } else {
        return <NProfile userId={userId} />; //fetch stats from user prfoile
    }
}

const ProfileLayout = ({ userData }) => {
    return (
        <Container maxWidth="xl" sx={{ marginTop: "10vh" }}>
            <Grid container>
                <Grid item lg={12} md={8} sm={6} xs={4}>
                    <Card sx={{ textAlign: "center", borderRadius: "20px" }}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item lg={4}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderRight: "2px solid gray",
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        sx={{
                                            alignSelf: "center",
                                            padding: "4rem",
                                        }}
                                    >
                                        {userData.name}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item lg={4}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderRight: "2px solid gray",
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        sx={{
                                            alignSelf: "center",
                                            padding: "4rem",
                                        }}
                                    >
                                        {userData.predictions.wins}
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            sx={{
                                                color: "lightgreen",
                                                display: "block",
                                            }}
                                        >
                                            Correct
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item lg={4}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        sx={{
                                            alignSelf: "center",
                                            padding: "4rem",
                                        }}
                                    >
                                        {userData.predictions.losses}
                                        <Typography
                                            variant="h6"
                                            component="span"
                                            sx={{
                                                color: "salmon",
                                                display: "block",
                                            }}
                                        >
                                            Wrong
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

//not current user profile
const NProfile = ({ userId }) => {
    const [userData, setUserData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    const getUser = app.functions.httpsCallable("getUser");

    useEffect(() => {
        getUser({ userId: userId })
            .then((data) => {
                setUserData(data.data);
                setLoading(false);
            })
            .catch((e) => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return (
            <Alert severity="error">User not found</Alert>
        );
    }
    return <ProfileLayout userData={userData} />;
};
