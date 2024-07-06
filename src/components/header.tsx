import { AlignJustify, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useTheme } from "@/components/theme-provider"
import { Logo } from "@/assets/logo"
import { useNavigate } from "react-router-dom"
import { ContactInfos } from "./contact"


export function Header() {
    const { setTheme } = useTheme()
    const navigate = useNavigate()

    return (
        <div className="w-full h-20 flex justify-around shadow-2xl border-b mb-2 items-center bg-primary/10">
            <Logo />
            <div className="flex gap-4">
                <div className="hidden md:flex">
                    <Button variant="link" onClick={() => navigate('/')}>Ínicio</Button>
                    <Button variant="link" onClick={() => navigate('/dashboard')}>Painel ADM</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link">Contato</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                                <ContactInfos />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex md:hidden lg:hidden" asChild>
                        <Button variant="outline" size="icon">
                            <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate('/')}>
                            Ínicio
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                            Painel ADM
                        </DropdownMenuItem>
                        <Dialog>
                            <DropdownMenuItem>
                                <DialogTrigger>
                                    Contato
                                </DialogTrigger>
                            </DropdownMenuItem>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription>
                                    </DialogDescription>
                                    <ContactInfos />
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Escolha o tema</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Laranja Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Laranja Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            Padrão
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("green")}>
                            verde Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("green-dark")}>
                            verde Dark
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}