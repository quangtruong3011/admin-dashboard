import { Delete, Edit } from "@mui/icons-material";
import { Box, CardActionArea, CardContent, CardMedia, Grid, ListItemIcon, Menu, MenuItem, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const ProductList = ({ products, handleEdit, handleDelete }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [productId, setProductId] = useState(null);

    const handleClick = (event, productId) => {
        setAnchorEl(event.currentTarget);
        setProductId(productId);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <Grid sx={{ mb: 2 }} container spacing={2}>
                {products.map((product, index) => (
                    <Grid key={index} item xs={3}>
                        <CardActionArea onClick={(event) => handleClick(event, product.productId)}>
                            <CardMedia
                                component="img"
                                src={product.imageUrl}
                                alt={product.name}
                                sx={{ height: 200 }}
                            />
                            <CardContent>
                                <Typography sx={{
                                    textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip",
                                }} gutterBottom variant="h5" component="div">
                                    {product.productName}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography sx={{ color: "red", fontWeight: 600 }} variant="body2" color="text.secondary">
                                        {(product.price - product.price * product?.discount / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 600, textDecoration: "line-through" }} variant="body2">{product.price}</Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                        {productId === product.productId && (
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform: "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                <MenuItem onClick={() => handleEdit(product.productId)}>
                                    <ListItemIcon>
                                        <Edit />
                                    </ListItemIcon>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={() => handleDelete(product.productId)}>
                                    <ListItemIcon>
                                        <Delete />
                                    </ListItemIcon>
                                    Delete
                                </MenuItem>
                            </Menu>
                        )}
                    </Grid>
                ))}
            </Grid >
            {/* <Stack alignItems="center" spacing={2}>
                <Pagination count={10} shape="rounded" />
            </Stack> */}
        </Box>
    );
};

export default ProductList;