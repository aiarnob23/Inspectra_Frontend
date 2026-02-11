import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import Clients from "@/pages/Dashboard/Clients";
import NotFound from "@/pages/NotFoundPage";
import Home from "@/pages/Public/Home";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Assets from "@/pages/Dashboard/Assets";
import Employees from "@/pages/Dashboard/Employees";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/main",
        element: <RootLayout />,
        children: [
            {

            }
        ]
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardLayout/></ProtectedRoute>,
        children: [
            {
                path: "/dashboard/clients",
                element: <Clients />,
            },
            {
                path:"/dashboard/assets",
                element:<Assets/>
            },
            {
                path:"/dashboard/employees",
                element:<Employees/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }


])

export default router;