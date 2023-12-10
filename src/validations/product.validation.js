import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
    productName: Yup.string().axt(255, "Product Name must be at most 255 characters").required("Product Name is required"),
    category: Yup.string().required("Category is required"),
    unit: Yup.string().required("Unit is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
        .integer("Price must be an integer")
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price is required"),
    discount: Yup.number()
        .typeError("Discount must be a number")
    // image: Yup.mixed().required("Image is required"),
});