import * as z from "zod"

export const clientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  company: z.string().min(2, "Company name is required"),
  status: z.enum(["active", "inactive"]),
})

export type ClientFormValues = z.infer<typeof clientSchema>
