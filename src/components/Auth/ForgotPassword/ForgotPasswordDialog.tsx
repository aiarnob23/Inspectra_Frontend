"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router"

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
import { useForgotPasswordMutation } from "@/features/auth/authApi"
import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from "@/lib/schemas/authSchema"


export default function ForgotPasswordDialog() {
    const { close } = useModal()
    const navigate = useNavigate()
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: ForgotPasswordFormValues) {
        try {
            const res = await forgotPassword({
                email: values.email,
            }).unwrap()

            toast.success(res.message)

            form.reset()
            close(["modal"])

            // Navigate to OTP verification page
            navigate(`/?modal=verify-reset-otp&email=${values.email}`)

        } catch (error: any) {
            toast.error(
                error?.data?.message || "Failed to send reset code"
            )
        }
    }

    return (
        <Card className="w-full max-w-md bg-background">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    id="forgot-password-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FieldGroup>
                        <Field data-invalid={!!form.formState.errors.email}>
                            <FieldLabel>Email</FieldLabel>

                            <Input
                                type="email"
                                placeholder="Enter your email"
                                {...form.register("email")}
                            />

                            {form.formState.errors.email && (
                                <FieldError
                                    errors={[form.formState.errors.email]}
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
                    form="forgot-password-form"
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Code"}
                </Button>
            </CardFooter>
        </Card>
    )
}