import * as z from "zod"

//register user
export const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  password:z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/^(?=.*[a-z])/, 'Must contain one lowercase letter')
    .regex(/^(?=.*[A-Z])/, 'Must contain one uppercase letter')
    .regex(/^(?=.*\d)/, 'Must contain one number'),
  confirmPassword: z.string().min(6),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
)

//otp 

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
export type OTPFormValues = z.infer<typeof otpSchema>