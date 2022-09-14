import React from "react";
import {
    Grid,
    Card,
    Container,
    Typography,
    CircularProgress,
    Box,
    Alert,
    Chip,
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
                                <HeadingGrid text={userData.name} color="white">
                                    {userData.admin ? (
                                        <Chip
                                            label="Admin"
                                            color="error"
                                            sx={{ alignSelf: "center" }}
                                        />
                                    ) : null}
                                </HeadingGrid>
                            </Grid>
                            <Grid item lg={4}>
                                <HeadingGrid
                                    text={userData.predictions.wins}
                                    bottomText="Correct"
                                    color="lightgreen"
                                />
                            </Grid>
                            <Grid item lg={4}>
                                <HeadingGrid
                                    text={userData.predictions.wins}
                                    bottomText="Incorrect"
                                    color="salmon"
                                    noBorder
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const HeadingGrid = ({ text, bottomText, color, children, noBorder }) => {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "200px",
                maxHeight: "200px",
                alignSelf: "center",
                justifyContent: "center",
                borderRight: noBorder ? "none" : "1px solid #e0e0e0",
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    alignSelf: "center",
                    padding: "1rem",
                }}
            >
                {text}

                <Typography
                    variant="h6"
                    component="span"
                    sx={{
                        color: color,
                        display: "block",
                    }}
                >
                    {bottomText}
                </Typography>
            </Typography>
            {children}
        </Box>
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
        return <Alert severity="error">User not found</Alert>;
    }
    return <ProfileLayout userData={userData} />;
};
