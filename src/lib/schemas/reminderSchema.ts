import { z } from "zod"

export const reminderSchema = z.object({
  method: z.enum(["email", "sms", "both"]),
  additionalNotes: z.string().optional(),
})

export type ReminderFormValues = z.infer<typeof reminderSchema>
