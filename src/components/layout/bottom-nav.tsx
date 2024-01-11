"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Home, User, FolderGit2, Mail, type LucideIcon } from "lucide-react";
import { NAVIGATION, type NavLabel } from "@/lib/constants";
import { useLanguage } from "@/components/providers";
import type { TranslationKey } from "@/types";

const NAV_LABEL_KEY: Record<NavLabel, TranslationKey> = {
  Home: "navHome",
  About: "navAbout",
  Projects: "navProjects",
  Contact: "navContact",
};

const NAV_ICON: Record<NavLabel, LucideIcon> = {
  Home,
  About: User,
  Projects: FolderGit2,
  Contact: Mail,
};

const BottomNav = () => {
  const navigation = NAVIGATION;
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-auto px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center gap-5 rounded-2xl border border-border bg-background/80 px-5 py-3 shadow-2xl backdrop-blur-xl"
      >
        {(navigation || []).map((item) => {
          const Icon = NAV_ICON[item.label];
          const isActive = item.href === `#${activeSection}`;

          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "transition-all duration-300 transform flex flex-col items-center gap-1",
                isActive
                  ? "text-accent scale-125 drop-shadow-[0_0_8px_rgba(63,185,80,0.5)]"
                  : "text-muted-foreground hover:text-accent hover:scale-110",
              )}
              title={t(NAV_LABEL_KEY[item.label])}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const element = document.querySelector(item.href);
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default BottomNav;
