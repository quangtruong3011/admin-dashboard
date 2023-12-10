import { Add, ArrowForward, Remove } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, Drawer, Grid, IconButton, Tab, TextField, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Payment from "./Payment";

const SideBarMenu = ({ openDrawer, setOpenDrawer, formData, setFormData, menus, booking, tables, handleOrder, handlePay, bookingId }) => {
    const [tab, setTab] = useState("1");
    const [openActions, setOpenActions] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState([]);

    const handleSelectedMenu = (id) => {
        if (!selectedMenu.includes(id)) {
            setSelectedMenu([...selectedMenu, id]);
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            menu: [
                ...prevFormData.menu,
                {
                    productId: id,
                    quantity: 1,
                }
            ]
        }));
        setOpenActions(true);
    };

    const handleChangeQuantity = (event, productId) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            menu: prevFormData.menu.map((menu) => {
                if (menu.productId === productId) {
                    return { ...menu, quantity: parseInt(value) };
                }
                return menu;
            }),
        }));
    };

    const handleDecreaseQuantity = (id) => {
        setFormData((prevMenu) => ({
            ...prevMenu,
            menu: prevMenu.menu.map((menuItem) => {
                if (menuItem.productId === id) {
                    const newQuantity = menuItem.quantity - 1;
                    return { ...menuItem, quantity: newQuantity >= 0 ? newQuantity : 0 };
                }
                return menuItem;
            }),
        }));
    };

    const handleIncreaseQuantity = (id) => {
        setFormData((prevMenu) => ({
            ...prevMenu,
            menu: prevMenu.menu.map((menuItem) => {
                if (menuItem.productId === id) {
                    return { ...menuItem, quantity: menuItem.quantity + 1 };
                }
                return menuItem;
            }),
        }));
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setFormData({
            customerName: "",
            phoneNumber: "",
            table: [],
            menu: [],
        });
        setSelectedMenu([]);
        setOpenActions(false);
    };

    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={handleCloseDrawer}
            PaperProps={{
                sx: {
                    width: "80%",
                },
            }}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Toolbar>
                <IconButton onClick={handleCloseDrawer}>
                    <ArrowForward />
                </IconButton>
            </Toolbar>
            <TabContext value={tab}>
                <Box>
                    <TabList onChange={(event, newValue) => setTab(newValue)}>
                        <Tab label="Order" value="1" />
                        <Tab label="Payment" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid sx={{ mb: 2 }} container spacing={2}>
                        {menus.map((menu, index) => (
                            <Grid item key={index} xs={2}>
                                <Card>
                                    <CardActionArea onClick={() => handleSelectedMenu(menu.productId)}>
                                        <CardMedia
                                            component="img"
                                            image={menu.imageUrl}
                                            sx={{ height: 200 }}
                                        />
                                        <CardContent>
                                            <Typography sx={{ textTransform: "uppercase" }} variant="body1">{menu.productName}</Typography>
                                            <Typography variant="body2">{menu.price}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    {openActions && (
                                        <CardActions>
                                            <ButtonGroup>
                                                <Button onClick={() => handleDecreaseQuantity(menu.productId)}><Remove /></Button>
                                                <TextField
                                                    name="quantity"
                                                    size="small"
                                                    value={parseInt(formData.menu.find((product) => product.productId === menu.productId)?.quantity) || 0}
                                                    onChange={(event) => handleChangeQuantity(event, menu.productId, event.target.value)}
                                                />
                                                <Button onClick={() => handleIncreaseQuantity(menu.productId)}><Add /></Button>
                                            </ButtonGroup>
                                        </CardActions>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Button variant="contained" onClick={() => { handleOrder(bookingId); setOpenDrawer(false) }}>Order</Button>
                </TabPanel>
                <TabPanel value="2">
                    <Payment
                        booking={booking}
                        menus={menus}
                        tables={tables}
                        handlePay={handlePay}
                        bookingId={bookingId}
                    />
                </TabPanel>
            </TabContext>
        </Drawer>
    );
};

export default SideBarMenu;