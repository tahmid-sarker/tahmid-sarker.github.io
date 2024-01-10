"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/shared/button";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center relative z-10 px-4"
            >
                {/* 404 Text */}
                <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="text-8xl md:text-9xl font-bold font-heading gradient-text mb-4"
                >
                    404
                </motion.h1>

                <h2 className="text-2xl md:text-3xl font-semibold font-heading text-foreground mb-4">
                    Page Not Found
                </h2>

                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            asChild
                            className="bg-accent hover:bg-accent-hover text-primary-foreground font-accent"
                        >
                            <Link href="/">
                                <Home className="w-4 h-4 mr-2" />
                                Go Home
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="border-border hover:border-accent hover:text-accent font-accent"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
