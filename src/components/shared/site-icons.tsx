"use client";

import type { ComponentType, SVGProps } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { SiFiverr, SiUpwork, SiCalendly } from "react-icons/si";
import { Globe, Mail } from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

export const getSocialIcon = (linkName?: string): IconComponent => {
  const normalize = (str?: string) => str?.toLowerCase().replace(/\s+/g, "");
  const name = normalize(linkName);

  if (!name) return Globe;

  if (name.includes("linkedin")) return FaLinkedin;
  if (name.includes("github")) return FaGithub;
  if (name.includes("facebook")) return FaFacebook;
  if (name.includes("instagram")) return FaInstagram;
  if (name.includes("youtube")) return FaYoutube;
  if (name.includes("fiverr")) return SiFiverr;
  if (name.includes("upwork")) return SiUpwork;
  if (name.includes("calendly")) return SiCalendly;
  if (name.includes("email") || name.includes("mail")) return Mail;

  return Globe;
};
