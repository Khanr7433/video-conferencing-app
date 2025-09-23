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
import { loginSchema, type LoginFormData } from "@/schemas";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/api/client";
import { AxiosError } from "axios";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);

        const loadingToast = toast.loading("Signing you in...");

        try {
            const loginData = {
                email: data.email,
                password: data.password,
            };

            await apiClient.post("/api/user/login", loginData);

            toast.success(
                "Welcome back! You have been logged in successfully.",
                { id: loadingToast }
            );

            // Reset form
            form.reset();

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } catch (error: unknown) {
            console.log("Login error:", error);

            if (error instanceof AxiosError) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    error.message ||
                    "Login failed. Please try again.";

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
                    <h1 className="text-2xl font-semibold">Welcome back</h1>
                    <p className="text-muted-foreground">
                        Sign in to your account to continue
                    </p>
                </div>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/user/forgot-password"
                                className="text-primary text-sm hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
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

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            {...form.register("rememberMe")}
                            className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="rememberMe" className="text-sm">
                            Remember me for 30 days
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/user/register"
                            className="text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
