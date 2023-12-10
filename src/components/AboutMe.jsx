import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const AboutMe = ({ info }) => {
    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Personal Infomation</Typography>
            <Grid container>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: 500 }} variant="body1" component="p">Full Name:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1" component="p">{info.fullName}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: 500 }} variant="body1" component="p">Email:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1" component="p">{info.email}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{ fontWeight: 500 }} variant="body1" component="p">Phone Number:</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1" component="p">{info.phoneNumber}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutMe;