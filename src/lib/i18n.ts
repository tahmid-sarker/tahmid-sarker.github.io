import type {
  Affiliation,
  Certification,
  Course,
  Education,
  Experience,
  Language,
  LanguagePack,
  LocalizableCollection,
  Personal,
  PersonalLocalizableField,
  Project,
  SkillCategoryKey,
} from "@/types";

export const translations: Record<Language, LanguagePack> = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",
    aboutMe: "About Me",
    aboutBadge: "About Myself",
    aboutTitleBefore: "Get to Know",
    aboutTitleAccent: "Me Better",
    whoIAm: "Who I Am",
    tabAbout: "About",
    tabExperience: "Experience",
    tabSkills: "Skills",
    notableCourses: "Notable Courses",
    viewCourse: "View Course",
    tabEducation: "Education",
    tabCertification: "Certification",
    tabAffiliations: "Affiliations",
    freshGraduate: "Fresh Graduate",
    freshGraduateBody:
      "I'm a recent graduate actively seeking opportunities to apply my skills and gain professional experience.",
    openToOpportunities: "Open to Opportunities",
    viewCertificate: "View Certificate",
    issued: "Issued",
    present: "Present",
    portfolioBadge: "Portfolio",
    projectsTitleBefore: "Featured",
    projectsTitleAccent: "Projects",
    availableInternally: "Available Internally",
    contactForCollab: "Contact for Collab",
    collaborationInquiry: "Collaboration Inquiry",
    live: "Live",
    liveNa: "Live N/A",
    source: "Source",
    sourceNa: "Source N/A",
    badgeLocal: "Local",
    badgeInternal: "Internal",
    badgeInternational: "International",
    badgeShowcase: "Showcase",
    contactBadge: "Get In Touch",
    contactTitleBefore: "Contact",
    contactTitleAccent: "Me",
    talkToMe: "Talk to me",
    talkToMeBody:
      "I am always open to discuss your project, improve your project presence, or help with your project challenges. You can communicate with me through email or links if you want. My inbox is always open. I'll try my best to answer back!!!",
    emailMeAt: "Email me at",
    copyEmail: "Copy email",
    sendAMessage: "Send a Message",
    getInTouchTab: "Get in touch",
    sendMessageTab: "Send a message",
    fullName: "Full Name",
    emailAddress: "Email Address",
    subject: "Subject",
    message: "Message",
    placeholderName: "John Doe",
    placeholderEmail: "john@example.com",
    placeholderSubject: "Project Inquiry",
    placeholderMessage: "Tell me about your project or just say hello...",
    sendMessage: "Send Message",
    sending: "Sending...",
    respondTime: "I'll respond within 24-48 hours",
    messageSent: "Message Sent!",
    messageSentBody: "Thank you for reaching out. I'll get back to you soon!",
    oops: "Oops!",
    sendFailed: "Something went wrong. Please try again or email me directly.",
    somethingWentWrong: "Something went wrong",
    tryAgain: "Try Again",
    footer: "Tahmid Sarker. All rights reserved.",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    switchToBangla: "Switch to Bangla",
    switchToEnglish: "Switch to English",
  },
  bn: {
    navHome: "হোম",
    navAbout: "পরিচিতি",
    navProjects: "প্রজেক্ট",
    navContact: "যোগাযোগ",
    aboutMe: "আমার সম্পর্কে",
    aboutBadge: "আমার পরিচিতি",
    aboutTitleBefore: "আমাকে আরও",
    aboutTitleAccent: "জানুন",
    whoIAm: "আমি কে",
    tabAbout: "পরিচিতি",
    tabExperience: "অভিজ্ঞতা",
    tabSkills: "স্কিল",
    notableCourses: "উল্লেখযোগ্য কোর্স",
    viewCourse: "কোর্স দেখুন",
    tabEducation: "শিক্ষা",
    tabCertification: "সার্টিফিকেট",
    tabAffiliations: "সংগঠন",
    freshGraduate: "নতুন গ্র্যাজুয়েট",
    freshGraduateBody:
      "আমি একজন সদ্য গ্র্যাজুয়েট এবং নিজের দক্ষতা কাজে লাগিয়ে পেশাগত অভিজ্ঞতা অর্জনের সুযোগ খুঁজছি।",
    openToOpportunities: "সুযোগের জন্য প্রস্তুত",
    viewCertificate: "সার্টিফিকেট দেখুন",
    issued: "ইস্যু",
    present: "বর্তমান",
    portfolioBadge: "পোর্টফোলিও",
    projectsTitleBefore: "নির্বাচিত",
    projectsTitleAccent: "প্রজেক্ট",
    availableInternally: "অভ্যন্তরীণভাবে উপলব্ধ",
    contactForCollab: "সহযোগিতার জন্য যোগাযোগ",
    collaborationInquiry: "সহযোগিতার জিজ্ঞাসা",
    live: "লাইভ",
    liveNa: "লাইভ নেই",
    source: "সোর্স",
    sourceNa: "সোর্স নেই",
    badgeLocal: "স্থানীয়",
    badgeInternal: "অভ্যন্তরীণ",
    badgeInternational: "আন্তর্জাতিক",
    badgeShowcase: "শোকেস",
    contactBadge: "যোগাযোগ করুন",
    contactTitleBefore: "আমার সাথে",
    contactTitleAccent: "যোগাযোগ",
    talkToMe: "আমার সাথে কথা বলুন",
    talkToMeBody:
      "আপনার প্রজেক্ট নিয়ে আলোচনা, উপস্থিতি উন্নত করা, বা চ্যালেঞ্জ সমাধানে আমি সবসময় আগ্রহী। ইমেইল বা লিংকের মাধ্যমে আমার সাথে যোগাযোগ করতে পারেন। আমার ইনবক্স সবসময় খোলা। উত্তর দেওয়ার চেষ্টা করব!",
    emailMeAt: "ইমেইল করুন",
    copyEmail: "ইমেইল কপি করুন",
    sendAMessage: "বার্তা পাঠান",
    getInTouchTab: "যোগাযোগ",
    sendMessageTab: "বার্তা পাঠান",
    fullName: "পূর্ণ নাম",
    emailAddress: "ইমেইল ঠিকানা",
    subject: "বিষয়",
    message: "বার্তা",
    placeholderName: "আপনার নাম",
    placeholderEmail: "you@example.com",
    placeholderSubject: "প্রজেক্ট সংক্রান্ত জিজ্ঞাসা",
    placeholderMessage: "আপনার প্রজেক্ট সম্পর্কে লিখুন, অথবা শুধু হ্যালো বলুন...",
    sendMessage: "বার্তা পাঠান",
    sending: "পাঠানো হচ্ছে...",
    respondTime: "২৪–৪৮ ঘন্টার মধ্যে উত্তর দেব",
    messageSent: "বার্তা পাঠানো হয়েছে!",
    messageSentBody: "যোগাযোগের জন্য ধন্যবাদ। শীঘ্রই উত্তর দেব।",
    oops: "ওহ!",
    sendFailed: "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা সরাসরি ইমেইল করুন।",
    somethingWentWrong: "কিছু সমস্যা হয়েছে",
    tryAgain: "আবার চেষ্টা করুন",
    footer: "তাহমিদ সরকার। সর্বস্বত্ব সংরক্ষিত।",
    switchToLight: "লাইট থিমে যান",
    switchToDark: "ডার্ক থিমে যান",
    switchToBangla: "বাংলায় যান",
    switchToEnglish: "ইংরেজিতে যান",
    content: {
      personal: {
        title: "সফটওয়্যার ইঞ্জিনিয়ার",
        tagline:
          "স্কেলেবল ওয়েব অ্যাপ্লিকেশন তৈরি এবং জটিল প্রযুক্তিগত চ্যালেঞ্জ সমাধানে নিবেদিত একজন সফটওয়্যার ইঞ্জিনিয়ার।",
        bio: "আমি তাহমিদ, একজন সফটওয়্যার ইঞ্জিনিয়ার। বিভিন্ন ক্লায়েন্টের জন্য ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন তৈরি ও ডেলিভারি করেছি। স্কেলেবল, ব্যবহারবান্ধব অ্যাপ তৈরি এবং জটিল সমস্যা সমাধান করতে আমি পছন্দ করি। ফ্রন্টএন্ড ও ব্যাকএন্ড দুই দিকেই কাজ করি, পরিচ্ছন্ন কোড এবং ভালো সহযোগিতার উপর জোর দিই। মানুষের জীবনে আসল প্রভাব ফেলে এমন ডিজিটাল অভিজ্ঞতা তৈরি করতে আমি আগ্রহী।",
      },
      experience: {
        1: {
          position: "জুনিয়র সফটওয়্যার ইঞ্জিনিয়ার",
          description:
            "ফ্রন্টএন্ড বিভাগে কাজ করছি। ইউজার ইন্টারফেস তৈরি ও রক্ষণাবেক্ষণ এবং ক্রস-ফাংশনাল টিমের সাথে মিলে মানসম্মত ওয়েব অ্যাপ্লিকেশন ডেলিভারি করি।",
        },
      },
      education: {
        1: {
          degree: "ব্যাচেলর অব সায়েন্স",
          major: "সফটওয়্যার ইঞ্জিনিয়ারিং (ডেটা সায়েন্স মেজর)",
          institution: "ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি",
          location: "ঢাকা, বাংলাদেশ",
          description:
            "সফটওয়্যার ইঞ্জিনিয়ারিং নীতি, অ্যালগরিদম, ডেটা স্ট্রাকচার এবং আধুনিক ওয়েব ডেভেলপমেন্ট প্রযুক্তি নিয়ে পড়াশোনা করেছি।",
        },
        2: {
          degree: "উচ্চ মাধ্যমিক",
          major: "বিজ্ঞান",
          institution: "সুনামগঞ্জ সরকারি কলেজ",
          location: "সুনামগঞ্জ, বাংলাদেশ",
          description: "বিজ্ঞান শাখায় উচ্চ মাধ্যমিক সম্পন্ন করেছি।",
        },
        3: {
          degree: "মাধ্যমিক",
          major: "বিজ্ঞান",
          institution: "সরকারি জুবিলী হাই স্কুল",
          location: "সুনামগঞ্জ, বাংলাদেশ",
          description: "বিজ্ঞান বিষয়ে মাধ্যমিক শিক্ষা সম্পন্ন করেছি।",
        },
      },
      certifications: {
        1: {
          title: "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট বুটক্যাম্প",
          description:
            "ফ্রন্টএন্ড ও ব্যাকএন্ড প্রযুক্তিসহ ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্টে পূর্ণাঙ্গ প্রশিক্ষণ।",
        },
        2: {
          title: "কমপ্লিট ওয়েব ডেভেলপমেন্ট",
          description:
            "আধুনিক ওয়েব প্রযুক্তি এবং ইন্ডাস্ট্রিয়াল প্র্যাকটিস নিয়ে নিবিড় কোর্স।",
        },
      },
      courses: {},
      affiliation: {
        1: {
          position: "সদস্য",
          organization: "ডেটা সায়েন্স ক্লাব",
          description:
            "DIU DSC-এর ডেটা সায়েন্স কার্যক্রমে অংশ নিয়েছি এবং ধারণাগুলো প্রয়োগ করেছি।",
        },
        2: {
          position: "কম্পিটিটিভ প্রোগ্রামার",
          description:
            "কম্পিটিটিভ প্রোগ্রামিংয়ে অংশ নিয়েছি এবং DIU ACM Blue 8 টিমের সাথে জটিল সমস্যা সমাধান ও অ্যালগরিদমিক দক্ষতা বাড়িয়েছি।",
        },
        3: {
          position: "সহ-প্রতিষ্ঠাতা",
          organization: "আহবান সামাজিক ও সাংস্কৃতিক সংগঠন",
          description:
            "সুনামগঞ্জ, বাংলাদেশভিত্তিক এই সামাজিক সংগঠনে সক্রিয়ভাবে অবদান রাখি।",
        },
        4: {
          description: "সদস্য থাকাকালীন বিভিন্ন দুর্নীতিবিরোধী কাজে যুক্ত ছিলাম।",
        },
      },
      projects: {
        1: {
          description:
            "প্রিমিয়াম বাংলাদেশি অর্গানিক পণ্যের জন্য একজন স্থানীয় ক্লায়েন্টের ই-কমার্স প্ল্যাটফর্ম, অ্যাডমিন ড্যাশবোর্ডসহ।",
        },
        2: {
          description: "বিক্রি, ক্রয়, ইনভেন্টরি এবং অ্যাকাউন্টিং ব্যবস্থাপনার ইআরপি সিস্টেম।",
        },
        3: {
          description:
            "একজন স্থানীয় ক্লায়েন্টের সফটওয়্যার কোম্পানির ওয়েবসাইট, কনটেন্ট ম্যানেজমেন্ট সিস্টেমসহ।",
        },
        4: {
          description:
            "একজন জার্মান ক্লায়েন্টের এন্টারপ্রাইজ পারফরম্যান্স মনিটরিংয়ের ট্র্যাকিং ও অ্যানালিটিক্স প্ল্যাটফর্ম।",
        },
        5: {
          description:
            "বাঙালি সিঙ্গেল ও পরিবারের জন্য ইউজার ড্যাশবোর্ডসহ একটি ম্যাচমেকিং প্ল্যাটফর্ম।",
        },
        6: {
          description: "চাকরিপ্রার্থী ও নিয়োগকর্তার জন্য ড্যাশবোর্ডসহ জব পোর্টাল।",
        },
        7: {
          description: "রিভিউয়ের জন্য ইউজার ড্যাশবোর্ডসহ পণ্য রেটিং প্ল্যাটফর্ম।",
        },
        8: {
          description: "বাগান পেশাজীবীদের ক্লায়েন্টদের সাথে যুক্ত করার মার্কেটপ্লেস।",
        },
      },
      skills: {
        core_concepts: "মূল ধারণা",
        frontend: "ফ্রন্টএন্ড",
        backend: "ব্যাকএন্ড",
        others: "অন্যান্য টুলস",
      },
      linkLabels: {
        Client: "ক্লায়েন্ট",
        Admin: "অ্যাডমিন",
        Website: "ওয়েবসাইট",
        CMS: "সিএমএস",
      },
    },
  },
};

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

export const localizeField = <
  C extends LocalizableCollection,
  F extends CollectionFieldMap[C],
>(
  lang: Language,
  collection: C,
  item: CollectionItemMap[C] | null | undefined,
  field: F,
): string => {
  if (!item) return "";
  const fallback = (item as unknown as Record<string, unknown>)[field as string];
  const fallbackValue = typeof fallback === "string" ? fallback : "";
  if (lang !== "bn") return fallbackValue;

  const overrides = translations.bn.content?.[collection]?.[String(item.id)];
  if (!overrides) return fallbackValue;

  const override = (overrides as Record<string, string | undefined>)[
    field as string
  ];
  return typeof override === "string" ? override : fallbackValue;
};

export const localizePersonal = (
  lang: Language,
  personal: Personal | null | undefined,
  field: PersonalLocalizableField,
): string => {
  if (!personal) return "";
  if (lang !== "bn") return personal[field];
  return translations.bn.content?.personal?.[field] ?? personal[field];
};

export const localizeSkillTitle = (
  lang: Language,
  key: SkillCategoryKey,
  title: string,
): string => {
  if (lang !== "bn") return title;
  return translations.bn.content?.skills?.[key] ?? title;
};

export const localizeDate = (lang: Language, value: string): string => {
  if (lang === "bn" && String(value).toLowerCase() === "present") {
    return translations.bn.present;
  }
  return value;
};

export const localizeLinkLabel = (lang: Language, label: string): string => {
  if (lang !== "bn") return label;
  return translations.bn.content?.linkLabels?.[label] ?? label;
};
