import { z } from "zod";

export const SIGNUP_SCHEMA = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(10, "Minimum 10 characteres"),
    code: z.string().min(8, "Invalid eight digits validation code "),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SIGNUP_SCHEMA>;
