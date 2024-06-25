import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <h1>Auth</h1>

            <div>
                <Outlet />
            </div>
        </div>
    )
}