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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import useModal from "@/components/Modal/useModal"
import { useVerifyEmailMutation } from "@/features/auth/authApi"
import { otpSchema, type OTPFormValues } from "@/lib/schemas/authSchema"
import { useAppSelector } from "@/store/hooks"
import { useDispatch } from "react-redux"
import { setUser } from "@/features/auth/authSlice"
import { useNavigate } from "react-router"

export default function OTPVerifyDialog() {
  const { close } = useModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [verifyEmail] = useVerifyEmailMutation()

  const email = useAppSelector((s) => s.authFlow.pendingEmail);

  // React Hook Form setup with Zod validation
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  })
  /**
   * Handles OTP submission and email verification
   */
  async function onSubmit(values: OTPFormValues) {
    if (!email) {
      toast.error("Email not found")
      return
    }

    try {
      const res = await verifyEmail({
        email,
        code: values.code,
      }).unwrap()

      dispatch(setUser(res.user))

      toast.success("Email verified 🎉")
      form.reset()
      close(["modal"])
      navigate("/dashboard/overview", { replace: true })

    } catch (error: any) {
      if (error?.status === 400) {
        form.setError("code", {
          type: "manual",
          message: "Invalid OTP",
        })
        return
      }

      toast.error("Verification failed")
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
