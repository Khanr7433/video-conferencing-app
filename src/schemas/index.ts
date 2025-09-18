export * from "./auth";

export type {
    RegisterFormData,
    LoginFormData,
    ForgotPasswordFormData,
    ResetPasswordFormData,
    ChangePasswordFormData,
    TwoFactorFormData,
} from "./auth";

// Re-export commonly used schemas for convenience
import { registerSchema, loginSchema, forgotPasswordSchema } from "./auth";

// Commonly used schemas grouped for easy access
export const authSchemas = {
    register: registerSchema,
    login: loginSchema,
    forgotPassword: forgotPasswordSchema,
};
