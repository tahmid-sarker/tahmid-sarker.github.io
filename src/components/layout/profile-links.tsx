"use client";

import { motion } from "motion/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shared/carousel";
import { getSocialIcon } from "@/components/shared/site-icons";
import type { SocialLink } from "@/types";

interface ProfileLink extends SocialLink {
  type: "link" | "email";
}

interface ProfileLinksProps {
  links: SocialLink[];
}

const ProfileLinks = ({ links }: ProfileLinksProps) => {
  const [api, setApi] = useState<EmblaCarouselType | null>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const allLinks: ProfileLink[] = (links || []).map((link) => ({
    ...link,
    type: "link",
  }));

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

  return (
    <div className="hidden md:flex fixed right-1 md:right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3">
      <button
        onClick={() => api?.scrollPrev()}
        className={cn(
          "p-1 md:p-1.5 rounded-full shadow-lg z-30 mb-1 transition-all duration-300 border-none",
          canScrollUp
            ? "bg-accent text-white hover:scale-110 hover:shadow-accent/40 active:scale-95 cursor-pointer opacity-100"
            : "opacity-0 pointer-events-none",
        )}
        disabled={!canScrollUp}
      >
        <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        orientation="vertical"
        className="w-8 md:w-10 h-[400px]"
      >
        <CarouselContent className="h-[400px] -mt-2 pt-0 text-center">
          {allLinks.map((link, index) => {
            const Icon = getSocialIcon(link.name);
            return (
              <CarouselItem key={link.id} className="basis-1/8 flex justify-center items-center">
                <motion.a
                  href={link.url}
                  target={link.type === "email" ? undefined : "_blank"}
                  rel={link.type === "email" ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110 bg-background/50 backdrop-blur-sm w-8 h-8 md:w-10 md:h-10 rounded-full border border-border/50 shadow-sm shrink-0 flex items-center justify-center cursor-pointer"
                  title={link.name}
                  draggable="false"
                  onDragStart={(e) => {
                    if ("preventDefault" in e && typeof e.preventDefault === "function") {
                      e.preventDefault();
                    }
                  }}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                </motion.a>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <button
        onClick={() => api?.scrollNext()}
        className={cn(
          "p-1 md:p-1.5 rounded-full shadow-lg z-30 mt-1 transition-all duration-300 border-none",
          canScrollDown
            ? "bg-accent text-white hover:scale-110 hover:shadow-accent/40 active:scale-95 cursor-pointer opacity-100"
            : "opacity-0 pointer-events-none",
        )}
        disabled={!canScrollDown}
      >
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default ProfileLinks;
