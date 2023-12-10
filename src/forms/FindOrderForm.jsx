import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const FindOrderForm = ({ formData, handleChange, handleFindOrder, loading, error }) => {
    return (
        <Box component="form" onSubmit={handleFindOrder}>
            <TextField
                label="Full Name"
                name="customerName"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.customerName}
                onChange={handleChange}
                error={error?.customerName ? true : false}
                helperText={error?.customerName}
            />
            <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={error?.phoneNumber ? true : false}
                helperText={error?.phoneNumber}
            />
            {loading ? (
                <LoadingButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading
                    loadingPosition="start"
                >
                    Find
                </LoadingButton>
            ) : (
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Find
                </Button>
            )}
        </Box>
    );
};

export default FindOrderForm;