import * as Yup from "yup";

export const tableValidationSchema = Yup.object().shape({
    tableName: Yup.string().required("Table name is required"),
    capacity: Yup.number()
        .typeError("Capacity must be a number")
        .test("is-number", "Capacity must be a number", value => /^\d+$/.test(value))
        .min(1, "Capacity must be at least 1")
        .required("Capacity is required"),
});