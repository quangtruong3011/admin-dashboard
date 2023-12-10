import { Box, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const SelectMenuLists = ({ menus, handleSelectedMenu }) => {
    return (
        <Grid container spacing={2}>
            {menus.map((product, index) => (
                <Grid item xs={3} key={index}>
                    <CardActionArea onClick={() => handleSelectedMenu(product.productId)}>
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
                </Grid>
            ))}
        </Grid>
    );
};

export default SelectMenuLists;