import { Add, Delete, Info, MoreVert } from "@mui/icons-material";
import { Masonry } from "@mui/lab";
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectTableLists from "../select/SelectTableLists";
import AdminService from "../../services/adminService";
import SideBarMenu from "../SideBarMenu";
import moment from "moment/moment";
import dayjs from "dayjs";

const adminService = new AdminService();

const OrderLists = ({ orders, setOrders, tables, tableReady, menus, formData, setFormData, handleDelete, loading, setLoading, error, setError }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openInfo, setOpenInfo] = useState(false);
    const [openSelectedTable, setOpenSelectedTable] = useState(false);
    const [selectedTable, setSelectedTable] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrder(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectedTable = (id) => {
        if (!selectedTable.includes(id)) {
            setSelectedTable([...selectedTable, id]);
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            table: [
                ...prevFormData.table,
                id
            ]
        }));
    };

    const handleDeleteTable = (id) => {
        const updatedTable = selectedTable.filter((tableId) => tableId !== id);
        setSelectedTable(updatedTable);
        setFormData((prevFormData) => ({
            ...prevFormData,
            table: [
                ...prevFormData.table.filter((table) => table.tableId !== id),
            ]
        }));
    };

    const handleUpdate = async (id) => {
        try {
            setLoading(true);
            await adminService.updateTableForBooking(id, selectedTable);
            setOpenInfo(false);
            orders.map((order) => {
                if (order.bookingId === id) {
                    order.table = selectedTable;
                }
                return order;
            });
            setSelectedTable([]);
            setFormData({
                customerName: "",
                phoneNumber: "",
                customerNumber: "",
                menu: [],
                table: [],
            });
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async (id) => {
        try {
            await adminService.checkInBooking(id);
            orders.map((order) => {
                if (order.bookingId === id) {
                    order.checkIn = true;
                }
                return order;
            });
            setOpenInfo(false);
            setAnchorEl(null);
        } catch (error) {
            setError(error?.response?.data?.message);
        }
    };

    const handleOrder = async (id) => {
        try {
            setLoading(true);
            const response = await adminService.updateMenuForBooking(id, formData.menu);
            orders.map((order) => {
                if (order.bookingId === id) {
                    order.menu = response.data.data;
                }
                return order;
            });
            setSelectedMenu([]);
            setFormData({
                customerName: "",
                phoneNumber: "",
                customerNumber: "",
                menu: [],
                table: [],
            });
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePay = async (id, data) => {
        try {
            setLoading(true);
            await adminService.payBooking(id, data);
            orders.map((order) => {
                if (order.bookingId === id) {
                    order.active = false;
                }
                return order;
            });
            setOpenDrawer(false);
            setAnchorEl(null);
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInfo = (bookingId) => {
        setOpenInfo(true);
        if (bookingId) {
            setSelectedTable(orders.find(order => order.bookingId === bookingId)?.table);
        }
    };

    return (
        <Masonry columns={4} spacing={2}>
            {orders.map((order, index) => (
                order.active &&
                <Card key={index}>
                    <CardHeader
                        title={<Typography variant="h5">{tables.map(table => order.table.map(tableId => table.tableId === tableId ? table.tableName : null))}</Typography>}
                        subheader={`${dayjs(order.bookingDate).format("DD/MM/YYYY")} ${dayjs(order.bookingTime).format("HH:mm")}`}
                        action={
                            <IconButton aria-label="settings" onClick={(event) => handleClick(event, order.bookingId)}>
                                <MoreVert />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        {menus.map(menu => order.menu.map((item, index) => item.productId === menu.productId && (
                            <Typography variant="body1" component="p" style={{ display: "flex", justifyContent: "space-between" }} key={index}>{menu.productName} <span>x{item.quantity}</span></Typography>
                        )))}
                    </CardContent>
                    {selectedOrder === order.bookingId && (
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {order.checkIn ? (
                                <Box>
                                    <MenuItem onClick={() => { setOpenDrawer(!openDrawer); setAnchorEl(null); }}>
                                        <ListItemIcon>
                                            <Add />
                                        </ListItemIcon>
                                        Order
                                    </MenuItem>

                                </Box>
                            ) : (
                                <Box>
                                    <MenuItem onClick={() => handleOpenInfo(order.bookingId)}>
                                        <ListItemIcon>
                                            <Info />
                                        </ListItemIcon>
                                        Info
                                    </MenuItem>
                                    <Dialog maxWidth="xl" open={openInfo} onClose={() => setOpenInfo(!openInfo)}>
                                        <DialogTitle>Info Order</DialogTitle>
                                        <Divider />
                                        <DialogContent sx={{ width: 1200 }}>
                                            <TableContainer>
                                                <Table sx={{
                                                    'td:nth-child(1)': {
                                                        width: 150
                                                    }
                                                }}>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>Full Name</TableCell>
                                                            <TableCell>{order.customerName}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Phone Number</TableCell>
                                                            <TableCell>{order.phoneNumber}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Booking Date</TableCell>
                                                            <TableCell>{dayjs(order.bookingDate).format("DD/MM/YYYY")}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Booking Time</TableCell>
                                                            <TableCell>{dayjs(order.bookingTime).format("HH:mm")}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Number of People</TableCell>
                                                            <TableCell>{order.customerNumber} persons</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Table</TableCell>
                                                            <TableCell>
                                                                <Box sx={{ display: "flex" }}>
                                                                    <Button variant="contained" sx={{ mr: 1 }} size="small" startIcon={<Add />} onClick={() => setOpenSelectedTable(!openSelectedTable)}>Add table</Button>
                                                                    <Dialog maxWidth="xl" open={openSelectedTable} onClose={() => setOpenSelectedTable(!openSelectedTable)}>
                                                                        <DialogTitle>Select Table</DialogTitle>
                                                                        <Divider />
                                                                        <DialogContent sx={{ width: 900 }}>
                                                                            <SelectTableLists
                                                                                tables={tables}
                                                                                handleSeclectedTable={handleSelectedTable}
                                                                            />
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    <Stack direction="row" spacing={1}>
                                                                        {selectedTable.map((tableId, index) => (
                                                                            <Chip key={index} label={tables.map(table => table.tableId === tableId ? table.tableName : null)} onDelete={() => handleDeleteTable(tableId)}></Chip>
                                                                        ))}
                                                                    </Stack>
                                                                </Box>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <ButtonGroup>
                                                {order.table.length &&
                                                    moment().isAfter(moment(order.bookingDate).format("YYYY-MM-DD") + "T" + moment(order.bookingTime).format("HH:mm:ss"))
                                                    && (

                                                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => handleCheckIn(order.bookingId)}>Check In</Button>
                                                    )}
                                                <Button sx={{ mt: 2 }} variant="contained" onClick={() => handleUpdate(order.bookingId)}>Save</Button>
                                            </ButtonGroup>
                                        </DialogContent>
                                    </Dialog>
                                    <MenuItem onClick={() => handleDelete(order.bookingId)}>
                                        <ListItemIcon>
                                            <Delete />
                                        </ListItemIcon>
                                        Delete
                                    </MenuItem>
                                </Box>
                            )}
                        </Menu>
                    )}
                    {selectedOrder === order.bookingId && (
                        <SideBarMenu
                            openDrawer={openDrawer}
                            setOpenDrawer={setOpenDrawer}
                            menus={menus}
                            booking={order}
                            tables={tables}
                            formData={formData}
                            setFormData={setFormData}
                            selectedMenu={selectedMenu}
                            setSelectedMenu={setSelectedMenu}
                            handleOrder={handleOrder}
                            handlePay={handlePay}
                            bookingId={order.bookingId}
                        />
                    )}
                </Card >
            ))
            }
        </Masonry >
    );
};

export default OrderLists;