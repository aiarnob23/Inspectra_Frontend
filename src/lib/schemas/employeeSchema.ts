import { z } from "zod"

export const employeeSchema = z.object({
  e_id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>
