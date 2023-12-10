import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const Payment = ({ booking, menus, tables, handlePay, bookingId }) => {
    const totalValue = booking.menu.reduce((accumulator, menuItem) => {
        const { productId, quantity } = menuItem;
        const price = menus.find(menu => menu.productId === productId)?.price;
        const totalPrice = price * quantity;
        return accumulator + totalPrice;
    }, 0);
    return (
        <Box>
            <TableContainer>
                <Table sx={{
                    width: 400,
                    'td:nth-of-type(1)': {
                        width: 150
                    },
                    'td:nth-of-type(2)': {
                        width: 200
                    }
                }}>
                    <TableBody>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>{booking.customerName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>{booking.phoneNumber}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Booking Date</TableCell>
                            <TableCell>{dayjs(booking.bookingDate).format("DD/MM/YYYY")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Booking Time</TableCell>
                            <TableCell>{dayjs(booking.bookingTime).format("HH:mm")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Number of People</TableCell>
                            <TableCell>{booking.customerNumber} persons</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booking.menu.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{menus.map((product) => product.productId === item.productId && product.productName)}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>
                                    {menus.map((product) => product.productId === item.productId && product.price)}
                                </TableCell>
                                <TableCell>{menus.map((product) => product.productId === item.productId && product.discount)}%</TableCell>
                                <TableCell>
                                    <Typography variant="body1" component="p">
                                        {menus.map((product) => product.productId === item.productId && (product.price - product.price * product.discount / 100) * item.quantity)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography variant="h6" fontWeight={600}>Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body1" component="p">
                                    {totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => handlePay(bookingId, { total: totalValue })}>
                Payment
            </Button>
        </Box>
    );
};

export default Payment;