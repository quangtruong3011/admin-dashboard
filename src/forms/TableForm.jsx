import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const TableForm = ({ formData, handleChange, handleSubmit, loading, error, tableId }) => {
    return (
        <Box component="form" onSubmit={(event) => handleSubmit(event, tableId)}>
            <TextField
                label="Table Name"
                name="tableName"
                value={formData.tableName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(error?.tableName)}
                helperText={error?.tableName}
            />
            <TextField
                label="Capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(error?.capacity)}
                helperText={error?.capacity}
            />
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
                <Button type="submit" variant="contained">
                    Save
                </Button>
            )}
        </Box>
    );
};

export default TableForm;