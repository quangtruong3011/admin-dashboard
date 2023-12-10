import { Analytics, Checklist, ExpandLess, ExpandMore, Group, Home, Logout, MenuBook, Person, Person2, Settings, Storefront, TableBar } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Collapse, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const drawerWidth = 240;

const Layout = ({ children }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openSetting, setOpenSetting] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenSetting = () => {
        setOpenSetting(!openSetting);
    };

    const { handleLogout } = useContext(AuthContext);

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        id="account-button"
                        aria-controls="account-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <Avatar
                            src="https://source.unsplash.com/random"
                        />
                    </Button>
                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/profile">
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/" onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/order">
                            <ListItemIcon>
                                <Checklist />
                            </ListItemIcon>
                            <ListItemText primary="Order" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/product">
                            <ListItemIcon>
                                <MenuBook />
                            </ListItemIcon>
                            <ListItemText primary="Product" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/table">
                            <ListItemIcon>
                                <TableBar />
                            </ListItemIcon>
                            <ListItemText primary="Table" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/employee">
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Employee" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/analytics">
                            <ListItemIcon>
                                <Analytics />
                            </ListItemIcon>
                            <ListItemText primary="Analytics" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleOpenSetting}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary="Setting" />
                            {openSetting ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse
                        in={openSetting}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ pl: 4 }} component={Link} to="/restaurant">
                                    <ListItemIcon>
                                        <Storefront />
                                    </ListItemIcon>
                                    <ListItemText primary="Restaurant" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;