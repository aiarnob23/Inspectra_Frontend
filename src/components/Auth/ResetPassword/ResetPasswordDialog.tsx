"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate, useSearchParams } from "react-router"

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
import { useResetPasswordMutation } from "@/features/auth/authApi"
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/schemas/authSchema"

export default function ResetPasswordModal() {
  const navigate = useNavigate()
  const { close } = useModal()

  const [searchParams] = useSearchParams()
  const email = searchParams.get("email") as string

  const [resetPassword, { isLoading }] =
    useResetPasswordMutation()

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email || "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  // Guard: if no email → redirect
  if (!email) {
    navigate("/?modal=forgot-password")
    return null
  }

  async function onSubmit(values: ResetPasswordFormValues) {
    try {
      const res = await resetPassword({
        email,
        newPassword: values.newPassword,
      }).unwrap()

      toast.success(res.message)

      form.reset()
      close(["modal"])

      navigate("/?modal=login")

    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to reset password"
      )
    }
  }

  return (
    <Card className="w-full max-w-md bg-background">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            {/* New Password */}
            <Field data-invalid={!!form.formState.errors.newPassword}>
              <FieldLabel>New Password</FieldLabel>

              <Input
                type="password"
                placeholder="Enter new password"
                {...form.register("newPassword")}
              />

              {form.formState.errors.newPassword && (
                <FieldError
                  errors={[form.formState.errors.newPassword]}
                />
              )}
            </Field>

            {/* Confirm Password */}
            <Field data-invalid={!!form.formState.errors.confirmNewPassword}>
              <FieldLabel>Confirm Password</FieldLabel>

              <Input
                type="password"
                placeholder="Confirm new password"
                {...form.register("confirmNewPassword")}
              />

              {form.formState.errors.confirmNewPassword && (
                <FieldError
                  errors={[form.formState.errors.confirmNewPassword]}
                />
              )}
            </Field>
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
          form="reset-password-form"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </CardFooter>
    </Card>
  )
}