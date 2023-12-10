import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const ChangePasswordForm = ({ formData, handleChange, handleSubmit, loading, error }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.currentPassword ? true : false}
                helperText={error?.currentPassword}
            />
            <TextField
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.newPassword ? true : false}
                helperText={error?.newPassword}
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.confirmPassword ? true : false}
                helperText={error?.confirmPassword}
            />
            {loading ? (
                <LoadingButton
                    loading
                    loadingPosition="start"
                    variant="contained"
                    startIcon={<Save />}
                    sx={{ mt: 2 }}
                >
                    Save
                </LoadingButton>
            ) : (
                <Button sx={{ mt: 2 }} type="submit" variant="contained">
                    Save
                </Button>
            )}
        </Box>
    );
};

export default ChangePasswordForm;