"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { X } from "lucide-react"

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

import useModal from "@/components/Modal/useModal"
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/schemas/authSchema";
import { PasswordInput } from "@/components/ui/password-input"
import { authService } from "@/services/authService"
import axios from "axios"
import { getApiErrorMessage } from "@/lib/api-error"
import { useAppDispatch } from "@/store/hooks"
import { setPendingEmail } from "@/store/slices/authFlowSlice"
import { useNavigate } from "react-router"

export default function RegisterFormDialog() {
  const { close } = useModal()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    try {
      console.log(values)
      const res = await authService.register({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phone
      })

      if(res?.success){
        toast.success("Account created successfully")
        dispatch(setPendingEmail(values.email))
        form.reset()
        close(["modal"])
        navigate("/?modal=verify-otp" , {replace:true})
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        console.log(error.response?.status)
        const status = error.response?.status
        const message = getApiErrorMessage(error)

        // Business conflict (user already exists)
        if (status === 409) {
          toast.error("Conflict! User already exists")
          return;
        }

        // Validation error
        if (status === 400) {
          toast.error(message || "Invalid input")
          return;
        }

        // Unauthorized / forbidden
        if (status === 401 || status === 403) {
          toast.error("You are not authorized")
          return;
        }
      }
      // Fallback (unexpected error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-lg bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Create Account</CardTitle>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => close(["modal"])}
        >
          <X />
        </Button>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* First Name */}
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>First Name</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input {...field} />
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
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input
                    {...field}
                    placeholder="+8801XXXXXXXXX"
                    inputMode="numeric"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <PasswordInput {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <PasswordInput {...field} />
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

        <Button type="submit" form="register-form">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}
