import { Route, Routes } from "react-router-dom";
import { privateRoute } from "./RouteConfig";
import PageNotFound from "../pages/PageNotFound";

const AppRouter = () => {
    return (
        <Routes>
            {privateRoute.map((route, index) => (
                <Route key={index} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AppRouter;