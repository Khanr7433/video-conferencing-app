"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterFormData } from "@/schemas";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/api/client";
import { AxiosError } from "axios";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        const loadingToast = toast.loading("Creating your account...");

        try {
            const registrationData = {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            };

            await apiClient.post("/api/user/register", registrationData);

            toast.success(
                "Account created successfully! Welcome to VideoConf!",
                { id: loadingToast }
            );

            form.reset();

            setTimeout(() => {
                router.push("/user/login");
            }, 2000);
        } catch (error: unknown) {
            console.log("Registration error:", error);

            if (error instanceof AxiosError) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    error.message ||
                    "Registration failed. Please try again later.";

                toast.error(errorMessage, {
                    id: loadingToast,
                });
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    id: loadingToast,
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-6 p-6">
                <div className="space-y-2 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2"
                    >
                        <Video className="text-primary h-8 w-8" />
                        <span className="text-2xl font-bold">VideoConf</span>
                    </Link>
                    <h1 className="text-2xl font-semibold">
                        Create your account
                    </h1>
                    <p className="text-muted-foreground">
                        Join thousands of users connecting through video
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            placeholder="John"
                            {...form.register("fullName")}
                            className={
                                form.formState.errors.fullName
                                    ? "border-destructive"
                                    : ""
                            }
                        />
                        {form.formState.errors.fullName && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.fullName.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...form.register("email")}
                            className={
                                form.formState.errors.email
                                    ? "border-destructive"
                                    : ""
                            }
                        />
                        {form.formState.errors.email && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                {...form.register("password")}
                                className={
                                    form.formState.errors.password
                                        ? "border-destructive pr-10"
                                        : "pr-10"
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                {...form.register("confirmPassword")}
                                className={
                                    form.formState.errors.confirmPassword
                                        ? "border-destructive pr-10"
                                        : "pr-10"
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {form.formState.errors.confirmPassword && (
                            <p className="text-destructive text-sm">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            {...form.register("terms")}
                            className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <Link
                                href="/terms"
                                className="text-primary hover:underline"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="text-primary hover:underline"
                            >
                                Privacy Policy
                            </Link>
                        </Label>
                    </div>
                    {form.formState.errors.terms && (
                        <p className="text-destructive text-sm">
                            {form.formState.errors.terms.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/user/login"
                            className="text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
