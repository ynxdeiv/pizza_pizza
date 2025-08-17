'use client';
import { FieldValues, useForm } from "react-hook-form";
import './form.css';
import { zodResolver } from '@hookform/resolvers/zod'
import {ErrorMessage} from "@hookform/error-message"; 
import type { UserRegister } from "./schema";
import { userRegisterSchema } from "./schema";
import { toast } from "react-toastify";

export default function Form() {

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<UserRegister>({
        resolver: zodResolver(userRegisterSchema),
        mode: 'onBlur',
    });

    async function onSubmit(data: FieldValues) {
        console.log(data);
        const responseGet = await fetch('http://localhost:3001/faleConosco', { method: 'POST', body: JSON.stringify(data) });

        if (responseGet.ok) {
            console.log("Dados enviados com sucesso!");
            toast.success("Dados enviados com sucesso!");
        }
    }

 return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nome"
                        {...register("name")}
                        className={errors.name ? 'input-error' : ''}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        as="p"
                        className="error-message"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className={errors.email ? 'input-error' : ''}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        as="p"
                        className="error-message"
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Mensagem"
                        {...register("message")}
                        className={errors.message ? 'input-error' : ''}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="message"
                        as="p"
                        className="error-message"
                    />
                </div>

                <button disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </div>
    );
}