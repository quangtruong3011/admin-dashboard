import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Tab, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import ProductForm from "../forms/ProductForm";
import * as Yup from "yup";
import AdminService from "../services/adminService";
import { productValidationSchema } from "../validations/product.validation";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Add, Search } from "@mui/icons-material";
import ProductLists from "../components/lists/ProductLists";

const adminService = new AdminService();

const ProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setopen] = useState(false);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        unit: "",
        description: "",
        price: "",
        discount: 0,
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [productId, setProductId] = useState(null);
    const [value, setValue] = useState("1");


    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const products = await adminService.getProductCategory({ value });
                setProducts(products.data.data);
                setImage(products.data.data.imageUrl);
                setImagePreview(products.data.data.imageUrl);
            } catch (error) {
                setError(error.respone?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [value]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setError((prevState) => ({
            ...prevState,
            [name]: null,
        }));
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setImage(imageFile);
        setImagePreview(URL.createObjectURL(imageFile));
        setError((prevState) => ({
            ...prevState,
            image: null,
        }));
    };

    const handleCancel = () => {
        setFormData({
            productName: "",
            category: "",
            description: "",
            unit: "",
            price: "",
            discount: "",
        });
        setImage(null);
        setImagePreview(null);
        setError(null);
    };

    const handleSubmit = async (event, productId) => {
        event.preventDefault();

        try {
            setLoading(true);
            await productValidationSchema.validate(formData, { abortEarly: false });
            const formDataToSend = new FormData();
            formDataToSend.append("productName", formData.productName);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("unit", formData.unit);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("discount", formData.discount);
            formDataToSend.append("image", image);
            if (productId) {
                const response = await adminService.updateProduct(productId, formDataToSend);
                setProducts(products.map((product) => (product.productId === productId ? response.data.data : product)));
            } else {
                const response = await adminService.createProduct(formDataToSend);
                setProducts([...products, response.data.data]);
            }
            setopen(false);
            setFormData({
                productName: "",
                category: "",
                description: "",
                unit: "",
                price: "",
                discount: "",
            });
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
                return;
            } else {
                setError(error.respone?.data?.message || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        setopen(true);
        setProductId(id);
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const product = await adminService.getInfoProduct(id);
                setFormData(product.data.data);
                setImage(product.data.data.imageUrl);
                setImagePreview(product.data.data.imageUrl);
            } catch (error) {
                setError(error.respone?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await adminService.deleteProduct(id);
            setProducts(products.filter((product) => product.productId !== id));
        } catch (error) {
            setError(error.respone?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Button variant="contained" startIcon={<Add />} onClick={() => setopen(true)}>Add product</Button>
                <TextField
                    label="Search"
                    name="search"
                    margin="normal"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <Search />
                            </IconButton>
                        )
                    }}
                />
            </Box>
            <Divider />
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChangeValue}>
                        <Tab label="All" value="1" />
                        <Tab label="Food" value="2" />
                        <Tab label="Drinks" value="3" />
                    </TabList>
                </Box>
                <Divider />
                <TabPanel value="1">
                    <ProductLists
                        products={products}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </TabPanel>
                <TabPanel value="2">
                    <ProductLists
                        products={products}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </TabPanel>
                <TabPanel value="3">
                    <ProductLists
                        products={products}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </TabPanel>
            </TabContext>
            <Dialog maxWidth="xl" open={open} onClose={() => setopen(false)}>
                <DialogTitle>Product Form</DialogTitle>
                <DialogContent sx={{ width: 1200 }}>
                    <ProductForm
                        formData={formData}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                    />
                </DialogContent>
            </Dialog>
            {productId ? (
                <Dialog maxWidth="xl" open={open} onClose={() => setopen(false)}>
                    <DialogTitle>Product Form</DialogTitle>
                    <DialogContent sx={{ width: 1200 }}>
                        <ProductForm
                            formData={formData}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            imagePreview={imagePreview}
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                            productId={productId}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Dialog maxWidth="xl" open={open} onClose={() => setopen(false)}>
                    <DialogTitle>Product Form</DialogTitle>
                    <DialogContent sx={{ width: 1200 }}>
                        <ProductForm
                            formData={formData}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            imagePreview={imagePreview}
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />
                    </DialogContent>
                </Dialog >
            )}
        </Layout >
    );
};

export default ProductPage;