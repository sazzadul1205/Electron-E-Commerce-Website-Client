import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import Home from "../Pages/Home/Home"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout></PublicLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
        ]
    }
])