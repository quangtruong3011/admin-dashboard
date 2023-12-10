import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import AuthService from "../../services/authService";

const AuthContext = createContext();
const authService = new AuthService();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleLogin = async () => {
        try {
            const response = await authService.getInfo();
            if (response.status === 200) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            handleLogin();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch,
                handleLogin,
                handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };