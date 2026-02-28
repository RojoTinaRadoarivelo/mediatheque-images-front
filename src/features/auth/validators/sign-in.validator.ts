import { z } from "zod";

export const SIGNIN_SCHEMA = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(10, "Minimum 10 characteres"),
});

export type SigninFormData = z.infer<typeof SIGNIN_SCHEMA>;
