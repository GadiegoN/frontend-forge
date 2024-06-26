import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function AppLayout() {
    return (
        <div className="flex flex-col bg-background">
            <Header />

            <div>
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}