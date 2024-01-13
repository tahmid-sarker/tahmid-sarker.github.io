"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import {
  localizeDate,
  localizeField,
  localizeLinkLabel,
  localizePersonal,
  localizeSkillTitle,
  translations,
} from "@/lib/i18n";
import type {
  Language,
  LocalizableCollection,
  Personal,
  PersonalLocalizableField,
  SkillCategoryKey,
  TranslationKey,
} from "@/types";
import type {
  Affiliation,
  Certification,
  Course,
  Education,
  Experience,
  Project,
} from "@/types";

type CollectionItemMap = {
  experience: Experience;
  education: Education;
  certifications: Certification;
  courses: Course;
  affiliation: Affiliation;
  projects: Project;
};

type CollectionFieldMap = {
  experience: keyof Pick<Experience, "position" | "description">;
  education: keyof Pick<
    Education,
    "degree" | "major" | "institution" | "location" | "description"
  >;
  certifications: keyof Pick<Certification, "title" | "description">;
  courses: keyof Pick<Course, "title">;
  affiliation: keyof Pick<Affiliation, "position" | "organization" | "description">;
  projects: keyof Pick<Project, "description">;
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
  loc: <C extends LocalizableCollection, F extends CollectionFieldMap[C]>(
    collection: C,
    item: CollectionItemMap[C] | null | undefined,
    field: F,
  ) => string;
  locPersonal: (
    personal: Personal | null | undefined,
    field: PersonalLocalizableField,
  ) => string;
  locSkill: (key: SkillCategoryKey, title: string) => string;
  locDate: (value: string) => string;
  locLink: (label: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "language";
const LanguageContext = createContext<LanguageContextValue | null>(null);

const applyLanguage = (lang: string): Language => {
  const next: Language = lang === "bn" ? "bn" : "en";
  document.documentElement.lang = next;
  document.documentElement.classList.toggle("lang-bn", next === "bn");
  return next;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLangState] = useState<Language>("en");

  useLayoutEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // Sync DOM + React state from localStorage after mount (avoids SSR mismatch).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration sync
    setLangState(applyLanguage(stored === "bn" ? "bn" : "en"));
  }, []);

  const setLang = (nextLang: Language) => {
    const next = applyLanguage(nextLang);
    window.localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  };

  const toggleLang = () => setLang(lang === "en" ? "bn" : "en");

  const t = (key: TranslationKey): string =>
    translations[lang]?.[key] ?? translations.en[key] ?? key;

  const loc = <C extends LocalizableCollection, F extends CollectionFieldMap[C]>(
    collection: C,
    item: CollectionItemMap[C] | null | undefined,
    field: F,
  ): string => localizeField(lang, collection, item, field);

  const locPersonal = (
    personal: Personal | null | undefined,
    field: PersonalLocalizableField,
  ): string => localizePersonal(lang, personal, field);

  const locSkill = (key: SkillCategoryKey, title: string): string =>
    localizeSkillTitle(lang, key, title);

  const locDate = (value: string): string => localizeDate(lang, value);

  const locLink = (label: string): string => localizeLinkLabel(lang, label);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        loc,
        locPersonal,
        locSkill,
        locDate,
        locLink,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
