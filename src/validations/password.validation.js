import * as Yup from "yup";

export const changePasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Current password is required"),
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
});