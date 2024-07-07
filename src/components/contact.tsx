import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase-connection";

const schema = z.object({
    name: z.string().min(3, "Nome é obrigatório ter pelo menos 3 caracteres!"),
    email: z.string().email("Insira uma e-mail válido").min(1, "O campo email é obrigatório!"),
    subject: z.string().min(1, "O campo assunto é obrigatório!"),
    message: z.string().min(1, "O campo de mensagem é obrigatório!")
})

type FormData = z.infer<typeof schema>

export function ContactInfos() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    const navigate = useNavigate()

    function onSubmit(data: FormData) {
        addDoc(collection(db, "contact"), {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            created: new Date()
        })
            .then(() => {
                reset()
            })
            .catch((errors) => {
                console.error(errors)
            })
    }

    return (
        <div className="w-full justify-center flex flex-wrap items-center gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-card shadow-2xl rounded-lg p-4 mx-auto flex flex-col gap-4">
                <div>
                    <Label htmlFor="name">Nome completo <span className="select-none text-red-500">*</span></Label>
                    <Input
                        id="name"
                        {...register("name")}
                        placeholder="Digite seu nome completo"
                    />
                    {errors.name && <p className="ml-4 text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <Label htmlFor="email">Email <span className="select-none text-red-500">*</span></Label>
                    <Input
                        id="email"
                        {...register("email")}
                        placeholder="Digite seu email"
                    />
                    {errors.email && <p className="ml-4 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <Label htmlFor="subject">Assunto <span className="select-none text-red-500">*</span></Label>
                    <Input
                        id="subject"
                        {...register("subject")}
                        placeholder="Digite o titulo do assunto"
                    />
                    {errors.subject && <p className="ml-4 text-sm text-red-500">{errors.subject.message}</p>}
                </div>
                <div>
                    <Label htmlFor="message">Mensagem <span className="select-none text-red-500">*</span></Label>
                    <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Digite sua mensagem..."
                    />
                    {errors.message && <p className="ml-4 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                <Button type="submit">Enviar mensagem</Button>
                <div className="flex items-center">
                    <div className="h-1 bg-secondary w-full mx-1 rounded-3xl" />
                    <p className="text-center">ou</p>
                    <div className="h-1 bg-secondary w-full mx-1 rounded-3xl" />
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/sign-up')}>Criar conta</Button>
            </form>
        </div>
    )
}