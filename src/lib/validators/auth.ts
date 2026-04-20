import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Mot de passe d'au moins 8 caractères"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nom d'au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "Mot de passe d'au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });
export type RegisterInput = z.infer<typeof registerSchema>;
