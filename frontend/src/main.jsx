import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import PostListPage from "./pages/PostListPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Write from "./pages/Write.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

import { ClerkProvider } from "@clerk/clerk-react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/post/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" />
        </QueryClientProvider>
      </HelmetProvider>
    </ClerkProvider>
  </StrictMode>
);
