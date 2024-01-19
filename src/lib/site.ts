export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tahmid-sarker.github.io"
).replace(/\/$/, "");

export const SITE_NAME = "Tahmid Sarker";
export const SITE_TITLE = "Tahmid Sarker | Software Engineer";
export const SITE_DESCRIPTION =
  "Software engineer building scalable full-stack web applications. Portfolio of Tahmid Sarker — React, Next.js, Node.js, and clean, user-focused digital products.";

export const SITE_KEYWORDS = [
  "Tahmid Sarker",
  "software engineer",
  "web developer",
  "full stack developer",
  "React developer",
  "Next.js developer",
  "Node.js developer",
  "TypeScript",
  "Bangladesh",
  "frontend developer",
  "backend developer",
  "portfolio",
] as const;

export const SAME_AS = [
  "https://github.com/tahmid-sarker",
  "https://www.linkedin.com/in/tahmid-sarker",
  "https://www.facebook.com/tahmid.sarker",
  "https://www.instagram.com/tahmid.sarker.mahi",
  "https://www.youtube.com/@tahmid-sarker",
  "https://calendly.com/tahmid",
  "https://twitter.com/tahmid_sarker",
] as const;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/Tahmid.jpg`,
    jobTitle: "Software Engineer",
    description: SITE_DESCRIPTION,
    email: "mailto:contact.tahmid.sarker@gmail.com",
    sameAs: [...SAME_AS],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    inLanguage: ["en", "bn"],
  };
}
