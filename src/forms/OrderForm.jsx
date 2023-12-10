import { Add, Delete, Remove, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, ButtonGroup, Chip, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectTableLists from "../components/select/SelectTableLists";
import SelectMenuLists from "../components/select/SelectMenuLists";

const OrderForm = ({ formData, setFormData, tables, tableReady, menus, handleChange, handleSubmit, loading, error }) => {
    const [openTables, setOpenTables] = useState(false);
    const [openMenus, setOpenMenus] = useState(false);
    const [selectedTable, setSelectedTable] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState([]);

    const handleSelectedTable = (id) => {
        if (!selectedTable.includes(id)) {
            setSelectedTable([...selectedTable, id]);
            setFormData((prevState) => ({
                ...prevState,
                table: [
                    ...prevState.table,
                    id
                ]
            }));
        }
    };

    const handleSelectedMenu = (id) => {
        if (!selectedMenu.includes(id)) {
            setSelectedMenu([...selectedMenu, id]);
            setFormData((prevState) => ({
                ...prevState,
                menu: [
                    ...prevState.menu,
                    {
                        productId: id,
                        quantity: 1,
                    }
                ]
            }));
        }
    };

    const handleDeleteTable = (id) => {
        const updatedTable = selectedTable.filter((tableId) => tableId !== id);
        setSelectedTable(updatedTable);
        setFormData((prevState) => ({
            ...prevState,
            table: updatedTable
        }));
    };

    const handleDeleteMenu = (id) => {
        const updatedMenu = selectedMenu.filter((menuId) => menuId !== id);
        setSelectedMenu(updatedMenu);
        setFormData((prevState) => ({
            ...prevState,
            menu: [
                ...prevState.menu.filter((product) => product.productId !== id)
            ]
        }));
    };

    const handleQuantityChange = (event, productId) => {
        const { value } = event.target;

        setFormData((prevState) => {
            const updatedMenu = prevState.menu
                .filter((product) => product.productId === productId)
                .map((product) => ({ ...product, quantity: value }));

            return {
                ...prevState,
                menu: updatedMenu
            };
        });
    };

    console.log(formData.menu);

    const handleIncreaseQuantity = (productId) => {
        setFormData((prevState) => ({
            ...prevState,
            menu: [
                ...prevState.menu.map((product) => {
                    if (product.productId === productId) {
                        return {
                            ...product,
                            quantity: product.quantity + 1
                        };
                    }
                    return product;
                })
            ]
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setFormData((prevState) => ({
            ...prevState,
            menu: [
                ...prevState.menu.map((product) => {
                    if (product.productId === productId) {
                        return {
                            ...product,
                            quantity: product.quantity - 1
                        };
                    }
                    return product;
                })
            ]
        }));
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Full Name"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(error?.customerName)}
                        helperText={error?.customerName}
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(error?.phoneNumber)}
                        helperText={error?.phoneNumber}
                        autoComplete="off"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Number of People"
                        name="customerNumber"
                        value={formData.customerNumber}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(error?.customerNumber)}
                        helperText={error?.customerNumber}
                        autoComplete="off"
                    />
                </Grid>
            </Grid>
            <Box sx={{ my: 2 }}>
                <ButtonGroup fullWidth>
                    <Button variant="contained" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenTables(true)}>Add table</Button>
                    <Button variant="contained" startIcon={<Add />} sx={{ mt: 2 }} onClick={() => setOpenMenus(true)}>Add menu</Button>
                </ButtonGroup>
                <Dialog maxWidth="lg" open={openTables} onClose={() => setOpenTables(false)}>
                    <DialogTitle>Select Table</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ width: 900 }}>
                        <SelectTableLists
                            handleSeclectedTable={handleSelectedTable}
                            tables={tableReady}
                        />
                    </DialogContent>
                </Dialog>
                <Dialog maxWidth="lg" open={openMenus} onClose={() => setOpenMenus(false)}>
                    <DialogTitle>Select Menu</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ width: 900 }}>
                        <SelectMenuLists
                            menus={menus}
                            handleSelectedMenu={handleSelectedMenu}
                        />
                    </DialogContent>
                </Dialog>
            </Box>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" component="p" sx={{ mr: 1 }}>Selected table:</Typography>
                    <Stack direction="row" spacing={1}>
                        {selectedTable.map((tableId, index) => (
                            <Chip
                                key={index}
                                label={tables.find((table) => table.tableId === tableId)?.tableName}
                                onDelete={() => handleDeleteTable(tableId)}
                            />
                        ))}
                        {selectedTable.length ? (error?.table && <Chip label={error.table} color="error" />) : null}
                    </Stack>
                </Box>
                <Box>
                    <Typography variant="body1" component="p" sx={{ mr: 1 }}>Selected menu:</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 50 }}>STT</TableCell>
                                    <TableCell sx={{ width: 150 }}>Image Preview</TableCell>
                                    <TableCell sx={{ width: 300 }}>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedMenu.map((menuId, index) => (
                                    <TableRow key={menuId}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell><Avatar variant="square" sx={{ width: 72, height: 72 }} src={menus.find((menu) => menu.productId === menuId)?.imageUrl} /></TableCell>
                                        <TableCell>{menus.find((menu) => menu.productId === menuId)?.productName}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button variant="contained" size="small" onClick={() => handleDecreaseQuantity(menuId)}><Remove /></Button>
                                                <TextField
                                                    name="quantity"
                                                    value={formData.menu.find((product) => product.productId === menuId)?.quantity}
                                                    onChange={(e) => handleQuantityChange(e, menuId)}
                                                    sx={{ width: 75 }}
                                                    size="small"
                                                />
                                                <Button variant="contained" size="small" onClick={() => handleIncreaseQuantity(menuId)}><Add /></Button>
                                            </ButtonGroup>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteMenu(menuId)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            {loading ? (
                <LoadingButton
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    loading
                    loadingPosition="start"
                    startIcon={<Save />}
                >
                    Save
                </LoadingButton>
            ) : (
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Save
                </Button>
            )}
        </Box>
    );
};

export default OrderForm