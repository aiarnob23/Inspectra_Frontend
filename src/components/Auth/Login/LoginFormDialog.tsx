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
import { PasswordInput } from "@/components/ui/password-input"

import useModal from "@/components/Modal/useModal"
import { useLoginMutation } from "@/features/auth/authApi"

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/schemas/authSchema"

import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/features/auth/authSlice"
import { useNavigate } from "react-router"
import OpenModal from "@/components/Modal/openModal"

export default function LoginFormDialog() {
  const { close } = useModal()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loginUser, { isLoading }] = useLoginMutation()


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      const res = await loginUser(values).unwrap()
      dispatch(setUser(res.user))

      toast.success("Login successful 🎉")
      form.reset()
      close(["modal"])
      navigate("/dashboard/overview", { replace: true })

    } catch (error: any) {
      const status = error?.status

      if (status === 401) {
        toast.error("Invalid credentials")
        return
      }

      if (status === 403) {
        toast.error("Please verify your email first")
        return
      }

      toast.error("Something went wrong")
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

      <CardFooter className="flex justify-between items-center">

        <OpenModal
          modals={[
            { modalId: "modal", openId: "forgot-password" }
          ]}
        >
          <Button variant={'secondary'} className="text-sm border-2 px-2 py-1 rounded-lg text-muted-foreground">
            Forgot Password
          </Button>
        </OpenModal>

        <div className="flex gap-2 justify-end">
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
        </div>
      </CardFooter>
    </Card>
  )
}
