import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Public/Home";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/main",
        element:<RootLayout/>,
        children:[
            {
            
        }
    ]
    },
    {
        path:"/dashboard",
        element:<DashboardLayout/>
    }
        
    
])

export default router;