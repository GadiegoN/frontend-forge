/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface InputProps {
    label: string
    placeholder: string
    name: string
    register: UseFormRegister<any>
    erro?: string
    rules?: RegisterOptions
    type?: string
    textarea?: boolean
}

export function TextInput({ label, placeholder, name, register, erro, rules, type = "text", textarea = false }: InputProps) {
    return (
        <div className="flex flex-col gap-2 mb-4">
            <label htmlFor={name}>{label}</label>
            {!textarea ? (
                <Input
                    className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={placeholder}
                    {...register(name, rules)}
                    id={name}
                    type={type}
                />
            ) : (
                <Textarea
                    className="w-full rounded-lgflex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={placeholder}
                    {...register(name, rules)}
                    id={name}
                />
            )}
            {erro && <p className="ml-4 text-sm text-red-500">{erro}</p>}
        </div>
    )
}