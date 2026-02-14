import { z } from "zod";

export const SIGNIN_SCHEMA = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
});

export type SigninFormData = z.infer<typeof SIGNIN_SCHEMA>;
