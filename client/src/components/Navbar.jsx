import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const pages = ["Predictions", "Leaderboard", "Forum"];

export default class navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElNav: null,
        };
        this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
        this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
    }

    handleOpenNavMenu(evt) {
        this.setState({
            anchorElNav: evt.currentTarget,
        });
    }

    handleCloseNavMenu(evt) {
        this.setState({
            anchorElNav: null,
        });
    }
    render() {
        return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            as={Link}
                            variant="h6"
                            noWrap
                            component="a"
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".15rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            South Predictions
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(this.state.anchorElNav)}
                                onClose={this.handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={this.handleCloseNavMenu}
                                        component={Link}
                                        to={page.toLowerCase()}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".1rem",
                                color: "inherit",
                                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                                textDecoration: "none",
                            }}
                        >
                            South Predictions
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={this.handleCloseNavMenu}
                                    to={page.toLowerCase()}
                                    component={Link}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            <LoginButton
                                signIn={this.props.signIn}
                                signOut={this.props.signOut}
                                user={this.props.user}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}

const LoginButton = (props) => {
    if (props.user) {
        return (
            <Button
                onClick={props.signOut}
                sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                }}
            >
                {props.user.displayName}
            </Button>
        );
    }

    return (
        <Button
            onClick={props.signIn}
            sx={{
                my: 2,
                color: "white",
                display: "block",
            }}
        >
            Login
        </Button>
    );
};
