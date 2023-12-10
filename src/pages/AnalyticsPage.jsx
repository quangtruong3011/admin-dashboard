import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AdminService from "../services/adminService";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import dayjs from "dayjs";

const adminService = new AdminService();

const AnalyticsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const bookings = await adminService.getAllBookings();
                const bookingsWithId = bookings.data.data.map((booking) => ({
                    ...booking,
                    id: booking.bookingId,
                    bookingDate: dayjs(booking.bookingDate).format("DD/MM/YYYY"),
                    bookingTime: dayjs(booking.bookingTime).format("HH:mm"),
                }));
                setBookings(bookingsWithId);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "customerName", headerName: "Name", width: 170 },
        { field: "phoneNumber", headerName: "Phone Number", width: 130 },
        { field: "bookingDate", headerName: "Booking Date", width: 130 },
        { field: "bookingTime", headerName: "Booking Time", width: 130 },
        {
            field: "actions"
            , headerName: "Actions"
            , sortable: false
            , width: 250
            , renderCell: (params) => (
                <ButtonGroup fullWidth>
                    <Button component={Link} to={`/analytics/${params.row.id}`}>View</Button>
                </ButtonGroup>
            )
        }
    ];

    return (
        <Layout>
            <DataGrid
                rows={bookings}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                autoHeight
            />
        </Layout>
    )
}

export default AnalyticsPage;