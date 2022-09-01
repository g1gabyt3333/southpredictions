import React, { Component } from "react";
import { TableCell, TableRow } from "@mui/material";

export default class LeaderboardRow extends Component {
    render() {
        return (
            <TableRow
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                }}
            >
                <TableCell component="th" scope="row">
                    {this.props.data.name}
                </TableCell>
                <TableCell align="center">{this.props.data.wins}</TableCell>
                <TableCell align="center">{this.props.data.losses}</TableCell>
            </TableRow>
        );
    }
}
