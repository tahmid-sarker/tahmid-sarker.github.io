"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { asset } from "@/lib/asset";
import type { PortfolioData } from "@/types";

interface DataContextValue {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextValue | null>(null);

const DATA_FILES: Record<keyof PortfolioData, string> = {
  personal: "data/personal.json",
  links: "data/links.json",
  skills: "data/skills.json",
  courses: "data/courses.json",
  education: "data/education.json",
  experience: "data/experience.json",
  certifications: "data/certifications.json",
  affiliation: "data/affiliations.json",
  projects: "data/projects.json",
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheBust = `t=${Date.now()}`;
        const entries = await Promise.all(
          (Object.entries(DATA_FILES) as [keyof PortfolioData, string][]).map(
            async ([sectionName, filePath]) => {
              const response = await fetch(`${asset(filePath)}?${cacheBust}`);
              if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
              }
              return [sectionName, await response.json()] as const;
            },
          ),
        );
        setData(Object.fromEntries(entries) as PortfolioData);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load portfolio data";
        setError(message);
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
