import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const EmployeeForm = ({ formData, handleChange, handleSubmit, loading, error }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.fullName ? true : false}
                helperText={error?.fullName}
                autoComplete="off"
            />
            <FormControl fullWidth error={error?.gender ? true : false}>
                <InputLabel>Gender</InputLabel>
                <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
                <FormHelperText>{error?.gender}</FormHelperText>
            </FormControl>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.username ? true : false}
                helperText={error?.username}
                autoComplete="off"
            />
            <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                fullWidth
                type="password"
                error={error?.password ? true : false}
                helperText={error?.password}
                autoComplete="off"
            />
            {loading ? (
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading
                    loadingPosition="start"
                    startIcon={<Save />}
                >
                    Save
                </LoadingButton>
            ) : (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Save</Button>
            )}
        </Box>
    );
};

export default EmployeeForm;