"use client";

import { motion } from "motion/react";

export const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
            <div className="relative flex flex-col items-center">
                {/* Name and Dot */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight flex items-baseline gap-1">
                        Tahmid
                        <motion.span
                            animate={{
                                opacity: [1, 0.5, 1],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-accent inline-block"
                        >
                            .
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Bolder Horizontal "Pending" Loader */}
                <div className="mt-8 w-48 h-1.5 bg-accent/10 rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-accent rounded-full"
                        animate={{
                            width: ["0%", "100%", "100%"],
                            left: ["0%", "0%", "100%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.6, 1]
                        }}
                    />
                </div>

            </div>

            {/* Premium Decorative Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px]" />
            </div>
        </div>
    );
};

export default Loading;
