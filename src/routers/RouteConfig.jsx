import ViewAnalytics from "../components/ViewAnalytics";
import AnalyticsPage from "../pages/AnalyticsPage";
import EmployeePage from "../pages/EmployeePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import RestaurantPage from "../pages/RestaurantPage";
import TablePage from "../pages/TablePage";


export const privateRoute = [
    {
        path: "/",
        component: <HomePage />
    },
    {
        path: "/order",
        component: <OrderPage />
    },
    {
        path: "/product",
        component: <ProductPage />
    },
    {
        path: "/product/:id",
    },
    {
        path: "/table",
        component: <TablePage />
    },
    {
        path: "/profile",
        component: <ProfilePage />,
    },
    {
        path: "/employee",
        component: <EmployeePage />
    },
    {
        path: "/analytics",
        component: <AnalyticsPage />
    },
    {
        path:"/analytics/:id",
        component: <ViewAnalytics />
    },
    {
        path: "/restaurant",
        component: <RestaurantPage />
    }
];

export const publishRoute = [
    {
        path: "/",
        component: <LoginPage />
    },
    {
        path: "/register",
        component: <RegisterPage />
    }
];


