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
import * as app from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { UserContext } from "../Providers/UserContext";
const pages = ["Predictions", "Leaderboard", "EightBall", "About"];

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

    handleCloseNavMenu() {
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
                                        to={`/${page.toLowerCase()}`}
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
                                <MenuItem
                                    key={page}
                                    onClick={this.handleCloseNavMenu}
                                    to={`/${page.toLowerCase()}`}
                                    component={Link}
                                    sx={{
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                            <LoginButton
                                signIn={app.signIn}
                                signOut={app.signOut}
                                user={this.props.user}
                                isAdmin={this.props.isAdmin}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}

const LoginButton = (props) => {
    const [loginEl, setLoginEl] = React.useState(null);
    const open = Boolean(loginEl);
    const { userData, changeTheme } = useContext(UserContext);

    const handleClick = (event) => {
        setLoginEl(event.currentTarget);
    };
    const handleClose = (event) => {
        if (event.target.id === "logout") {
            app.signOut();
        }
        setLoginEl(null);
    };

    if (props.user) {
        return (
            <>
                <MenuItem
                    onClick={handleClick}
                    sx={{
                        my: 2,
                        display: "block",
                        borderRadius: "4px",
                    }}
                >
                    <Typography>{props.user.displayName}</Typography>
                </MenuItem>
                <Menu
                    id="basic-menu"
                    anchorEl={loginEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem
                        onClick={handleClose}
                        component={Link}
                        id="profile"
                        to={`/profile/`}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={changeTheme}
                    >
                        Toggle Theme
                    </MenuItem>
                    {userData.admin ? (
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            id="admin"
                            to={`/admin`}
                        >
                            Admin Panel
                        </MenuItem>
                    ) : null}
                    {userData.private ? (
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            id="private"
                            to={`/predictions/private`}
                        >
                            Private Predictions
                        </MenuItem>
                    ) : null}

                    <MenuItem onClick={handleClose} id="logout">
                        Logout
                    </MenuItem>
                </Menu>
            </>
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
