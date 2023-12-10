import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <Container>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h1" component="h1" sx={{ fontWeight: 600 }}>404</Typography>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>The page you were looking for is not found!</Typography>
                <Typography variant="body1" component="p" sx={{ fontWeight: 600 }}>You may have mistyped the address or the page may have moved.</Typography>
                <Button variant="contained" sx={{ mt: 3, mb: 2 }} component={Link} to="/">Back to Home</Button>
            </Box>
        </Container>
    );
};

export default PageNotFound;