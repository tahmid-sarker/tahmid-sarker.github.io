export interface Personal {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  avatar: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export type SkillCategoryKey =
  | "core_concepts"
  | "frontend"
  | "backend"
  | "others";

export type Skills = Record<SkillCategoryKey, SkillCategory>;

export interface Education {
  id: number;
  degree: string;
  major: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  id: number;
  title: string;
  organization: string;
  issuedDate: string;
  link: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  provider: string;
  completedDate?: string;
  link?: string;
}

export interface Affiliation {
  id: number;
  position: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type ProjectBadge =
  | "Local"
  | "Internal"
  | "International"
  | "Showcase";

export interface ProjectLiveUrl {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  sourceUrl: string;
  badge: ProjectBadge;
  liveUrl?: string;
  liveUrls?: ProjectLiveUrl[];
}

export interface PortfolioData {
  personal: Personal;
  links: SocialLink[];
  skills: Skills;
  courses: Course[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  affiliation: Affiliation[];
  projects: Project[];
}

export type PortfolioSection = keyof PortfolioData;
