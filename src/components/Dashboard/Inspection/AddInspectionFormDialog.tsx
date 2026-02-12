"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useMemo } from "react"

import {
  inspectionSchema,
  type InspectionFormValues,
} from "@/lib/schemas/inspectionSchema"

import { useCreateInspectionMutation } from "@/features/inspection/inspectionApi"
import { useGetClientsQuery } from "@/features/clients/clientApi"
import { useGetAssetsQuery } from "@/features/asset/assetApi"
import { useGetEmployeesQuery } from "@/features/employee/employeeApi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"

import useModal from "@/components/Modal/useModal"

export function AddInspectionFormDialog() {
  const { close } = useModal()
  const [createInspection, { isLoading }] =
    useCreateInspectionMutation()

  const { data: clientData } =
    useGetClientsQuery({ page: 1, limit: 100 })

  const { data: assetData } =
    useGetAssetsQuery({ page: 1, limit: 100 })

  const { data: employeeData } =
    useGetEmployeesQuery({ page: 1, limit: 100 })

  const clients = clientData?.data ?? []
  const assets = assetData?.data ?? []
  const employees = employeeData?.data ?? []

  const form = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: {
      employeeIds: [],
    },
  })

  const selectedClientId = form.watch("clientId")

  const filteredAssets = useMemo(() => {
    return assets.filter(
      (a) => a.client?.id === selectedClientId
    )
  }, [assets, selectedClientId])

  const onSubmit = async (values: InspectionFormValues) => {
    try {
      await createInspection({
        ...values,
        scheduledAt: new Date(values.scheduledAt).toISOString(),
      }).unwrap()

      toast.success("Inspection scheduled")
      form.reset()
      close(["modal"])
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Failed to schedule inspection"
      )
    }
  }

  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        <CardTitle>Schedule Inspection</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="inspection-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* CLIENT */}
          <Controller
            name="clientId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Client</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* ASSET */}
          <Controller
            name="assetId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Asset</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredAssets.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* EMPLOYEES (MULTI SELECT STYLE) */}
          <Controller
            name="employeeIds"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Assign Employees</FieldLabel>

                <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-40 overflow-y-auto">
                  {employees.map((emp) => {
                    const checked =
                      field.value?.includes(emp.id)

                    return (
                      <label
                        key={emp.id}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            if (checked) {
                              field.onChange(
                                field.value.filter(
                                  (id) => id !== emp.id
                                )
                              )
                            } else {
                              field.onChange([
                                ...field.value,
                                emp.id,
                              ])
                            }
                          }}
                        />
                        {emp.name}
                      </label>
                    )
                  })}
                </div>

                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          {/* FREQUENCY */}
          <Controller
            name="frequency"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Frequency</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one_time">
                      One Time
                    </SelectItem>
                    <SelectItem value="weekly">
                      Weekly
                    </SelectItem>
                    <SelectItem value="monthly">
                      Monthly
                    </SelectItem>
                    <SelectItem value="quarterly">
                      Quarterly
                    </SelectItem>
                    <SelectItem value="yearly">
                      Yearly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* DATE */}
          <Controller
            name="scheduledAt"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Scheduled At</FieldLabel>
                <Input type="datetime-local" {...field} />
              </Field>
            )}
          />
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          form="inspection-form"
          disabled={isLoading}
        >
          {isLoading ? "Scheduling..." : "Schedule"}
        </Button>
      </CardFooter>
    </Card>
  )
}
