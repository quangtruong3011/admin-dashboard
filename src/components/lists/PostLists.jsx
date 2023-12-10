import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const PostList = ({ posts, handleDelete, loading, error }) => {
    return (
        <Box>
            {posts.map((post, index) => (
                <Card key={index} sx={{ my: 2 }}>
                    <CardMedia
                        component="img"
                        sx={{ height: 250 }}
                        src={post.imageUrl}
                    />
                    <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{post.title}</Typography>
                        <Typography variant="body1">{post.content}</Typography>
                    </CardContent>
                    <CardActions>
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
                            <Button variant="contained" startIcon={<Delete />} onClick={() => handleDelete(post.postId)}>Delete</Button>
                        )}
                </CardActions>
                </Card>
    ))
}
        </Box >
    );
};

export default PostList;