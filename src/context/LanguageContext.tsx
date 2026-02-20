"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

type T = typeof translations[Language];

interface LanguageContextType {
  lang: Language;
  t: T;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: translations.en,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  const toggle = () => {
    const next: Language = lang === "en" ? "es" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
