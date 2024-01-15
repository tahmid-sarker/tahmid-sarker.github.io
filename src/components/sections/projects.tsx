"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Code, FolderCheck, FolderGit2, Lock, Mail, Globe } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/carousel";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { useLanguage } from "@/components/providers";
import type { Project, ProjectBadge, TranslationKey } from "@/types";

interface AnimatedProjectImageProps {
  images: string[];
  title: string;
}

const AnimatedProjectImage = ({ images, title }: AnimatedProjectImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const currentImage = images && images.length > 0 ? images[currentIndex] : null;

  if (!currentImage) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <FolderGit2 className="w-16 h-16 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Image
          src={asset(currentImage)}
          alt={`${title} - View ${currentIndex + 1}`}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    </AnimatePresence>
  );
};

const badgeLabelKey: Record<ProjectBadge, TranslationKey> = {
  Local: "badgeLocal",
  Internal: "badgeInternal",
  International: "badgeInternational",
  Showcase: "badgeShowcase",
};

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const { t, loc, locLink } = useLanguage();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleContactForProject = (projectTitle: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const subjectInput = document.getElementById("subject");
        if (subjectInput instanceof HTMLInputElement) {
          subjectInput.value = `${t("collaborationInquiry")}: ${projectTitle}`;
          const event = new Event("input", { bubbles: true });
          subjectInput.dispatchEvent(event);
        }
      }, 800);
    }
  };

  const isValidUrl = (url: string | undefined): url is string => {
    return Boolean(url && url.trim() !== "");
  };

  return (
    <section id="projects" className="relative flex min-h-0 flex-col justify-start overflow-hidden pt-16 md:min-h-[70vh] md:pt-20">
      <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-screen-2xl mx-auto px-2 xs:px-4 sm:px-6 md:px-24 relative z-10 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-2 md:mb-4 px-2 xs:px-4 w-full max-w-[95vw] sm:max-w-[90vw] mx-auto"
        >
          <Badge variant="outline" className="md:mt-4 mb-2 sm:mb-3 border-accent/50 text-accent text-xs sm:text-sm">
            <FolderGit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
            {t("portfolioBadge")}
          </Badge>
          <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold mb-2 font-heading text-balance wrap-break-word">
            {t("projectsTitleBefore")} <span className="gradient-text">{t("projectsTitleAccent")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-1 xs:px-2 sm:px-4 md:px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full relative"
          >
            <div className="hidden md:flex justify-end gap-3 mb-4 mr-6">
              <CarouselPrevious className="relative static translate-y-0 h-9 w-9 shadow-lg transition-all duration-300" />
              <CarouselNext className="relative static translate-y-0 h-9 w-9 shadow-lg transition-all duration-300" />
            </div>

            <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-6 items-stretch" viewportClassName="py-5">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="basis-full sm:basis-full md:basis-1/2 lg:basis-1/3 flex pl-3 sm:pl-4 md:pl-6">
                  <motion.div
                    layout
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="w-full flex-1 flex flex-col"
                  >
                    <Card className="bg-card/70 backdrop-blur-md border-border overflow-hidden w-full h-full flex-1 flex flex-col shadow-[0_0_20px_rgba(63,185,80,0.12)] ring-1 ring-white/10 group card-hover text-center rounded-lg p-0 gap-0">
                      <div className="relative aspect-video overflow-hidden bg-background shrink-0">
                        <AnimatedProjectImage
                          images={project.images}
                          title={project.title}
                        />

                        <div className="absolute top-2 right-2 z-10 flex gap-1.5">
                          {project.badge && (
                            <Badge className={`border-0 text-[9px] px-2 py-0.5 ${project.badge === "International"
                              ? "bg-blue-500/90 text-white"
                              : project.badge === "Local"
                                ? "bg-purple-500/90 text-white"
                                : project.badge === "Showcase"
                                  ? "bg-cyan-500/90 text-white"
                                  : project.badge === "Internal"
                                    ? "bg-amber-500/90 text-white"
                                    : "bg-accent/90 text-white"
                              }`}>
                              {project.badge === "Showcase" ? (
                                <FolderCheck className="w-2.5 h-2.5 mr-1" />
                              ) : project.badge === "Internal" ? (
                                <Lock className="w-2.5 h-2.5 mr-1" />
                              ) : (
                                <Globe className="w-2.5 h-2.5 mr-1" />
                              )}
                              {t(badgeLabelKey[project.badge] ?? "badgeShowcase")}
                            </Badge>
                          )}
                        </div>

                        {project.images && project.images.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {project.images.map((_, idx) => (
                              <div
                                key={idx}
                                className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"
                              />
                            ))}
                          </div>
                        )}

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: hoveredId === project.id ? 1 : 0,
                          }}
                          className="absolute inset-0 bg-primary/20 transition-opacity duration-300"
                        />
                      </div>

                      <CardContent className="p-2 xs:p-3 sm:p-4 flex flex-col flex-1 items-center">
                        <div className="flex flex-col items-center gap-1.5 sm:gap-2 mb-2 w-full">
                          <h3 className="text-sm sm:text-base md:text-lg font-bold font-heading text-foreground group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground text-[10px] xs:text-[11px] sm:text-xs line-clamp-2 mb-3 sm:mb-4 max-w-[95%] sm:max-w-[90%] mx-auto">
                          {loc("projects", project, "description")}
                        </p>

                        <div className="mt-auto flex flex-col gap-2 w-full max-w-[220px] mx-auto">
                          {project.badge === "Internal" ? (
                            <>
                              <div className="flex items-center justify-center gap-2 py-1.5 px-3 bg-muted/50 rounded-lg border border-border/50">
                                <Lock className="w-3 h-3 text-amber-500" />
                                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                  {t("availableInternally")}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleContactForProject(project.title)}
                                className="w-full bg-accent text-accent-foreground h-8 hover:bg-accent/90 hover:shadow-[0_0_15px_rgba(63,185,80,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                              >
                                <Mail className="w-3 h-3 mr-1.5" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{t("contactForCollab")}</span>
                              </Button>
                            </>
                          ) : project.liveUrls && project.liveUrls.length > 0 ? (
                            <>
                              <div className="flex gap-1.5 justify-center flex-wrap">
                                {project.liveUrls.map((urlObj, idx) => (
                                  <Button
                                    key={idx}
                                    asChild
                                    size="sm"
                                    className={`flex-1 min-w-[70px] h-8 hover:scale-105 active:scale-95 transition-all duration-300 ${idx === 0
                                      ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_15px_rgba(63,185,80,0.3)]"
                                      : "bg-amber-500 text-white hover:bg-amber-600 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                                      }`}
                                  >
                                    <Link
                                      href={urlObj.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-1"
                                    >
                                      <span className="text-[9px] font-bold uppercase tracking-wider">{locLink(urlObj.label)}</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </Link>
                                  </Button>
                                ))}
                              </div>
                              {isValidUrl(project.sourceUrl) && (
                                <Button
                                  asChild
                                  size="sm"
                                  variant="outline"
                                  className="border-accent/40 text-accent h-7 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[0_0_15px_rgba(63,185,80,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                  <Link
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                  >
                                    <span className="text-[9px] font-bold uppercase tracking-wider">{t("source")}</span>
                                    <Code className="w-2.5 h-2.5" />
                                  </Link>
                                </Button>
                              )}
                            </>
                          ) : (
                            <div className="flex gap-2 justify-center">
                              {isValidUrl(project.liveUrl) ? (
                                <Button
                                  asChild
                                  size="sm"
                                  className="flex-1 bg-accent text-accent-foreground h-8 hover:bg-accent/90 hover:shadow-[0_0_15px_rgba(63,185,80,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                  <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                  >
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{t("live")}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </Link>
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  disabled
                                  className="flex-1 bg-muted text-muted-foreground h-8 cursor-not-allowed opacity-60"
                                >
                                  <span className="text-[9px] font-medium uppercase tracking-wider">{t("liveNa")}</span>
                                </Button>
                              )}

                              {isValidUrl(project.sourceUrl) ? (
                                <Button
                                  asChild
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 border-accent/40 text-accent h-8 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[0_0_15px_rgba(63,185,80,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                  <Link
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                  >
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{t("source")}</span>
                                    <Code className="w-3 h-3" />
                                  </Link>
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled
                                  className="flex-1 border-border text-muted-foreground h-8 cursor-not-allowed opacity-60"
                                >
                                  <span className="text-[9px] font-medium uppercase tracking-wider">{t("sourceNa")}</span>
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 mb-6 flex justify-center gap-3 md:hidden">
              <CarouselPrevious className="static h-8 w-8 sm:h-9 sm:w-9" />
              <CarouselNext className="static h-8 w-8 sm:h-9 sm:w-9" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
