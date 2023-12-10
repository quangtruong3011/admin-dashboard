import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, ButtonGroup, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import VietnamProvinces from "../mockupData/VietNamProvinces.json";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const RestaurantForm = ({ formData, setFormData, image, imagePreview, handleChange, handleImageChange, handleSubmit, loading, error, setError }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <TextField
                        label="Restaurant Name"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={error?.restaurantName ? true : false}
                        helperText={error?.restaurantName}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={error?.province ? true : false}>
                                <InputLabel id="province">Province</InputLabel>
                                <Select
                                    label="province"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {VietnamProvinces.map((province, index) => (
                                        <MenuItem key={index} value={province.code}>
                                            {province.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{error?.province}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={error?.district ? true : false}>
                                <InputLabel id="district">District</InputLabel>
                                <Select
                                    label="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {VietnamProvinces.map((province) => (
                                        formData.province === province.code &&
                                        province.districts.map((district) => (
                                            <MenuItem key={district.code} value={district.code}>
                                                {district.name}
                                            </MenuItem>
                                        ))
                                    ))}
                                </Select>
                                <FormHelperText>{error?.district}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth error={error?.ward ? true : false}>
                                <InputLabel id="commune">Ward</InputLabel>
                                <Select
                                    label="Ward"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {VietnamProvinces.map((province) => (
                                        formData.province === province.code &&
                                        province.districts.map((district) => (
                                            formData.district === district.code &&
                                            district.wards.map((ward) => (
                                                <MenuItem key={ward.code} value={ward.code}>
                                                    {ward.name}
                                                </MenuItem>
                                            ))
                                        ))
                                    ))}
                                </Select>
                                <FormHelperText>{error?.ward}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        error={error?.address ? true : false}
                        helperText={error?.address}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker"]}>
                                    <TimePicker
                                        label="Open time"
                                        name="openTime"
                                        value={formData.openTime}
                                        onChange={(newValue) => {
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                openTime: newValue,
                                            }));
                                            setError((prevState) => ({
                                                ...prevState,
                                                openTime: null,
                                            }));
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: error?.openTime ? true : false,
                                                helperText: error?.openTime,
                                            },
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker"]}>
                                    <TimePicker
                                        label="Close time"
                                        name="closeTime"
                                        value={formData.closeTime}
                                        onChange={(newValue) => {
                                            setFormData((prevState) => ({
                                                ...prevState,
                                                closeTime: newValue,
                                            }));
                                            setError((prevState) => ({
                                                ...prevState,
                                                closeTime: null,
                                            }));
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                error: error?.closeTime ? true : false,
                                                helperText: error?.closeTime,
                                            },
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "center", alignItems: "center" }} item xs={5}>
                    <FormControl error={error?.image ? true : false}>
                        <Button component="label">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                />
                            ) : (
                                "Upload image"
                            )}
                            <input src={image} type="file" name="image" accept="image/*" hidden onChange={handleImageChange} />
                        </Button>
                        <FormHelperText>{error?.image}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={7}
                fullWidth
                error={error?.description ? true : false}
                helperText={error?.description}
            />
            <ButtonGroup>
                {/* <Button variant="contained" onClick={handleCancel}>Cancel</Button> */}
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
                    <Button type="submit" variant="contained" >
                        Save
                    </Button>
                )}
            </ButtonGroup>
        </Box >
    );
};

export default RestaurantForm;