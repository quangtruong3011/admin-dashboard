import * as Yup from "yup";

export const postValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
});