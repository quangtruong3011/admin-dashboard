import React from "react";
import { publishRoute } from "./RouteConfig";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

const AuthRouter = () => {
    return (
        <Routes>
            {publishRoute.map((route, index) => (
                <Route key={index} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AuthRouter;