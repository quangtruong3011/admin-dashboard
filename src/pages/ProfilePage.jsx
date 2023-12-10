import { Box, Grid, Tab, } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Posts from "../components/Posts";
import ChangePassword from "../components/ChangePassword";
import AboutMe from "../components/AboutMe";
import Profile from "../components/Profile";
import AdminService from "../services/adminService";

const adminService = new AdminService();

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [info, setInfo] = useState({});

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const info = await adminService.getInfo();
                setInfo(info.data.data);
            } catch (error) {
                setError(error.respone.data.message);
            } finally {
                setLoading(false);
            }
        }

        fetchInfo();
    }, []);

    const handleUpateAvatar = () => {

    };

    const handleUpdateCover = () => {

    };

    return (
        <Layout>
            <Profile info={info} />
            <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Posts" value="1" />
                                <Tab label="About me" value="2" />
                                <Tab label="Settings" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Posts />
                        </TabPanel>
                        <TabPanel value="2">
                            <AboutMe info={info} />
                        </TabPanel>
                        <TabPanel value="3">
                            <ChangePassword />
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default ProfilePage;