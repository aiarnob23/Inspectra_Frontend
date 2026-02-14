"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import { useVerifyResetPasswordOTPMutation } from "@/features/auth/authApi"
import {
    verifyResetOTPSchema,
    type VerifyResetOTPFormValues,
} from "@/lib/schemas/authSchema"

export default function VerifyResetOTPPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get("email") as string

    if (!email) {
        toast.error("Email not found. Please restart the flow.")
        navigate("/?modal=forgot-password")
        return null
    }


    const [verifyOTP, { isLoading }] =
        useVerifyResetPasswordOTPMutation()

    const form = useForm<VerifyResetOTPFormValues>({
        resolver: zodResolver(verifyResetOTPSchema),
        defaultValues: {
            email: email || "",
            code: "",
        },
    })

    async function onSubmit(values: VerifyResetOTPFormValues) {
        try {
            const res = await verifyOTP({
                email,
                code: values.code,
            }).unwrap()

            toast.success(res.message)

            navigate(`/?modal=reset-password&email=${email}`)

        } catch (error: any) {
            if (error?.status === 400) {
                form.setError("code", {
                    type: "manual",
                    message: "Invalid or expired OTP",
                })
                return
            }

            toast.error(
                error?.data?.message || "OTP verification failed"
            )
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md bg-background">
                <CardHeader>
                    <CardTitle>Verify Reset Code</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        id="verify-reset-otp-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FieldGroup>
                            <Controller
                                name="code"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Enter 6-digit OTP</FieldLabel>

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

                    <Button
                        type="submit"
                        form="verify-reset-otp-form"
                        disabled={isLoading}
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}