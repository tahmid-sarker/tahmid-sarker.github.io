export type NavLabel = "Home" | "About" | "Projects" | "Contact";
export type NavHref = "#home" | "#about" | "#projects" | "#contact";

export interface NavItem {
  id: number;
  label: NavLabel;
  href: NavHref;
}

export const NAVIGATION: NavItem[] = [
  { id: 1, label: "Home", href: "#home" },
  { id: 2, label: "About", href: "#about" },
  { id: 3, label: "Projects", href: "#projects" },
  { id: 4, label: "Contact", href: "#contact" },
];

export const FOOTER_TEXT = "Tahmid Sarker. All rights reserved.";
