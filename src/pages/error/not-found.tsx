import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full max-w-7xl flex flex-col justify-center items-center mx-auto flex-1">
                <h3 className="text-xl font-semibold mb-8">Página não encontrada</h3>
                <Button variant="link" onClick={() => navigate('/')}>Voltar ao ínicio</Button>
            </div>
            <Footer />
        </div>
    )
}