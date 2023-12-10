import { Image, MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardHeader, CardMedia, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";

const Profile = ({ info, handleUpdateAvatar, handleUpdateCover }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardMedia
                component="img"
                sx={{ height: 250 }}
                src={info.coverPhoto || "https://source.unsplash.com/random"}
            />
            <CardHeader
                avatar={
                    <Avatar
                        alt="John Doe"
                        src={info.avatar || "https://source.unsplash.com/random"}
                        sx={{ width: 100, height: 100, mt: -7 }}
                    />
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                }
                title={<Typography variant="h5" component="h1">{info.fullName}</Typography>}
                subheader={info.email}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Image />
                    </ListItemIcon>
                    Change Avatar
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Image />
                    </ListItemIcon>
                    Change Cover
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default Profile;