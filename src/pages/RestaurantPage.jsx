import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import RestaurantForm from "../forms/RestaurantForm";
import * as Yup from "yup";
import { restaurantValidationSchema } from "../validations/restaurant.validation";
import AdminService from "../services/adminService";
import dayjs from "dayjs";

const adminService = new AdminService();

const RestaurantPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        restaurantName: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        openTime: null,
        closeTime: null,
        description: "",
    });
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                setLoading(true);
                const restaurant = await adminService.getRestaurant();
                const formattedData = {
                    ...restaurant.data.data,
                    openTime: dayjs(restaurant.data.data.openTime, "HH:mm A"),
                    closeTime: dayjs(restaurant.data.data.closeTime, "HH:mm A"),
                }
                setFormData(formattedData);
                setImage(restaurant.data.data.imageUrl && restaurant.data.data.imageUrl);
                setImagePreview(restaurant.data.data.imageUrl && restaurant.data.data.imageUrl);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setError((prevError) => ({
            ...prevError,
            image: null,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            await restaurantValidationSchema.validate(formData, { abortEarly: false });

            const formDataSend = new FormData();
            formDataSend.append("restaurantName", formData.restaurantName);
            formDataSend.append("province", formData.province);
            formDataSend.append("district", formData.district);
            formDataSend.append("ward", formData.ward);
            formDataSend.append("address", formData.address);
            formDataSend.append("openTime", dayjs(formData.openTime).format("HH:mm A"));
            formDataSend.append("closeTime", dayjs(formData.closeTime).format("HH:mm A"));
            formDataSend.append("description", formData.description);
            formDataSend.append("image", image);

            await adminService.updateRestaurant(formDataSend);
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

    return (
        <Layout>
            <RestaurantForm
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                image={image}
                handleImageChange={handleImageChange}
                imagePreview={imagePreview}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
                setError={setError}
            />
        </Layout>
    );
};

export default RestaurantPage;