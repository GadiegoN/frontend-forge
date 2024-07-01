import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="flex flex-col bg-background">
            <Header />

            <div>
                <Outlet />
            </div>
        </div>
    )
}