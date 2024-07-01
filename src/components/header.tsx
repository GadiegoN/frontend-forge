import { AlignJustify, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { Logo } from "@/assets/logo"


export function Header() {
    const { setTheme } = useTheme()

    return (
        <div className="w-full h-20 flex justify-around shadow-2xl border-b mb-2 items-center bg-primary/10">
            <Logo />
            <div className="flex gap-4">
                <div className="hidden md:flex">
                    <Button variant="link"><a href="#">Ínicio</a></Button>
                    <Button variant="link" disabled>Painel ADM</Button>
                    <Button variant="link"><a href="#contact">Contato</a></Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex md:hidden lg:hidden" asChild>
                        <Button variant="outline" size="icon">
                            <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <a className="cursor-pointer" href="#">Ínicio</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a className="cursor-pointer" href="">Painel ADM</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a className="cursor-pointer" href="#contact">Contato</a>
                        </DropdownMenuItem>
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
                            Claro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Escuro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            Padrão
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}