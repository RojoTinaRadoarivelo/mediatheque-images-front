import { z } from "zod";

export const SIGNUP_SCHEMA = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(10, "Minimum 10 caractères"),
    code: z.string().min(8, "Code de huit chiffres invalide"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SIGNUP_SCHEMA>;
