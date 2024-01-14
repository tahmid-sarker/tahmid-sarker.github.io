"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  Award,
  BookOpen,
  ExternalLink,
  User,
  GraduationCap,
  Briefcase,
  Users,
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/shared/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/tabs";
import { Badge } from "@/components/shared/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/carousel";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers";
import type {
  Affiliation,
  Certification,
  Course,
  Education,
  Experience,
  Personal,
  SkillCategory,
  SkillCategoryKey,
  Skills,
} from "@/types";

const tabTriggerClass =
  "rounded-lg sm:rounded-xl data-[state=active]:bg-accent data-[state=active]:text-primary-foreground font-semibold flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 transition-all duration-300 text-[10px] xs:text-[11px] sm:text-sm md:text-base px-0.5 xs:px-1 sm:px-2 whitespace-normal";

const skillIconMap: Record<string, LucideIcon> = {
  core_concepts: Code2,
  languages: Code2,
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Wrench,
  others: Terminal,
};

const cardClass =
  "bg-card/70 backdrop-blur-md border-border card-hover group shadow-[0_0_20px_rgba(63,185,80,0.12)] ring-1 ring-white/10 h-full flex-1 flex flex-col rounded-lg";

interface CardCarouselProps<T extends { id: string | number }> {
  items: T[];
  renderCard: (item: T) => ReactNode;
}

const CardCarousel = <T extends { id: string | number }>({
  items,
  renderCard,
}: CardCarouselProps<T>) => {
  const count = items.length;
  const basis =
    count === 1
      ? "basis-full md:max-w-xl"
      : count === 2
        ? "basis-full md:basis-1/2"
        : "basis-full md:basis-1/2 xl:basis-1/3";

  return (
    <div className="w-full">
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <div className="mb-2 hidden justify-end gap-3 md:flex">
          <CarouselPrevious className="relative static translate-y-0 h-9 w-9 shadow-lg transition-all duration-300" />
          <CarouselNext className="relative static translate-y-0 h-9 w-9 shadow-lg transition-all duration-300" />
        </div>
        <CarouselContent
          viewportClassName="py-5"
          className="-ml-3 sm:-ml-4 items-stretch"
        >
          {items.map((item, index) => (
            <CarouselItem
              key={item.id}
              className={cn(basis, "flex flex-col pl-3 sm:pl-4")}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index, 3) * 0.08, duration: 0.4 }}
                className="flex h-full w-full flex-col"
              >
                {renderCard(item)}
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 mb-6 flex justify-center gap-3 md:hidden">
          <CarouselPrevious className="static h-9 w-9" />
          <CarouselNext className="static h-9 w-9" />
        </div>
      </Carousel>
    </div>
  );
};

interface SkillCategoryView extends SkillCategory {
  id: string;
  key: string;
}

interface AboutSectionProps {
  personal: Personal;
  certifications: Certification[];
  education: Education[];
  experience: Experience[];
  affiliation: Affiliation[];
  skills: Skills;
  courses: Course[];
}

const AboutSection = ({
  personal,
  certifications,
  education,
  experience,
  affiliation,
  skills,
  courses,
}: AboutSectionProps) => {
  const { t, loc, locPersonal, locSkill, locDate } = useLanguage();
  const skillCategories: SkillCategoryView[] = Object.entries(skills || {}).map(
    ([key, category]) => ({
      id: key,
      key,
      ...category,
    }),
  );

  return (
    <section id="about" className="relative flex min-h-0 flex-col justify-start overflow-visible pt-16 pb-6 md:min-h-[70vh] md:pt-20 md:pb-12">
      <div className="pointer-events-none absolute top-1/2 left-0 h-48 w-48 rounded-full bg-accent/5 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-48 w-48 rounded-full bg-accent/5 opacity-50 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 px-1 text-center md:mb-6"
        >
          <Badge variant="outline" className="md:mt-4 mb-2 sm:mb-3 border-accent/50 text-accent text-xs sm:text-sm">
            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
            {t("aboutBadge")}
          </Badge>
          <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold mb-2 font-heading text-balance wrap-break-word">
            {t("aboutTitleBefore")} <span className="gradient-text">{t("aboutTitleAccent")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mx-auto mb-4 grid h-auto w-full grid-cols-3 gap-1 rounded-xl border border-border bg-card p-1 shadow-lg sm:mb-6 md:grid-cols-6 sm:rounded-2xl sm:p-1.5">
              <TabsTrigger value="about" className={tabTriggerClass}>
                <User className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 shrink-0" />
                <span>{t("tabAbout")}</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className={tabTriggerClass}>
                <Briefcase className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 shrink-0" />
                <span>{t("tabExperience")}</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className={tabTriggerClass}>
                <Code2 className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 shrink-0" />
                <span>{t("tabSkills")}</span>
              </TabsTrigger>
              <TabsTrigger value="education" className={tabTriggerClass}>
                <GraduationCap className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 shrink-0" />
                <span>{t("tabEducation")}</span>
              </TabsTrigger>
              <TabsTrigger value="certifications" className={tabTriggerClass}>
                <Award className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 shrink-0" />
                <span>{t("tabCertification")}</span>
              </TabsTrigger>
              <TabsTrigger value="affiliations" className={tabTriggerClass}>
                <Users className="w-3 h-3 xs:w-4 xs:h-4 md:w-5 md:h-5 shrink-0" />
                <span>{t("tabAffiliations")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-0 focus-visible:outline-hidden focus:outline-hidden">
              <Card className="w-full rounded-lg border-border bg-card/50 shadow-[0_0_20px_rgba(63,185,80,0.12)] ring-1 ring-white/10 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/20 shadow-inner sm:h-12 sm:w-12">
                      <User className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold sm:text-xl md:text-2xl">
                      {t("whoIAm")}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                    {locPersonal(personal, "bio")}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-0 focus-visible:outline-hidden focus:outline-hidden">
              {experience && experience.length > 0 ? (
                <CardCarousel
                  items={experience}
                  renderCard={(exp) => (
                    <Card className={cardClass}>
                      <CardContent className="p-4 md:p-5 flex-1 flex flex-col items-center text-center justify-center">
                        <h4 className="font-bold font-heading text-xl text-foreground mb-1">
                          {loc("experience", exp, "position")}
                        </h4>
                        <p className="text-accent font-medium mb-2">{exp.company}</p>
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground bg-background/50 mb-3 px-3 py-1">
                          {locDate(exp.startDate)} - {locDate(exp.endDate)}
                        </Badge>
                        {exp.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                            {loc("experience", exp, "description")}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                />
              ) : (
                <Card className="rounded-lg border-border bg-card/70 shadow-[0_0_20px_rgba(63,185,80,0.12)] backdrop-blur-md">
                  <CardContent className="p-8 text-center sm:p-12">
                    <h4 className="mb-2 font-heading text-lg font-semibold">
                      {t("freshGraduate")}
                    </h4>
                    <p className="mx-auto max-w-sm text-muted-foreground">
                      {t("freshGraduateBody")}
                    </p>
                    <Badge className="mt-4 border-0 bg-accent/10 text-accent">
                      {t("openToOpportunities")}
                    </Badge>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="skills" className="mt-0 focus-visible:outline-hidden focus:outline-hidden">
              <CardCarousel
                items={skillCategories}
                renderCard={(category) => {
                  const Icon = skillIconMap[category.key] || Code2;
                  return (
                    <Card className={cardClass}>
                      <CardHeader className="flex flex-col items-center justify-center px-4 py-3 sm:py-4">
                        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
                          <div className="bg-accent/10 p-2 sm:p-2.5 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                          </div>
                          <CardTitle className="text-base sm:text-lg font-bold font-heading">
                            {locSkill(category.key as SkillCategoryKey, category.title)}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
                        <div className="grid grid-cols-2 gap-x-4 xs:gap-x-8 sm:gap-x-12 gap-y-2 xs:gap-y-3 w-fit mx-auto content-start">
                          {category.items.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-1.5 sm:gap-2 justify-start min-w-[90px] sm:min-w-[110px]">
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1877F2] fill-current shrink-0"
                              >
                                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4-1.03-1.01-2.61-1.27-4-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.98-.2-4 .81s-1.27 2.61-.81 4c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.21 2.97.8 4 1.03 1.01 2.61 1.27 4.01.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.97.2 4-.81s1.27-2.61.81-4c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.53-3.53 1.43-1.43 2.1 2.1 4.59-4.59 1.43 1.43-6.02 6.02z" />
                              </svg>
                              <span className="text-xs sm:text-sm text-foreground/80 font-medium truncate text-left">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                }}
              />

              {courses && courses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mt-2 px-3 sm:px-4"
                >
                  <Card className={cn(cardClass, "max-w-5xl mx-auto")}>
                    <CardHeader className="flex flex-col items-center justify-center px-4 py-3 sm:py-4">
                      <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
                        <div className="bg-accent/10 p-2 sm:p-2.5 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                        </div>
                        <CardTitle className="text-base sm:text-lg font-bold font-heading">
                          {t("notableCourses")}
                        </CardTitle>
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs border-border text-muted-foreground bg-background/50 px-3 py-1">
                        {courses[0]?.provider}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-4 md:p-5 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2.5 sm:gap-y-3">
                        {courses.map((course) => (
                          <div
                            key={course.id}
                            className="flex items-start gap-2 rounded-lg px-1 py-0.5"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span className="text-xs sm:text-sm text-foreground/85 font-medium leading-snug">
                              {loc("courses", course, "title")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="education" className="mt-0 focus-visible:outline-hidden focus:outline-hidden">
              <CardCarousel
                items={education}
                renderCard={(edu) => (
                  <Card className={cardClass}>
                    <CardContent className="p-4 md:p-5 flex-1 flex flex-col items-center text-center justify-center">
                      <h4 className="font-bold font-heading text-xl text-foreground mb-1 leading-tight">
                        {loc("education", edu, "degree")}
                      </h4>
                      <p className="text-accent font-medium mb-1.5 leading-tight">
                        {loc("education", edu, "institution")}
                      </p>
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground bg-background/50 mb-3 px-3 py-1">
                        {locDate(edu.startDate)} - {locDate(edu.endDate)}
                      </Badge>
                      <div className="space-y-1 mb-3">
                        <p className="text-sm text-foreground/80 font-medium">{loc("education", edu, "major")}</p>
                        <p className="text-muted-foreground text-xs">{loc("education", edu, "location")}</p>
                      </div>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {loc("education", edu, "description")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              />
            </TabsContent>

            <TabsContent value="certifications" className="mt-0 focus-visible:outline-hidden focus:outline-hidden">
              <CardCarousel
                items={certifications || []}
                renderCard={(cert) => (
                  <Card className={cardClass}>
                    <CardContent className="p-4 md:p-5 flex-1 flex flex-col items-center text-center justify-center">
                      <h4 className="font-bold font-heading text-xl text-foreground mb-1 leading-tight">
                        {loc("certifications", cert, "title")}
                      </h4>
                      <p className="text-accent font-medium mb-2">{cert.organization}</p>
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground bg-background/50 mb-3 px-3 py-1">
                        {t("issued")}: {cert.issuedDate}
                      </Badge>
                      {cert.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
                          {loc("certifications", cert, "description")}
                        </p>
                      )}
                      {cert.link && (
                        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-full mt-auto">
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <span>{t("viewCertificate")}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              />
            </TabsContent>

            <TabsContent value="affiliations" className="mt-0 focus-visible:outline-hidden focus:outline-hidden">
              <CardCarousel
                items={affiliation || []}
                renderCard={(aff) => (
                  <Card className={cardClass}>
                    <CardContent className="p-4 md:p-5 flex-1 flex flex-col items-center text-center justify-center">
                      <h4 className="font-bold font-heading text-xl text-foreground mb-1 leading-tight">
                        {loc("affiliation", aff, "position")}
                      </h4>
                      <p className="text-accent font-medium mb-2">{loc("affiliation", aff, "organization") || aff.organization}</p>
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground bg-background/50 mb-3 px-3 py-1">
                        {locDate(aff.startDate)} - {locDate(aff.endDate)}
                      </Badge>
                      {aff.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {loc("affiliation", aff, "description")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
