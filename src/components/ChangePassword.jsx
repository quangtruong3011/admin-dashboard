import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { changePasswordValidationSchema } from "../validations/password.validation";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import * as Yup from "yup";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

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
            await changePasswordValidationSchema.validate(formData, { abortEarly: false });
            setLoading(true);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setError(errors);
                return;
            } else {
                setError(error.respone.data.message);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Change Password</Typography>
            <ChangePasswordForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </Box>
    );
};

export default ChangePassword;