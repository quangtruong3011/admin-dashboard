import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostForm from "../forms/PostForm";
import PostList from "../components/lists/PostLists";
import { Image } from "@mui/icons-material";
import AdminService from "../services/adminService";

const adminService = new AdminService();

const Posts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [posts, setPosts] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await adminService.getAllPosts();
                setPosts(posts.data.data);
            } catch (error) {
                setError(error.respone.data.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setError((prevState) => ({
            ...prevState,
            [name]: null,
        }));
    };

    const handleSelectedImage = (event) => {
        const imageFile = event.target.files[0];
        setImage(imageFile);
        setImagePreview(URL.createObjectURL(imageFile));
    };

    const handleCancelImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("content", formData.content);
            formDataToSend.append("image", image);
            const respone = await adminService.createPost(formDataToSend);
            setOpen(false);
            setFormData({
                title: "",
                content: "",
            });
            setImage(null);
            setImagePreview(null);
            setPosts([...posts, respone.data.data]);
        } catch (error) {
            setError(error.respone.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await adminService.deletePost(id);
            setPosts(posts.filter((post) => post.postId !== id));
        } catch (error) {
            setError(error.respone.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <TextField
                placeholder="Please type what you want...."
                fullWidth
                multiline
                rows={2}
                onClick={handleClickOpen}
            />
            <Button variant="contained" sx={{ mt: 1, mr: 1 }} onClick={handleClickOpen}><Image /></Button>
            <Button variant="contained" sx={{ mt: 1 }} onClick={handleClickOpen}>Post</Button>
            <Dialog maxWidth="xl" open={open} onClose={handleClose}>
                <DialogTitle>Post</DialogTitle>
                <Divider />
                <DialogContent sx={{ width: 1200 }}>
                    <PostForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSelectedImage={handleSelectedImage}
                        handleCancelImage={handleCancelImage}
                        imagePreview={imagePreview}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
            <PostList
                posts={posts}
                handleDelete={handleDelete}
                loading={loading}
                error={error}
            />
        </Box>
    );
};

export default Posts;