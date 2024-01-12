"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme, useLanguage } from "@/components/providers";

import { cn } from "@/lib/utils";
import { NAVIGATION, type NavHref, type NavLabel } from "@/lib/constants";
import { asset } from "@/lib/asset";
import type { TranslationKey } from "@/types";

const switchTrackClass =
  "relative flex h-8 shrink-0 items-center rounded-full border border-accent/50 bg-background p-0.5 transition-colors duration-300";

const NAV_LABEL_KEY: Record<NavLabel, TranslationKey> = {
  Home: "navHome",
  About: "navAbout",
  Projects: "navProjects",
  Contact: "navContact",
};

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? t("switchToLight") : t("switchToDark")}
      onClick={toggleTheme}
      className={cn(switchTrackClass, "w-14", isDark ? "justify-end" : "justify-start")}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className="h-3.5 w-3.5 text-yellow-400" strokeWidth={2} />
        <Moon className="h-3.5 w-3.5 text-slate-500" strokeWidth={2} />
      </span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-accent"
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-slate-700" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-yellow-400" strokeWidth={2} />
        )}
      </motion.span>
    </button>
  );
};

const LanguageSwitch = () => {
  const { lang, toggleLang, t } = useLanguage();
  const isBangla = lang === "bn";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isBangla}
      aria-label={isBangla ? t("switchToEnglish") : t("switchToBangla")}
      onClick={toggleLang}
      className={cn(switchTrackClass, "w-[4.25rem]", isBangla ? "justify-end" : "justify-start")}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5 text-[10px] font-medium text-accent">
        <span>EN</span>
        <span>বাং</span>
      </span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="relative z-10 flex h-6 min-w-7 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground"
      >
        {isBangla ? "বাং" : "EN"}
      </motion.span>
    </button>
  );
};

const Navbar = () => {
  const navigation = NAVIGATION;
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((sectionsItem) => {
        const element = document.getElementById(sectionsItem);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: NavHref | "#home") => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-background/80 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent backdrop-blur-[2px]",
      )}
    >
      <nav className="relative mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:h-20 md:px-24">
        <Link
          href="#home"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="group z-50 flex cursor-pointer items-center gap-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="relative h-8 w-28 md:h-10 md:w-36">
              <Image
                src={asset("images/signature.png")}
                alt="Signature"
                fill
                className="object-contain signature-color"
                priority
              />
            </div>
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={cn(
                "cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeSection === item.href.replace("#", "")
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {t(NAV_LABEL_KEY[item.label])}
            </a>
          ))}
        </div>

        <div className="z-50 flex items-center gap-2">
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
