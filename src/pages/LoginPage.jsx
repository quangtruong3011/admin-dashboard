import { Container, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import LoginForm from "../forms/LoginForm";
import { loginValidationSchema } from "../validations/login.validation";
import * as Yup from "yup";
import AuthService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const authService = new AuthService();

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const { handleLogin } = useContext(AuthContext);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            await loginValidationSchema.validate(formData, { abortEarly: false });
            const response = await authService.login(formData);
            const { accessToken } = response.data;

            localStorage.setItem("token", accessToken);
            await handleLogin();
            navigate("/");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
            } else {
                const errorMessage = {};
                if (error?.response?.data?.message) {
                    errorMessage.message = error?.response?.data?.message;
                }
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" sx={{ textAlign: "center", fontWeight: 600 }}>Login Page</Typography>
            <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
            <Typography variant="body1" component="p" sx={{ textAlign: "center", mt: 2 }}>Don't have an account? <Link to="/register">Register</Link></Typography>
        </Container>
    );
};

export default LoginPage;