import { z } from "zod";

export const userRegisterSchema = z.object({
    name: z.string().min(1, {message: "O campo nome deve ser preenchido."}),
    email: z.string().min(1, {message: "O campo email deve ser preenchido."}).email({message: "Email inválido."}),
    message: z.string().min(1, {message: "O campo mensagem deve ser preenchido."}),
});

export type UserRegister = z.infer<typeof userRegisterSchema>;