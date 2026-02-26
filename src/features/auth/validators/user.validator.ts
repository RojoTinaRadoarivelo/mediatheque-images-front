import { z } from "zod";

export const USER_SCHEMA = z.object({
    email: z.string().email("Email invalide"),
    userName: z.string().min(10, "Minimum 10 caractères").max(250, "Maximum 250 caractères"),
});

export type UserFormData = z.infer<typeof USER_SCHEMA>;
