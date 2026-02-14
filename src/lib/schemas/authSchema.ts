import * as z from "zod"

//
// ---------------------------------
// SHARED SCHEMAS
// ---------------------------------
//

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(5)
  .max(255)
  .transform((v) => v.toLowerCase().trim())

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/^(?=.*[a-z])/, "Must contain one lowercase letter")
  .regex(/^(?=.*[A-Z])/, "Must contain one uppercase letter")
  .regex(/^(?=.*\d)/, "Must contain one number")

export const otpCodeSchema = z
  .string()
  .length(6, "OTP must be 6 digits")
  .regex(/^\d+$/, "OTP must contain only numbers")

export const otpSchema = z.object({
  code: otpCodeSchema
})

//register user
export const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().optional(),
  email: emailSchema,
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
)

//Login user
export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required"),
})

//Resend email verification
export const resendEmailSchema = z.object({
  email: emailSchema,
})

//Forgot password
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

//Verify reset password OTP
export const verifyResetOTPSchema = z.object({
  email: emailSchema,
  code: otpCodeSchema
})

//Reset password
export const resetPasswordSchema = z
  .object({
    email: emailSchema,
    newPassword: passwordSchema,
    confirmNewPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
  })
//CHANGE PASSWORD
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"]
  })
  .refine((data => data.currentPassword !== data.newPassword), {
    message: "New password must be different from current password",
    path: ["newPassword"]
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
export type LoginFormValues = z.infer<typeof loginSchema>
export type OTPFormValues = z.infer<typeof otpSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type VerifyResetOTPFormValues = z.infer<typeof verifyResetOTPSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
export type ResendEmailFormValues = z.infer<typeof resendEmailSchema>