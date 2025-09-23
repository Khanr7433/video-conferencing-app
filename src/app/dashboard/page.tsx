"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Video, Users, Calendar, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
    const handleLogout = () => {
        // Clear the token cookie and redirect
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    };

    return (
        <div className="bg-background min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back! Ready to start a video conference?
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>

                {/* Quick Actions */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Video className="text-primary h-8 w-8" />
                            <h3 className="text-lg font-semibold">
                                Start Meeting
                            </h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Start an instant video conference
                        </p>
                        <Button className="w-full">Start Now</Button>
                    </div>

                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Calendar className="text-primary h-8 w-8" />
                            <h3 className="text-lg font-semibold">
                                Schedule Meeting
                            </h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Plan a meeting for later
                        </p>
                        <Button variant="outline" className="w-full">
                            Schedule
                        </Button>
                    </div>

                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Users className="text-primary h-8 w-8" />
                            <h3 className="text-lg font-semibold">
                                Join Meeting
                            </h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Join an existing meeting
                        </p>
                        <Button variant="outline" className="w-full">
                            Join
                        </Button>
                    </div>

                    <div className="bg-card rounded-lg border p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Settings className="text-primary h-8 w-8" />
                            <h3 className="text-lg font-semibold">Settings</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Configure your preferences
                        </p>
                        <Button variant="outline" className="w-full">
                            Configure
                        </Button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-lg border p-6">
                    <h3 className="mb-4 text-xl font-semibold">
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b py-3 last:border-b-0">
                            <div>
                                <p className="font-medium">
                                    Welcome to VideoConf!
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    You have successfully logged in to your
                                    account.
                                </p>
                            </div>
                            <span className="text-muted-foreground text-sm">
                                Just now
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-muted-foreground">
                        Need help getting started?{" "}
                        <Link
                            href="/help"
                            className="text-primary hover:underline"
                        >
                            Check out our guide
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
