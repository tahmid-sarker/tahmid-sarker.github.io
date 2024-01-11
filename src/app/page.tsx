"use client";

import { motion } from "motion/react";
import { Navbar, Footer, ProfileLinks, BottomNav } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";
import { Loading } from "@/components/shared/loading";
import { useData, useLanguage } from "@/components/providers";

const Home = () => {
  const { data, loading, error } = useData();
  const { t } = useLanguage();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {t("somethingWentWrong")}
          </h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent hover:bg-accent-hover text-primary-foreground px-6 py-2 rounded-lg font-medium"
          >
            {t("tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <ProfileLinks links={data.links} />
      <BottomNav />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection personal={data.personal} links={data.links} />
        <AboutSection
          personal={data.personal}
          certifications={data.certifications}
          education={data.education}
          experience={data.experience}
          affiliation={data.affiliation}
          skills={data.skills}
          courses={data.courses}
        />
        <ProjectsSection projects={data.projects} />
        <ContactSection personal={data.personal} />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Home;