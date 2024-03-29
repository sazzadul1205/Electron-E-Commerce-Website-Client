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
import ViewAllOrders from "../Pages/Dashboard/Admin/ViewAllOrders/ViewAllOrders";
import MyOrders from "../Pages/Dashboard/Users/MyOrders/MyOrders";
import AdmStatistics from "../Pages/Dashboard/Admin/AdmStatistics/AdmStatistics";
import FAQPage from "../Pages/FAQPage/FAQPage";
import AdmFAQs from "../Pages/Dashboard/Admin/AdmFAQs/AdmFAQs";
import BlogsPage from "../Pages/BlogsPage/BlogsPage";
import IndividualBlog from "../Pages/BlogsPage/IndividualBlog/IndividualBlog";
import AdmBlogs from "../Pages/Dashboard/Admin/HomePage/AdmBlogs/AdmBlogs";
import AboutUsPage from "../Pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import MyBlogs from "../Pages/Dashboard/Users/MyBlogs/MyBlogs";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout></PublicLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/fAQ",
        element: <FAQPage></FAQPage>,
      },
      {
        path: "/Blog",
        element: <BlogsPage></BlogsPage>,
      },
      {
        path: "/Blog/:id",
        element: <IndividualBlog></IndividualBlog>,
        loader: ({ params }) =>
          fetch(`https://electron-e-commerce-website-server.vercel.app/BlogPosts/${params.id}`),
      },
      {
        path: "/AboutUs",
        element: <AboutUsPage></AboutUsPage>,
      },
      {
        path: "/ContactUs",
        element: <ContactUsPage></ContactUsPage>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/SignUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "/Dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "PHomePageContent",
        element: (
          <PrivateRoutes>
            <HomePage></HomePage>
          </PrivateRoutes>
        ),
      },
      {
        path: "allProducts",
        element: (
          <PrivateRoutes>
            <AdmProducts></AdmProducts>
          </PrivateRoutes>
        ),
      },
      {
        path: "NewsLetterSubscriber",
        element: (
          <PrivateRoutes>
            <ViewNewsLetterSubscribers></ViewNewsLetterSubscribers>
          </PrivateRoutes>
        ),
      },
      {
        path: "ViewAllUsers",
        element: (
          <PrivateRoutes>
            <ViewAllUsers></ViewAllUsers>
          </PrivateRoutes>
        ),
      },
      {
        path: "AllOrders",
        element: (
          <PrivateRoutes>
            <ViewAllOrders></ViewAllOrders>
          </PrivateRoutes>
        ),
      },
      {
        path: "MyOrders",
        element: (
          <PrivateRoutes>
            <MyOrders></MyOrders>
          </PrivateRoutes>
        ),
      },
      {
        path: "AdmStatistics",
        element: (
          <PrivateRoutes>
            <AdmStatistics></AdmStatistics>
          </PrivateRoutes>
        ),
      },
      {
        path: "AdmFAQs",
        element: (
          <PrivateRoutes>
            <AdmFAQs></AdmFAQs>
          </PrivateRoutes>
        ),
      },
      {
        path: "AdmBlogs",
        element: (
          <PrivateRoutes>
            <AdmBlogs></AdmBlogs>
          </PrivateRoutes>
        ),
      },
      {
        path: "MyBlogs",
        element: (
          <PrivateRoutes>
            {" "}
            <MyBlogs></MyBlogs>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
