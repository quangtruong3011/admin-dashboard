import { useContext } from "react";
import AuthRouter from "./AuthRouter";
import AppRouter from "./AppRouter";
import { AuthContext } from "../context/auth";

const Router = () => {
    const { state } = useContext(AuthContext);
    if (state.isLoggedIn) {
        return (
            <AppRouter />
        );
    }
    return <AuthRouter />;
};

export default Router;