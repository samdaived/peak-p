import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AppLocale, LOCALE_CONFIG, translations, TranslationKey } from "@/i18n/translations";

interface LanguageContextType {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<AppLocale>(() => {
    return (localStorage.getItem("app-locale") as AppLocale) || "fi";
  });

  const t = (key: TranslationKey) => translations[locale][key] || translations.en[key] || key;
  const dir = LOCALE_CONFIG[locale].dir;

  useEffect(() => {
    localStorage.setItem("app-locale", locale);
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, dir]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
