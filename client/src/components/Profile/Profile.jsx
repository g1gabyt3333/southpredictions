import React from "react";
import {
    Grid,
    Card,
    Container,
    CircularProgress,
    Alert,
    Chip,
    CardActionArea,
    Tooltip,
    Snackbar,
} from "@mui/material";
import { UserContext } from "../../Providers/UserContext";
import HeadingGrid from "./HeadingGrid";

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
            {copied ? <CopyNoti copied={copied} setCopied={setCopied} /> : null}
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
                            title="Click to copy profile ID"
                        >
                            <CardActionArea
                                onClick={() => {
                                    navigator.clipboard.writeText(userData.uid);
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
                            color="green"
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <HeadingGrid
                            text={userData.predictions.wins}
                            bottomText="Incorrect"
                            color="red"
                            noBorder
                        />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
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
                setUserData({ ...data.data, uid: userId });
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

const CopyNoti = ({ copied, setCopied }) => {
    return (
        <Snackbar
            open={copied}
            autoHideDuration={6000}
            onClose={() => setCopied(false)}
        >
            <Alert
                severity="success"
                sx={{
                    width: "100%",
                }}
            >
                Copied to clipboard!
            </Alert>
        </Snackbar>
    );
}
