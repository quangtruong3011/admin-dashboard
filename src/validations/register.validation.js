import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .max(100, "Full name must be at most 100 characters")
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number must be a number")
        .min(10, "Phone number must be at least 10 digits")
        .max(12, "Phone number must be at most 10 digits")
        .required("Phone number is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});