"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { EmblaCarouselType } from "embla-carousel";
import { Button } from "@/components/shared/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shared/carousel";
import { getSocialIcon } from "@/components/shared/site-icons";
import { asset } from "@/lib/asset";
import { useLanguage } from "@/components/providers";
import type { Personal, SocialLink } from "@/types";

interface HeroLink extends SocialLink {
  type: "link" | "email";
}

interface HeroSectionProps {
  personal: Personal;
  links: SocialLink[];
}

const HeroSection = ({ personal, links }: HeroSectionProps) => {
  const { t, locPersonal } = useLanguage();
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [api, setApi] = useState<EmblaCarouselType | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollUp(api.canScrollPrev());
      setCanScrollDown(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);
    api.on("scroll", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
      api.off("scroll", updateScrollState);
    };
  }, [api]);

  const allLinks: HeroLink[] = (links || []).map((link) => ({
    ...link,
    type: "link",
  }));

  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-8 md:flex md:min-h-screen md:items-center md:pt-4 md:pb-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(63, 185, 80, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(63, 185, 80, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-36 w-full h-full relative z-10 flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full lg:w-fit h-auto min-h-[280px] sm:min-h-[320px] md:min-h-[340px] lg:h-[400px] lg:justify-center p-4 sm:p-6 md:p-10 -mt-6 sm:-mt-4 lg:mt-0"
          >
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-2 sm:mb-4">
              <span className="gradient-text whitespace-nowrap">{personal.shortName}</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground mb-2 sm:mb-4">
              {locPersonal(personal, "title")}
            </p>

            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground max-w-[280px] xs:max-w-sm sm:max-w-md lg:max-w-xl mb-2 sm:mb-4 leading-relaxed mx-auto lg:mx-0">
              {locPersonal(personal, "tagline")}
            </p>

            <div className="flex flex-row gap-2 xs:gap-2 sm:gap-4 w-full max-w-[320px] sm:max-w-none sm:w-auto justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-initial sm:w-auto">
                <Button
                  onClick={scrollToAbout}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-accent/40 text-accent font-accent font-medium px-4 xs:px-6 sm:px-8 text-xs xs:text-sm sm:text-base rounded-xl transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[0_0_20px_rgba(63,185,80,0.3)]"
                >
                  {t("aboutMe")}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="flex-1 w-full flex items-center justify-center lg:items-start lg:justify-start">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="relative w-full flex items-center justify-center lg:items-start lg:justify-between gap-1 xs:gap-2 sm:gap-4"
            >
              <div className="shrink-0 w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-lg overflow-hidden bg-card">
                <img
                  src={asset(personal.avatar)}
                  alt={personal.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              <div className="md:hidden flex flex-col items-center gap-1 z-20 -mt-4 sm:-mt-8">
                <button
                  onClick={() => api?.scrollPrev()}
                  disabled={!canScrollUp}
                  className={`p-1 rounded-full bg-accent text-accent-foreground shadow-lg z-30 mb-1 transition-all duration-300 border-none ${!canScrollUp ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible hover:scale-110 hover:shadow-accent/40 active:scale-95"}`}
                  aria-label="Scroll Up"
                >
                  <ChevronUp className="w-3 h-3 xs:w-4 xs:h-4" />
                </button>

                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    dragFree: true,
                  }}
                  orientation="vertical"
                  className="w-8 xs:w-10 h-[200px] xs:h-[240px] sm:h-[280px]"
                >
                  <CarouselContent className="h-[200px] xs:h-[240px] sm:h-[280px] -mt-2 pt-0">
                    {allLinks.map((link, index) => {
                      const Icon = getSocialIcon(link.name);
                      return (
                        <CarouselItem key={link.id} className="basis-1/5 flex justify-center items-center">
                          <motion.a
                            href={link.url}
                            target={link.type === "email" ? undefined : "_blank"}
                            rel={link.type === "email" ? undefined : "noopener noreferrer"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                            className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 bg-background/50 backdrop-blur-md w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full border border-border/50 shadow-sm shrink-0 flex items-center justify-center cursor-pointer"
                            title={link.name}
                          >
                            <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 pointer-events-none" />
                          </motion.a>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>

                <button
                  onClick={() => api?.scrollNext()}
                  disabled={!canScrollDown}
                  className={`p-1 rounded-full bg-accent text-accent-foreground shadow-lg z-30 mt-1 transition-all duration-300 border-none ${!canScrollDown ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible hover:scale-110 hover:shadow-accent/40 active:scale-95"}`}
                  aria-label="Scroll Down"
                >
                  <ChevronDown className="w-3 h-3 xs:w-4 xs:h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
