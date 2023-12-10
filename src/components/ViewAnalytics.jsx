import React, { useEffect, useState } from "react";
import AdminService from "../services/adminService";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Layout from "../layout/Layout";
import dayjs from "dayjs";

const adminService = new AdminService();

const ViewAnalytics = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [booking, setBooking] = useState([]);
    const [menus, setMenus] = useState([]);
    const [tables, setTables] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const bookingData = await adminService.getInfoBooking(id);
                setBooking(bookingData.data.data);

                const menusData = await adminService.getAllProducts();
                setMenus(menusData.data.data);

                const tablesData = await adminService.getTables();
                setTables(tablesData.data.data);
            } catch (error) {
                setError(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const calculateTotalValue = () => {
        if (booking.menu) {
            return booking.menu.reduce((accumulator, menuItem) => {
                const { productId, quantity } = menuItem;
                const selectedMenu = menus.find(menu => menu.productId === productId);
                const price = selectedMenu?.price || 0;
                const discount = selectedMenu?.discount || 0;
                const totalPrice = (price - (price * discount / 100)) * quantity;
                return accumulator + totalPrice;
            }, 0);
        }
        return 0;
    };

    return (
        <Layout>
            <Button variant="contained" sx={{ mb: 2 }} component={Link} to="/analytics">Back</Button>
            <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600 }} variant="h5">Info payment</Typography>
                <Box sx={{ mb: 2 }}>
                    <table>
                        <tbody>
                            <tr>
                                <td><Typography variant="body1">Customer name:</Typography></td>
                                <td><Typography variant="body1">{booking.customerName}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant="body1">Phone number:</Typography></td>
                                <td><Typography variant="body1">{booking.phoneNumber}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant="body1">Booking date:</Typography></td>
                                <td><Typography variant="body1">{dayjs(booking.bookingDate).format("DD/MM/YYYY")}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant="body1">Booking time:</Typography></td>
                                <td><Typography variant="body1">{dayjs(booking.bookingTime).format("HH:mm")}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant="body1">Number of people:</Typography></td>
                                <td><Typography variant="body1">{booking.customerNumber} persons</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant="body1">Table:</Typography></td>
                                <td className="flex">
                                    {/* {tables.forEach(table => {
                                        booking.table.map((item, index) => {
                                            if (table.tableId === item) {
                                                return (
                                                    <Typography variant="body1" key={index}>{table.tableName}</Typography>
                                                );
                                            }
                                        })
                                    })} */}
                                    {tables.map((table, index) => {
                                      if (booking.table.includes(table.tableId)) {
                                        return (
                                          <Typography variant="body1" key={index}>{table.tableName}</Typography>
                                        );
                                      }
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
                <table className="w-full mb-8">
                    <thead className="text-left">
                        <tr className="border-b border-slate-900">
                            <th>STT</th>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking.menu?.map((menuItem, index) => (
                            <tr className="border-b border-slate-900" key={index}>
                                <td>{index + 1}</td>
                                <td>{menus.find(menu => menu.productId === menuItem.productId)?.productName}</td>
                                <td>{menuItem.quantity}</td>
                                <td>{menus.find(menu => menu.productId === menuItem.productId)?.price}</td>
                                <td>{menus.find(menu => menu.productId === menuItem.productId)?.discount}</td>
                                <td><Typography>{
                                    (menus.find(menu => menu.productId === menuItem.productId)?.price -
                                        (menus.find(menu => menu.productId === menuItem.productId)?.price *
                                            menus.find(menu => menu.productId === menuItem.productId)?.discount / 100) *
                                        menuItem.quantity).toString()
                                }</Typography></td>
                            </tr>
                        ))}
                        <tr>
                            <td><Typography variant="body1">Total value</Typography></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Typography variant="body1">{calculateTotalValue()}</Typography></td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Layout>
    )
};

export default ViewAnalytics;