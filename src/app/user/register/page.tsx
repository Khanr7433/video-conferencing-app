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

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);

        // Create loading toast
        const loadingToast = toast.loading("Creating your account...");

        try {
            // Here you would make your API call
            const response = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle success
                toast.success(
                    "Account created successfully! Welcome to VideoConf!",
                    { id: loadingToast }
                );

                // Reset form
                form.reset();

                // Redirect to login page after a short delay
                setTimeout(() => {
                    router.push("/user/login");
                }, 2000);
            } else {
                // Handle different error scenarios
                const errorData = await response.json();

                if (response.status === 409) {
                    toast.error(
                        "This email is already registered. Please use a different email or try logging in.",
                        { id: loadingToast }
                    );
                } else if (response.status === 400) {
                    toast.error(
                        errorData.message ||
                            "Please check your information and try again.",
                        { id: loadingToast }
                    );
                } else {
                    toast.error(
                        "Registration failed. Please try again later.",
                        { id: loadingToast }
                    );
                }

                console.error("Registration failed:", errorData);
            }
        } catch (error) {
            toast.error(
                "Network error. Please check your connection and try again.",
                { id: loadingToast }
            );

            console.error("Registration error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-6 p-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2"
                    >
                        <Video className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">VideoConf</span>
                    </Link>
                    <h1 className="text-2xl font-semibold">
                        Create your account
                    </h1>
                    <p className="text-muted-foreground">
                        Join thousands of users connecting through video
                    </p>
                </div>

                {/* Registration Form */}
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                {...form.register("firstName")}
                                className={
                                    form.formState.errors.firstName
                                        ? "border-destructive"
                                        : ""
                                }
                            />
                            {form.formState.errors.firstName && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                {...form.register("lastName")}
                                className={
                                    form.formState.errors.lastName
                                        ? "border-destructive"
                                        : ""
                                }
                            />
                            {form.formState.errors.lastName && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
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
                            <p className="text-sm text-destructive">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
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
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                            <p className="text-sm text-destructive">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
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
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                            <p className="text-sm text-destructive">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            {...form.register("terms")}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
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
                        <p className="text-sm text-destructive">
                            {form.formState.errors.terms.message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
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
