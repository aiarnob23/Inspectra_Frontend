import { z } from "zod"

export const assetSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  model: z.string().min(1),
  serialNumber: z.string().optional(),
  description: z.string().optional(),
  location: z.string().min(1),
  clientId: z.string().min(1),
})

export type AssetFormValues = z.infer<typeof assetSchema>
