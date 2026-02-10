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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import useModal from "@/components/Modal/useModal"
import { authService } from "@/services/authService"
import { getApiErrorMessage } from "@/lib/api-error"
import { otpSchema, type OTPFormValues } from "@/lib/schemas/authSchema"

export default function OTPVerifyDialog() {
  const { close } = useModal()

  const email =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("email")
      : null

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  })

  async function onSubmit(values: OTPFormValues) {
    if (!email) {
      toast.error("Email not found. Please register again.")
      return
    }

    try {
      await authService.verifyEmail({
        email,
        code: Number(values.code),
      })

      toast.success("Email verified successfully 🎉")
      form.reset()
      close(["modal"])
    } catch (error) {
      const message = getApiErrorMessage(error)

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          form.setError("code", {
            type: "manual",
            message,
          })
          return
        }
      }

      toast.error(message)
    }
  }

  return (
    <Card className="w-full max-w-md bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Verify Email</CardTitle>

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
          id="otp-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Enter OTP</FieldLabel>

                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>

                    <InputOTPSeparator />

                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

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

        <Button type="submit" form="otp-form">
          Verify
        </Button>
      </CardFooter>
    </Card>
  )
}
