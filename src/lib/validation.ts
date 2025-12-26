import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  // ✅ Added Phone Validation
  phone: z.string().min(10, "Phone number must be valid").regex(/^\d+$/, "Numbers only"), 
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof RegisterSchema>;