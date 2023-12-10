import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Add, Refresh, Search } from "@mui/icons-material";
import OrderForm from "../forms/OrderForm";
import AdminService from "../services/adminService";
import { orderValidationSchema } from "../validations/order.validation";
import * as Yup from "yup"
import FindOrderForm from "../forms/FindOrderForm";
import OrderLists from "../components/lists/OrderLists";

const adminService = new AdminService();

const OrderPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [openFindOrder, setOpenFindOrder] = useState(false);
    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        customerNumber: "",
        menu: [],
        table: [],
    });
    const [orders, setOrders] = useState([]);
    const [tables, setTables] = useState([]);
    const [tableReady, setTableReady] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const orders = await adminService.getAllBookings();
                setOrders(orders.data.data);
                const tables = await adminService.getTables();
                setTables(tables.data.data);
                const tableReady = await adminService.getTablesReady();
                setTableReady(tableReady.data.data);
                const menus = await adminService.getAllProducts();
                setMenus(menus.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setError((prevError) => ({
            ...prevError,
            [name]: null,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await orderValidationSchema.validate(formData, { abortEarly: false });
            const order = await adminService.createBooking(formData);
            setOrders([...orders, order.data.data]);
            setOpen(false);
            setFormData({
                customerName: "",
                phoneNumber: "",
                customerNumber: "",
                menu: [],
                table: [],
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
            } else {
                setError(error?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFindOrder = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await orderValidationSchema.validate(formData, { abortEarly: false });
            const order = await adminService.getBooking(formData);
            setOrders(order.data.data);
            setOpenFindOrder(false);
            setFormData({
                customerName: "",
                phoneNumber: "",
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
            } else {
                setError(error?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        const orders = await adminService.getAllBookings();
        setOrders(orders.data.data);
    };

    const handleDelete = async (id) => {
        await adminService.deleteBooking(id);
        setOrders(orders.filter((order) => order.bookingId !== id));
    };

    const handleCloseOrderForm = () => {
        setOpen(false);
        setFormData({
            customerName: "",
            phoneNumber: "",
            customerNumber: "",
            menu: [],
            table: [],
        });
        setError(null);
    }

    const handleCloseFindOrder = () => {
        setOpenFindOrder(false);
        setFormData({
            customerName: "",
            phoneNumber: "",
        });
        setError(null);
    }

    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                    <Button sx={{ mr: 1 }} variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
                        Add order
                    </Button>
                    <Button sx={{ mr: 1 }} variant="contained" startIcon={<Search />} onClick={() => setOpenFindOrder(true)}>Find Order</Button>
                    <Button variant="contained" onClick={handleRefresh}><Refresh /></Button>
                </Box>
                {/* <TextField
                    placeholder="Search order"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <Search />
                        ),
                    }}
                /> */}
            </Box>
            <OrderLists
                orders={orders}
                setOrders={setOrders}
                tables={tables}
                tableReady={tableReady}
                menus={menus}
                handleDelete={handleDelete}
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
            />
            <Dialog maxWidth="xl" open={open} onClose={handleCloseOrderForm}>
                <DialogTitle>Order Form</DialogTitle>
                <Divider />
                <DialogContent sx={{ width: 1200 }}>
                    <OrderForm
                        formData={formData}
                        setFormData={setFormData}
                        menus={menus}
                        tables={tables}
                        tableReady={tableReady}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
            <Dialog maxWidth="xl" open={openFindOrder} onClose={handleCloseFindOrder}>
                <DialogTitle>Find Order</DialogTitle>
                <Divider />
                <DialogContent sx={{ width: 900 }}>
                    <FindOrderForm
                        formData={formData}
                        handleChange={handleChange}
                        handleFindOrder={handleFindOrder}
                        loading={loading}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export default OrderPage;