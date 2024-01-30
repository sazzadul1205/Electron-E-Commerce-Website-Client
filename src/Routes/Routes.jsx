import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import HomePage from "../Pages/Dashboard/Admin/HomePage/HomePage";
import AdmProducts from "../Pages/Dashboard/Admin/AdmProducts/AdmProducts";
import ViewNewsLetterSubscribers from "../Pages/Dashboard/Admin/ViewNewsLetterSubscribers/ViewNewsLetterSubscribers";
import ProductsPage from "../Pages/ProductsPage/ProductsPage";
import ViewAllUsers from "../Pages/Dashboard/Admin/ViewAllUsers/ViewAllUsers";
import Cart from "../Pages/Cart/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product",
        element: <ProductsPage></ProductsPage>
      },
      {
        path: "/cart",
        element: <Cart></Cart>
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/SignUp",
    element:<SignUp></SignUp>
  },
  {
    path: "/Dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children:[
      {
        path:"PHomePageContent",
        element: <HomePage></HomePage>
      },
      {
        path:"allProducts",
        element: <AdmProducts></AdmProducts>
      },
      {
        path:"NewsLetterSubscriber",
        element: <ViewNewsLetterSubscribers></ViewNewsLetterSubscribers>
      },
      {
        path:"ViewAllUsers",
        element: <ViewAllUsers></ViewAllUsers>
      },
    ]
  }
]);
