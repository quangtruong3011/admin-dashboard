import * as Yup from "yup"

export const employeeValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .max(100, "Full name must be at most 100 characters")
        .required("Full name is required"),
    gender: Yup.string()
        .required("Gender is required"),
    username: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
        .max(100, "Username must be at most 100 characters")
        .required("Username is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});