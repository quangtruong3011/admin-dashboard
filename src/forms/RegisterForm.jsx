import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const RegisterForm = ({ formData, handleChange, handleSubmit, loading, error }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.fullName ? true : false}
                helperText={error?.fullName}
                autoComplete="name"
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.email ? true : false}
                helperText={error?.email}
                autoComplete="email"
            />
            <TextField
                name="phoneNumber"
                label="Phone"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.phoneNumber ? true : false}
                helperText={error?.phoneNumber}
                autoComplete="phone"
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
                autoComplete="current-password"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
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
                    Register
                </LoadingButton>
            ) : (
                <Button fullWidth variant="contained" type="submit">
                    Register
                </Button>
            )}
        </Box>
    );
};

export default RegisterForm;