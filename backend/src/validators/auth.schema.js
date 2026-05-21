import { z } from "zod";

const emailField = z.string().email("Invalid email").trim().toLowerCase();

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).+$/,
    "Password must contain letters and numbers",
  );

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  email: emailField,
  password: passwordField,
});

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});
