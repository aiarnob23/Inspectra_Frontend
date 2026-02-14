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
import { PasswordInput } from "@/components/ui/password-input"

import useModal from "@/components/Modal/useModal"
import { useResetPasswordMutation } from "@/features/auth/authApi"
import {
    resetPasswordSchema,
    type ResetPasswordFormValues,
} from "@/lib/schemas/authSchema"

export default function ResetPasswordDialog() {
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

    // Guard
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
                        <Controller
                            name="newPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>New Password</FieldLabel>
                                    <PasswordInput {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Confirm Password */}
                        <Controller
                            name="confirmNewPassword"
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