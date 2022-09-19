import React, { Component } from "react";
import { TableCell, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

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
                    <Link
                        component={NavLink}
                        to={`/profile/${this.props.data.id}`}
                        color="inherit"
                        sx={{ textDecoration: "none" }}
                    >
                        {this.props.data.name}
                    </Link>
                </TableCell>

                <TableCell align="center">{this.props.data.wins}</TableCell>
                <TableCell align="center">{this.props.data.losses}</TableCell>
            </TableRow>
        );
    }
}
