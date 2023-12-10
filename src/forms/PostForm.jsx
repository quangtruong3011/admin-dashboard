import { Cancel, Image, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const PostForm = ({ formData, handleChange, handleSelectedImage, handleCancelImage, handleSubmit, imagePreview, loading, error }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={error?.title ? true : false}
                helperText={error?.title}
            />
            <TextField
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                margin="normal"
                fullWidth
                multiline
                rows={4}
                error={error?.content ? true : false}
                helperText={error?.content}
            />
            {imagePreview && (
                <Box sx={{ position: "relative" }}>
                    <img
                        style={{ width: "100%", height: "350px", objectFit: "cover" }}
                        src={imagePreview}
                        alt="img-preview"
                    />
                    <Button variant="contained" sx={{ position: "absolute", top: 5, right: 5 }} onClick={handleCancelImage}><Cancel /></Button>
                </Box>
            )}
            <Button sx={{ mr: 1 }} component="label" variant="contained">
                <Image />
                <input type="file" name="image" accept="image/*" onChange={handleSelectedImage} hidden />
            </Button>
            {loading ? (
                <LoadingButton
                    loading
                    loadingPosition="start"
                    variant="contained"
                    startIcon={<Save />}
                >
                    Post
                </LoadingButton>
            ) : (
                <Button type="submit" variant="contained">
                    Post
                </Button>
            )}
        </Box>
    );
};

export default PostForm;