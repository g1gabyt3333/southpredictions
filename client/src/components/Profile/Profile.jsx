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
    CardActionArea,
    Tooltip,
    Snackbar
} from "@mui/material";
import { UserContext } from "../../Providers/UserContext";

import * as app from "../../firebase";
import { useEffect, useContext } from "react";

export default function Profile({ userId }) {
    const { userData } = useContext(UserContext);

    if (!userId) {
        //load your cached stats from your profile
        return <ProfileLayout userData={userData} />;
    } else {
        return <NProfile userId={userId} />; //fetch stats from user prfoile
    }
}

const ProfileLayout = ({ userData }) => {
    const [copied, setCopied] = React.useState(false);

    return (
        <>
            <Container maxWidth="xl" sx={{ marginTop: "10vh" }}>
                <Grid container>
                    <ProfileHeader userData={userData} setCopied={setCopied} />
                </Grid>
            </Container>
            {
                copied ?
                    <Snackbar
                        open={copied}
                        autoHideDuration={6000}
                        onClose={() => setCopied(false)}

                    >
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Copied to clipboard!
                        </Alert>
                    </Snackbar>
                    : null
            }
        </>
    );
};

const ProfileHeader = ({ userData, setCopied }) => {
    return (
        <Grid item sm={12}>
            <Card sx={{ textAlign: "center", borderRadius: "20px" }}>
                <Grid container direction="row" alignItems="center">
                    <Grid item md={4} xs={12}>
                        <Tooltip
                            placement="top"
                            title="Click to copy profile id"
                        >
                            <CardActionArea
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        userData.uid
                                    );
                                    setCopied(true);
                                }}
                            >
                                <HeadingGrid text={userData.name} color="white">
                                    {userData.admin ? (
                                        <Chip
                                            label="Admin"
                                            color="error"
                                            sx={{ alignSelf: "center" }}
                                        />
                                    ) : null}
                                </HeadingGrid>
                            </CardActionArea>
                        </Tooltip>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <HeadingGrid
                            text={userData.predictions.wins}
                            bottomText="Correct"
                            color="lightgreen"
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
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
                borderRight: {
                    xs: "none",
                    md: noBorder ? "none" : "1px solid #e0e0e0",
                },
                borderBottom: {
                    md: "none",
                    xs: noBorder ? "none" : "1px solid #e0e0e0",
                },
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
                setUserData({...data.data, uid: userId});
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
