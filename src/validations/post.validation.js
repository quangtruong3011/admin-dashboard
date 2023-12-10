import * as Yup from "yup";

export const postValidationSchema = Yup.object().shape({
    title: Yup.string().max(255, "Title must be at most 255 characters").required("Title is required"),
    content: Yup.string().required("Content is required"),
});