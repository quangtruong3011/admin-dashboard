import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminService from "../services/adminService";
import { Assessment, AttachMoney, Group, RestaurantMenu } from "@mui/icons-material";

const adminService = new AdminService();

const Totals = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totals, setTotals] = useState([]);
    useEffect(() => {
        const fetchTotals = async () => {
            try {
                setLoading(true);
                const totals = await adminService.getTotals();
                setTotals(totals.data.data);
            } catch (error) {
                setError(error?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTotals();
    }, []);

    const convertRevue = (value) => {
        if (value > 1000) {
            return value / 1000 + "k";
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", }} item xs={3}>
                    <RestaurantMenu sx={{ fontSize: "3rem", mr: 2 }} />
                    <Box>
                        <Typography variant="h3">{totals && totals.menuCount ? totals.menuCount : "0"}</Typography>
                        <Typography variant="body1">Total Menus</Typography>
                    </Box>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item xs={3}>
                    <AttachMoney sx={{ fontSize: "3rem", mr: 2 }} />
                    <Box>
                        <Typography variant="h3">{(totals && totals.totalRevenue ? convertRevue(totals.totalRevenue) : "0").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                        <Typography variant="body1">Total Revenue</Typography>
                    </Box>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} item xs={3}>
                    <Assessment sx={{ fontSize: "3rem", mr: 2 }} />
                    <Box>
                        <Typography variant="h3">{totals && totals.orderCount ? totals.orderCount : "0"}</Typography>
                        <Typography variant="body1">Total Orders</Typography>
                    </Box>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", }} item xs={3}>
                    <Group sx={{ fontSize: "3rem", mr: 2 }} />
                    <Box>
                        <Typography variant="h3">{totals && totals.employeeCount ? totals.employeeCount : "0"}</Typography>
                        <Typography variant="body1">Total Client</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Totals;