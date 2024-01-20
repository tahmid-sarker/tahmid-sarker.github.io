import type {
  Affiliation,
  Certification,
  Course,
  Education,
  Experience,
  Personal,
  Project,
  SkillCategoryKey,
} from "./portfolio";

export type Language = "en" | "bn";

export type TranslationKey =
  | "navHome"
  | "navAbout"
  | "navProjects"
  | "navContact"
  | "aboutMe"
  | "aboutBadge"
  | "aboutTitleBefore"
  | "aboutTitleAccent"
  | "whoIAm"
  | "tabAbout"
  | "tabExperience"
  | "tabSkills"
  | "notableCourses"
  | "viewCourse"
  | "tabEducation"
  | "tabCertification"
  | "tabAffiliations"
  | "freshGraduate"
  | "freshGraduateBody"
  | "openToOpportunities"
  | "viewCertificate"
  | "issued"
  | "present"
  | "portfolioBadge"
  | "projectsTitleBefore"
  | "projectsTitleAccent"
  | "availableInternally"
  | "contactForCollab"
  | "collaborationInquiry"
  | "live"
  | "liveNa"
  | "source"
  | "sourceNa"
  | "badgeLocal"
  | "badgeInternal"
  | "badgeInternational"
  | "badgeShowcase"
  | "contactBadge"
  | "contactTitleBefore"
  | "contactTitleAccent"
  | "talkToMe"
  | "talkToMeBody"
  | "emailMeAt"
  | "copyEmail"
  | "sendAMessage"
  | "getInTouchTab"
  | "sendMessageTab"
  | "fullName"
  | "emailAddress"
  | "subject"
  | "message"
  | "placeholderName"
  | "placeholderEmail"
  | "placeholderSubject"
  | "placeholderMessage"
  | "sendMessage"
  | "sending"
  | "respondTime"
  | "messageSent"
  | "messageSentBody"
  | "oops"
  | "sendFailed"
  | "somethingWentWrong"
  | "tryAgain"
  | "footer"
  | "switchToLight"
  | "switchToDark"
  | "switchToBangla"
  | "switchToEnglish";

export type LocalizableCollection =
  | "experience"
  | "education"
  | "certifications"
  | "courses"
  | "affiliation"
  | "projects";

export type PersonalLocalizableField = "title" | "tagline" | "bio";

export type BanglaContent = {
  personal: Partial<Pick<Personal, PersonalLocalizableField>>;
  experience: Record<
    string,
    Partial<Pick<Experience, "position" | "description">>
  >;
  education: Record<
    string,
    Partial<
      Pick<
        Education,
        "degree" | "major" | "institution" | "location" | "description"
      >
    >
  >;
  certifications: Record<
    string,
    Partial<Pick<Certification, "title" | "description">>
  >;
  courses: Record<string, Partial<Pick<Course, "title">>>;
  affiliation: Record<
    string,
    Partial<Pick<Affiliation, "position" | "organization" | "description">>
  >;
  projects: Record<string, Partial<Pick<Project, "description">>>;
  skills: Record<SkillCategoryKey, string>;
  linkLabels: Record<string, string>;
};

export type UiTranslations = Record<TranslationKey, string>;

export type LanguagePack = UiTranslations & {
  content?: BanglaContent;
};
