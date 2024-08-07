import { createBrowserRouter } from "react-router-dom";

import { AdminLayout } from "@/pages/_layout/admin";
import { Dashboard } from "@/pages/admin/dashboard";

import { AppLayout } from "@/pages/_layout/app";
import { Home } from "@/pages/app/home";

import { AuthLayout } from "@/pages/_layout/auth";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";

import { NotFound } from "@/pages/error/not-found";
import { PrivateRoute } from "@/pages/private/private-routes";

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
            { path: "/sign-in", element: <SignIn /> },
            { path: "/sign-up", element: <SignUp /> }
        ]
    },
    {
        path: "/",
        element: <PrivateRoute><AdminLayout /></PrivateRoute>,
        errorElement: <NotFound />,
        children: [
            { path: "/dashboard", element: <Dashboard /> }
        ]
    },
])