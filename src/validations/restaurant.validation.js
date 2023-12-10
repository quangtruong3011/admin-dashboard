import * as Yup from "yup";

export const restaurantValidationSchema = Yup.object().shape({
    restaurantName: Yup.string()
        .max(255, "Restaurant Name must be at most 255 characters")
        .required("Restaurant Name is required"),
    province: Yup.string().required("Province is required"),
    district: Yup.string().required("District is required"),
    ward: Yup.string().required("Ward is required"),
    address: Yup.string()
        .max(255, "Address must be at most 255 characters")
        .required("Address is required"),
    openTime: Yup.date().nullable().required("Open Time is required"),
    closeTime: Yup.date().nullable().required("Close Time is required"),
    description: Yup.string().required("Description is required"),
});