import * as Yup from "yup";

export const orderValidationSchema = Yup.object().shape({
    customerName: Yup.string()
        .max(100, "Full name must be at most 100 characters")
        .required("Full name is required"),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .min(10, "Phone number must be at least 10 characters")
        .max(12, "Phone number must be at most 12 characters")
        .required("Phone number is required"),
    customerNumber: Yup.number()
        .typeError("Number of people must be a number")
        .min(1, "Number of people must be at least 1")
        .required("Number of people is required"),
    table: Yup.array()
    .required("Table is required"),
});