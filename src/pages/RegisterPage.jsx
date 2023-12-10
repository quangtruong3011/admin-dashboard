import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { registerValidationSchema } from "../validations/register.validation";
import RegisterForm from "../forms/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

const authService = new AuthService();

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await registerValidationSchema.validate(formData, { abortEarly: false });
            await authService.register(formData);
            setFormData({
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
            });
            navigate("/")
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
                return;
            } else {
                setError(error?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" sx={{ textAlign: "center", fontWeight: 600 }}>
                Register
            </Typography>
            <RegisterForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
            <Typography sx={{ textAlign: "center", mt: 2 }}>
                Already have an account? <Link to="/">Login</Link>
            </Typography>
        </Container>
    );
};

export default RegisterPage;