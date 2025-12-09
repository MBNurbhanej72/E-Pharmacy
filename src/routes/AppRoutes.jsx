import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Products from "../pages/Products";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/", element: <MainLayout />, children: [
      { path: "", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blog-details", element: <BlogDetails /> },
      { path: "contact-us", element: <Contact /> },
    ]
  },

  { path: "*", element: <NotFound /> }
]);