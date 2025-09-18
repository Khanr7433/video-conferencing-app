import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Video Conferencing App",
    description: "A video conferencing app built with Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar />
                {children}
                <Footer />
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Default options for all toasts
                        className: "",
                        duration: 4000,
                        style: {
                            background: "hsl(var(--background))",
                            color: "hsl(var(--foreground))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "calc(var(--radius) - 2px)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                        },
                        // Success toast styling
                        success: {
                            duration: 4000,
                            style: {
                                background: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                border: "1px solid hsl(var(--primary))",
                            },
                            iconTheme: {
                                primary: "hsl(var(--primary))",
                                secondary: "hsl(var(--primary-foreground))",
                            },
                        },
                        // Error toast styling
                        error: {
                            duration: 5000,
                            style: {
                                background: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                border: "1px solid hsl(var(--destructive))",
                            },
                            iconTheme: {
                                primary: "hsl(var(--destructive))",
                                secondary: "hsl(var(--destructive-foreground))",
                            },
                        },
                        // Loading toast styling
                        loading: {
                            duration: Infinity,
                            style: {
                                background: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                border: "1px solid hsl(var(--border))",
                            },
                        },
                    }}
                />
            </body>
        </html>
    );
}
