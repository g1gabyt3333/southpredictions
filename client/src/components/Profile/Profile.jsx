import React from "react";
import { Grid, Card, Container } from "@mui/material";
import { UserContext } from "../../Providers/UserContext";

export default function Profile({userId}) {
    const {userData} = React.useContext(UserContext);
    console.log(userData)
    console.log(userId)

    if (!userId) {
        return (
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item lg={12}>
                        <Card>
                            {Object.values(userData).map((value) => {
                                return (
                                    <p>
                                        {value.toString()}
                                    </p>
                                )}
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    else { 

        return <NProfile userId={userId}/>
    }



    
}


//not current user profile
const NProfile = ({userId}) => {
    return (
        <div>{userId}</div>
    )
}
