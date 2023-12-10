import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const LoginForm = ({ formData, handleChange, handleSubmit, loading, error }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
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
            {error?.message && (
                <Typography variant="body2" component="p" sx={{ color: "red", textAlign: "center" }}>
                    {error.message}
                </Typography>
            )}
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
                    Login
                </LoadingButton>
            ) : (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
            )}
        </Box>
    );
};

export default LoginForm;