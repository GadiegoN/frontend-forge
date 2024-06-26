export function Footer() {

    return (
        <div className="w-full h-20 flex flex-col justify-center shadow-2xl border-t mb-2 items-center bg-primary/10">
            <p className="text-base">Todos os direitos reservados <span className="text-violet-500 font-semibold">&copy; {new Date().getFullYear()}</span></p>
            <p className="text-sm">Desenvolvido por <a className="text-primary font-semibold" href="https://www.instagram.com/gadiego_front/">Gadiego Nogueira</a></p>

        </div>
    )
}