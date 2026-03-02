import { z } from "zod";

export const USER_SCHEMA = z.object({
    email: z.string().email("Invalid Email "),
    userName: z.string().min(10, "Minimum 10 characteres").max(250, "Maximum 250 characteres"),
});

export type UserFormData = z.infer<typeof USER_SCHEMA>;
