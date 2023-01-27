import * as z from "zod";

const minPasswordLen = 8;
const maxPasswordLen = 128;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase character")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase character")
    .regex(/(?=.*[0-9\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])/, "Password must contain at least one digit or special character")
    .min(minPasswordLen, `Password must contain at least ${minPasswordLen} characters`)
    .max(maxPasswordLen, `Password can contain at most ${maxPasswordLen} characters`)
});

export const signUpSchema = loginSchema;

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;