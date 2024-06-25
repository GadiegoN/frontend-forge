import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <h1>Admin</h1>

            <div>
                <Outlet />
            </div>
        </div>
    )
}