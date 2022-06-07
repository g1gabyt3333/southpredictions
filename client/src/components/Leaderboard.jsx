import React, { Component } from "react";
import axios from "axios";
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

export default class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            noLoad: false,
            data: [],
        };
    }

    componentDidMount() {
        axios
            .get("/api/getLeaderboard")
            .then((res) => res.data)
            .then((data) => {
                if (!data.success) {
                    this.setState({ noLoad: true, loading: false });
                } else {
                    this.setState({ loading: false, data: data.lb });
                }
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            );
        }
        return (
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
                            {this.state.data.map((row) => (
                                <LeaderboardRow data={row} key={row.user} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

