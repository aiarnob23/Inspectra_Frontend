import { z } from "zod"

export const inspectionSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  assetId: z.string().min(1, "Asset is required"),
  frequency: z.enum([
    "one_time",
    "weekly",
    "monthly",
    "quarterly",
    "yearly",
  ]),
  scheduledAt: z.string().min(1, "Schedule date required"),

  // ✅ important
  employeeIds: z.array(z.string()).min(1, "Select at least one employee"),
})

export type InspectionFormValues = z.infer<typeof inspectionSchema>
