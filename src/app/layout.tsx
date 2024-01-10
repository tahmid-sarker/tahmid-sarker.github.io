import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_Bengali, Montserrat, Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider, DataProvider, LanguageProvider } from "@/components/providers";
import { asset } from "@/lib/asset";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tahmid Sarker — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["images/og-image.jpg"],
    creator: "@tahmid_sarker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: asset("images/Tahmid.jpg"), type: "image/jpeg" }],
    apple: [{ url: asset("images/Tahmid.jpg") }],
  },
  manifest: asset("manifest.json"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const themeInitScript = `(function(){try{localStorage.removeItem("theme");localStorage.removeItem("theme-override");var h=new Date().getHours();var t=(h>=18||h<6)?"dark":"light";var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.setAttribute("data-theme",t);r.style.colorScheme=t;}catch(e){}})();`;
const languageInitScript = `(function(){try{var l=localStorage.getItem("language");if(l==="bn"){document.documentElement.lang="bn";document.documentElement.classList.add("lang-bn");}else{document.documentElement.lang="en";}}catch(e){}})();`;

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const jsonLd = [personJsonLd(), websiteJsonLd()];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${dmSans.variable} ${notoBengali.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <DataProvider>{children}</DataProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
