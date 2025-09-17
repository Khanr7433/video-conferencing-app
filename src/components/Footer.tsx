import React from "react";
import Link from "next/link";
import {
    Video,
    Mail,
    Phone,
    MapPin,
    Github,
    Twitter,
    Linkedin,
    Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/meetings", label: "Meetings" },
            { href: "/recordings", label: "Recordings" },
        ],
        company: [
            { href: "/about", label: "About Us" },
            { href: "/careers", label: "Careers" },
            { href: "/blog", label: "Blog" },
            { href: "/contact", label: "Contact" },
        ],
        support: [
            { href: "/help", label: "Help Center" },
            { href: "/documentation", label: "Documentation" },
            { href: "/api", label: "API" },
            { href: "/status", label: "Status" },
        ],
        legal: [
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
            { href: "/cookies", label: "Cookie Policy" },
            { href: "/licenses", label: "Licenses" },
        ],
    };

    const socialLinks = [
        { href: "https://github.com", icon: Github, label: "GitHub" },
        { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
        { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
        { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
    ];

    const contactInfo = [
        {
            icon: Mail,
            text: "contact@videoconf.com",
            href: "mailto:contact@videoconf.com",
        },
        { icon: Phone, text: "+91 555-123-4567", href: "tel:+915551234567" },
        { icon: MapPin, text: "123 Video Street, Pune, MH 411048" },
    ];

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 mb-4"
                            >
                                <Video className="h-6 w-6 text-primary" />
                                <span className="text-xl font-bold">
                                    VideoConf
                                </span>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                                The ultimate video conferencing solution for
                                teams and businesses. Connect, collaborate, and
                                communicate seamlessly from anywhere in the
                                world.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-2">
                                {socialLinks.map((social) => (
                                    <Button
                                        key={social.label}
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                        className="h-8 w-8"
                                    >
                                        <Link
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Product Links */}
                        <div>
                            <h3 className="text-sm font-semibold mb-4">
                                Product
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.product.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h3 className="text-sm font-semibold mb-4">
                                Company
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h3 className="text-sm font-semibold mb-4">
                                Support
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.support.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-sm font-semibold mb-4">
                                Contact
                            </h3>
                            <ul className="space-y-2">
                                {contactInfo.map((contact, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start space-x-2"
                                    >
                                        <contact.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        {contact.href ? (
                                            <Link
                                                href={contact.href}
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {contact.text}
                                            </Link>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                {contact.text}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Bottom Footer */}
                <div className="py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="text-sm text-muted-foreground">
                            © {currentYear} VideoConf. All rights reserved.
                        </div>

                        <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
