"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { assetSchema, type AssetFormValues } from "@/lib/schemas/assetSchema"

import {
  Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"

import {
  Field, FieldError, FieldGroup, FieldLabel
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useModal from "@/components/Modal/useModal"
import { X } from "lucide-react"
import { useCreateAssetMutation } from "@/features/asset/assetApi"
import ClientSelect from "@/components/Common/ClientSelect"

export function AddAssetFormDialog() {
  const { close } = useModal()
  const [createAsset, { isLoading }] = useCreateAssetMutation()

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: "",
      type: "",
      model: "",
      serialNumber: "",
      description: "",
      location: "",
      clientId: "",
    },
  })

  async function onSubmit(values: AssetFormValues) {
    try {
      await createAsset(values).unwrap()
      toast.success("Asset created successfully")
      form.reset()
      close(["modal"])
    } catch {
      toast.error("Failed to create asset")
    }
  }

  return (
    <Card className="max-w-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Add Asset</CardTitle>
        <Button variant="outline" onClick={() => close(["modal"])}>
          <X />
        </Button>
      </CardHeader>

      <CardContent>
        <form
          id="asset-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>

            {/* Asset Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Client Dropdown */}
            <Controller
              name="clientId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Client</FieldLabel>

                  <ClientSelect
                    value={field.value}
                    onChange={field.onChange}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


            {/* Type */}
            <Controller
              name="type"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />

            {/* Model */}
            <Controller
              name="model"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Model</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />

            {/* Serial Number */}
            <Controller
              name="serialNumber"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Serial Number</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />

            {/* Location */}
            <Controller
              name="location"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />


          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="submit" form="asset-form" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Asset"}
        </Button>
      </CardFooter>
    </Card>
  )
}
