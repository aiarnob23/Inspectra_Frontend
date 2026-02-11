"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import useModal from "@/components/Modal/useModal"

import {
  employeeSchema,
  type EmployeeFormValues,
} from "@/lib/schemas/employeeSchema"

import { useCreateEmployeeMutation } from "@/features/employee/employeeApi"

export function AddEmployeeFormDialog() {
  const { close } = useModal()
  const [createEmployee, { isLoading }] =
    useCreateEmployeeMutation()

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      e_id: "",
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(values: EmployeeFormValues) {
    try {
      await createEmployee(values).unwrap()

      toast.success("Employee created successfully")
      form.reset()
      close(["modal"])
    } catch (error: any) {
      toast.error("Failed to create employee")
    }
  }

  return (
    <Card className="max-w-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Add New Employee</CardTitle>
        <Button
          variant="outline"
          onClick={() => close(["modal"])}
        >
          <X />
        </Button>
      </CardHeader>

      <CardContent>
        <form
          id="employee-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>

            {/* Employee ID */}
            <Controller
              name="e_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Employee ID</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Name */}
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

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="employee-form"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Employee"}
        </Button>
      </CardFooter>
    </Card>
  )
}
