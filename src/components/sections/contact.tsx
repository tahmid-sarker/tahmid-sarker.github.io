"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Copy,
  Check,
} from "lucide-react";
import { useTheme, useLanguage } from "@/components/providers";
import { GITHUB } from "@/lib/theme";
import Swal from "sweetalert2";
import { Button } from "@/components/shared/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/tabs";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { Badge } from "@/components/shared/badge";
import type { Personal } from "@/types";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactSectionProps {
  personal: Personal;
}

const ContactSection = ({ personal }: ContactSectionProps) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const subjectInput = document.getElementById("subject");
    if (!subjectInput) return;

    const handleExternalInput = (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLInputElement)) return;
      setFormData((prev) => ({ ...prev, subject: target.value }));
    };
    subjectInput.addEventListener("input", handleExternalInput);
    return () => subjectInput.removeEventListener("input", handleExternalInput);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contact.tahmid.sarker@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `Portfolio Contact: ${formData.subject}`,
            _template: "table",
          }),
        },
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: t("messageSent"),
          text: t("messageSentBody"),
          confirmButtonColor: theme === "dark" ? GITHUB.dark.success : GITHUB.light.success,
          background: theme === "dark" ? GITHUB.dark.canvas : GITHUB.light.canvas,
          color: theme === "dark" ? GITHUB.dark.fg : GITHUB.light.fg,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: t("oops"),
        text: t("sendFailed"),
        confirmButtonColor: theme === "dark" ? GITHUB.dark.success : GITHUB.light.success,
        background: theme === "dark" ? GITHUB.dark.canvas : GITHUB.light.canvas,
        color: theme === "dark" ? GITHUB.dark.fg : GITHUB.light.fg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactInfo = (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="text-accent">
            <MessagesSquare className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h4 className="text-xl sm:text-2xl font-bold font-heading">{t("talkToMe")}</h4>
        </div>
        <p className="text-muted-foreground leading-relaxed text-base sm:text-lg lg:max-w-md">
          {t("talkToMeBody")}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <div className="text-accent">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold font-heading">{t("emailMeAt")}</h4>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="text-muted-foreground hover:text-accent font-medium text-sm sm:text-base md:text-lg transition-colors break-all"
          >
            {personal.email}
          </a>
          <button
            onClick={handleCopyEmail}
            className="text-accent hover:text-accent-hover p-1 transition-colors"
            title={t("copyEmail")}
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const contactForm = (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-card/70 backdrop-blur-md border-border/50 shadow-[0_0_20px_rgba(63,185,80,0.12)] ring-1 ring-white/5 rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-heading flex items-center gap-2">
            <Send className="w-5 h-5 text-accent" />
            {t("sendAMessage")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  {t("fullName")} <span className="text-accent">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("placeholderName")}
                  required
                  className="bg-secondary border-border focus:border-accent focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  {t("emailAddress")} <span className="text-accent">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("placeholderEmail")}
                  required
                  className="bg-secondary border-border focus:border-accent focus:ring-accent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground">
                {t("subject")} <span className="text-accent">*</span>
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t("placeholderSubject")}
                required
                className="bg-secondary border-border focus:border-accent focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                {t("message")} <span className="text-accent">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("placeholderMessage")}
                required
                rows={4}
                className="bg-secondary border-border focus:border-accent focus:ring-accent resize-none"
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-accent font-medium h-11 text-sm rounded-xl shadow-[0_0_20px_rgba(63,185,80,0.3)] hover:shadow-accent/40 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t("sendMessage")}
                  </>
                )}
              </Button>
            </motion.div>

            <p className="text-center text-sm text-muted-foreground">{t("respondTime")}</p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section
      id="contact"
      className="relative flex min-h-0 flex-col justify-start overflow-hidden pt-16 pb-28 md:min-h-[70vh] md:justify-center md:pt-20 md:pb-12"
    >
      <div className="absolute top-1/4 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-36 sm:w-72 h-36 sm:h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-screen-2xl mx-auto px-2 xs:px-4 sm:px-6 md:px-24 relative z-10 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8 px-2 xs:px-4 w-full max-w-[95vw] sm:max-w-[90vw] mx-auto"
        >
          <Badge variant="outline" className="md:mt-4 mb-2 sm:mb-3 border-accent/50 text-accent text-xs sm:text-sm">
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
            {t("contactBadge")}
          </Badge>
          <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold mb-2 font-heading text-balance wrap-break-word">
            {t("contactTitleBefore")} <span className="gradient-text">{t("contactTitleAccent")}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-1 xs:px-2 sm:px-4 md:px-8"
        >
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="lg:hidden w-full grid grid-cols-2 mb-6 sm:mb-8 bg-card border border-border rounded-lg sm:rounded-xl p-1 h-auto max-w-[95vw] xs:max-w-md sm:max-w-lg mx-auto">
              <TabsTrigger
                value="info"
                className="rounded-md sm:rounded-lg data-[state=active]:bg-accent data-[state=active]:text-primary-foreground font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 xs:py-2 sm:py-2.5 text-[10px] xs:text-xs sm:text-sm"
              >
                <MessageSquare className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 shrink-0" />
                <span>{t("getInTouchTab")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="message"
                className="rounded-md sm:rounded-lg data-[state=active]:bg-accent data-[state=active]:text-primary-foreground font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-1.5 xs:py-2 sm:py-2.5 text-[10px] xs:text-xs sm:text-sm"
              >
                <Send className="w-3 h-3 xs:w-4 xs:h-4 sm:w-4 sm:h-4 shrink-0" />
                <span>{t("sendMessageTab")}</span>
              </TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <div className="hidden lg:block h-full">{contactInfo}</div>
                <TabsContent value="info" className="lg:hidden mt-0">
                  {contactInfo}
                </TabsContent>
              </div>

              <div className="lg:col-span-3">
                <div className="hidden lg:block h-full">{contactForm}</div>
                <TabsContent value="message" className="lg:hidden mt-0">
                  {contactForm}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
