import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/services/firebase-connection"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
    email: z.string().email("Insira uma e-mail válido").min(1, "O campo email é obrigatório!"),
    password: z.string().min(1, "O campo senha é obrigatório!")
})

type FormData = z.infer<typeof schema>

export function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const navigate = useNavigate()

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

    function onSubmit(data: FormData) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate('/dashboard', { replace: true })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="w-full max-w-7xl mx-auto gap-16 flex flex-col md:grid md:grid-cols-2">
            <div className="hidden md:block">
                <img src="/login.png" alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-8 w-11/12 mx-auto">
                    <label htmlFor="email">Email</label>
                    <Input
                        placeholder="Digite seu Email"
                        {...register("email")}
                        id="email"
                    />
                    {errors.email && <p className="ml-4 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div className="my-8 w-11/12 mx-auto">
                    <label htmlFor="password">Senha</label>
                    <Input
                        placeholder="Digite sua Senha"
                        {...register("password")}
                        id="password"
                        type="password"
                    />
                    {errors.password && <p className="ml-4 text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div className="my-8 w-11/12 mx-auto flex flex-col items-center">
                    <Button className="w-full" type="submit">
                        Fazer login
                    </Button>

                    <Button disabled type="button" className="w-full mt-8" variant="outline">Criar conta</Button>
                </div>
            </form>
        </div>
    )
}