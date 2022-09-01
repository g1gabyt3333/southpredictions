import React, { Component } from "react";
import * as app from "../firebase";
import LeaderboardRow from "./LeaderboardRow";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Box } from "@mui/system";
import { Alert } from "@mui/material";
import { useEffect } from "react";

// export default class Leaderboard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: true,
//             noLoad: false,
//             data: [],
//         };
//     }

//     componentDidMount() {
//         axios
//             .get("/api/getLeaderboard")
//             .then((res) => res.data)
//             .then((data) => {
//                 if (!data.success) {
//                     this.setState({ noLoad: true, loading: false });
//                 } else {
//                     this.setState({ loading: false, data: data.lb });
//                 }
//             })
//             .catch(e => {
//                 this.setState({ noLoad: true, loading: false });
//             });
//     }

//     render() {
//         if (this.state.loading) {
//             return (
//                 <Box sx={{ display: "flex", justifyContent: "center" }}>
//                     <CircularProgress />
//                 </Box>
//             );
//         }
//         else if(this.state.noLoad) {
//             return (
//                 <Alert severity="error">Could not fetch data. Try again later</Alert>
//             )

//         }
//         return (

//         );
//     }
// }

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADED":
            return {
                ...state,
                loading: false,
                lb: action.payload,
            };
        case "NO_LOAD":
            return {
                ...state,
                error: true,
                loading: false,
            };
    }
};



export default function Leaderboard() {
    let getLeaderboard = app.functions.httpsCallable("getLeaderboard");
    const [state, dispatch] = React.useReducer(reducer, {
        loading: true,
        error: false,
        lb: [],
    });


    

    useEffect(() => {
        getLeaderboard().then((data) => {
            dispatch({ type: "LOADED", payload: data.data });
        }).catch((e) => {
            dispatch({ type: "NO_LOAD" });
        });
    }, []);

    

    if(state.loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }
    if(state.error) {

    }


    return (
        <div>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell align="center">Wins</TableCell>
                                <TableCell align="center">Losses</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.lb.map((row) => (
                                <LeaderboardRow data={row} key={row.name}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}
