"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { X } from "lucide-react"
import axios from "axios"

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
import { PasswordInput } from "@/components/ui/password-input"

import useModal from "@/components/Modal/useModal"
import { authService } from "@/services/authService"
import { getApiErrorMessage } from "@/lib/api-error"

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/schemas/authSchema"

import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/store/slices/authSlice"
import { useNavigate } from "react-router"

export default function LoginFormDialog() {
  const { close } = useModal()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      const res = await authService.login(values)

      // set USER
      dispatch(
        setUser({
          id: res.user.id,
          email: res.user.email,
          firstName: res.user.firstName ?? "",
          lastName: res.user.lastName ?? "",
          role: res.user.role,
          status: res.user.status,
        })
      )

      toast.success("Login successful 🎉")
      form.reset()
      close(["modal"])
      navigate("/dashboard/overview", { replace: true })

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = getApiErrorMessage(error)

        // Invalid credentials
        if (status === 401) {
          toast.error("Invalid email or password")
          return
        }

        // Email not verified
        if (status === 403 && error.response?.data?.requiresVerification) {
          toast.error("Please verify your email first")
          return
        }

        // Validation error
        if (status === 400) {
          toast.error(message)
          return
        }
      }

      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <Card className="w-full max-w-md bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Login</CardTitle>

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
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
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

        <Button type="submit" form="login-form">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}
