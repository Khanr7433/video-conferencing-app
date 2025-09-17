"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Video, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const user = {
        name: "Rashid Khan",
        email: "Khanr7433@gmail.com",
        avatar: "/avatars/01.png",
    };

    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "/meetings", label: "Meetings" },
        { href: "/recordings", label: "Recordings" },
        { href: "/about", label: "About" },
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/user/logout", {
                method: "POST",
            });
            if (response.ok) {
                setIsAuthenticated(false);
                // Redirect or refresh as needed
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Video className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">VideoConf</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>
                                                {user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                    forceMount
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/user/login">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/user/register">Sign up</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet
                            open={isMobileMenuOpen}
                            onOpenChange={setIsMobileMenuOpen}
                        >
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[400px]"
                            >
                                <SheetHeader>
                                    <SheetTitle>Navigation</SheetTitle>
                                    <SheetDescription>
                                        Access all features of VideoConf
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 flex flex-col space-y-4">
                                    {navigationLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-lg font-medium transition-colors hover:text-primary"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    ))}

                                    {isAuthenticated ? (
                                        <div className="mt-6 pt-6 border-t">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={user.avatar}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback>
                                                        {user.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <Button
                                                    variant="ghost"
                                                    className="justify-start"
                                                    asChild
                                                >
                                                    <Link href="/profile">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Profile
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="justify-start"
                                                    asChild
                                                >
                                                    <Link href="/settings">
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        Settings
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="justify-start text-destructive hover:text-destructive"
                                                    onClick={handleLogout}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Log out
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-6 pt-6 border-t flex flex-col space-y-2">
                                            <Button variant="outline" asChild>
                                                <Link href="/user/login">
                                                    Log in
                                                </Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href="/user/register">
                                                    Sign up
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
