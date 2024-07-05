import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth-context";
import { auth } from "@/services/firebase-connection";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3, "O campo nome precisa conter pelo menos 3 caracteres!!"),
    email: z.string().email("Insira um e-mail válido").min(1, "O campo email é obrigatório!"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres!!")
})

type FormData = z.infer<typeof schema>

export function SignUp() {
    const { handleInfoUser } = useContext(AuthContext)

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
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (user) => {
                await updateProfile(user.user, {
                    displayName: data.name
                })

                handleInfoUser({
                    name: data.name,
                    email: data.email,
                    uid: user.user.uid
                })

                navigate('/dashboard', { replace: true })
            })
    }

    return (
        <div className="w-full max-w-7xl mx-auto gap-16 flex flex-col md:grid md:grid-cols-2">
            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mb-4">
                    <label htmlFor="name">Nome:</label>
                    <Input placeholder="Digite seu nome" id="name" {...register("name")} />
                    {errors.name && <p className="ml-4 text-sm mt-2 text-red-500">{errors.name.message}</p>}
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="email">Email:</label>
                    <Input placeholder="Digite seu email" id="email" {...register("email")} />
                    {errors.email && <p className="ml-4 text-sm mt-2 text-red-500">{errors.email.message}</p>}
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="password">Senha:</label>
                    <Input placeholder="Digite sua senha" type="password" id="password" {...register("password")} />
                    {errors.password && <p className="ml-4 text-sm mt-2 text-red-500">{errors.password.message}</p>}
                </div>

                <Button type="submit" className="w-full mb-4">Criar conta</Button>
                <div className="flex items-center w-full justify-end">
                    <p>Ja tem conta? </p>
                    <Button type="button" variant="link" onClick={() => navigate('/sign-in')}>Fazer Login</Button>
                </div>
            </form>
            <div className="hidden md:block">
                <img src="/signup.png" alt="" />
            </div>
        </div>
    )
}