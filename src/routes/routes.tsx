import { createBrowserRouter } from "react-router-dom";

import { AdminLayout } from "@/pages/_layout/admin";
import { Dashboard } from "@/pages/admin/dashboard";

import { AppLayout } from "@/pages/_layout/app";
import { Home } from "@/pages/app/home";

import { AuthLayout } from "@/pages/_layout/auth";
import { SignIn } from "@/pages/auth/sign-in";

import { NotFound } from "@/pages/error/not-found";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <Home /> }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/sign-in", element: <SignIn /> }
        ]
    },
    {
        path: "/",
        element: <AdminLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/dashboard", element: <Dashboard /> }
        ]
    },
])