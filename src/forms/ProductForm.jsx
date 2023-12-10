import { AttachMoney, Save, Sell } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, ButtonGroup, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const ProductForm = ({ formData, imagePreview, handleChange, handleImageChange, handleCancel, handleSubmit, loading, error, productId }) => {
    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, productId)}>
            <Grid container spacing={4}>
                <Grid item xs={7}>
                    <TextField
                        label="Product Name"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={error?.productName ? true : false}
                        helperText={error?.productName}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={error?.category ? true : false}>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="food">Food</MenuItem>
                                    <MenuItem value="drinks">Drinks</MenuItem>
                                </Select>
                                <FormHelperText>{error?.category}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth error={error?.unit ? true : false}>
                                <InputLabel id="unit">Unit</InputLabel>
                                <Select
                                    label="Unit"
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="pot">Pot</MenuItem>
                                    <MenuItem value="plate">Plate</MenuItem>
                                    <MenuItem value="glass">Glass</MenuItem>
                                </Select>
                                <FormHelperText>{error?.unit}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        margin="normal"
                        fullWidth
                        error={error?.description ? true : false}
                        helperText={error?.description}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><AttachMoney /></InputAdornment>
                                }}
                                error={error?.price ? true : false}
                                helperText={error?.price}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Sell /></InputAdornment>
                                }}
                                error={error?.discount ? true : false}
                                helperText={error?.discount}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                    >
                        <FormControl>
                            <Button component="label">
                                {imagePreview ? (
                                    <img
                                        style={{ width: "450px", height: "400px", objectFit: "cover" }}
                                        src={imagePreview}
                                        alt="img-preview"
                                    />
                                ) : ("Upload image")}
                                <TextField
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    sx={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {error?.image && (
                                <FormHelperText error>{error.image}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <ButtonGroup sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                {loading ? (
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading
                        loadingPosition="start"
                        startIcon={<Save />}
                    >
                        Save
                    </LoadingButton>
                ) : (
                    <Button variant="contained" type="submit">Save</Button>
                )}
            </ButtonGroup>
        </Box >
    );
};

export default ProductForm;