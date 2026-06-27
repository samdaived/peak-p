import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations, getDirection } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['fr'];
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const value = {
    language,
    setLanguage,
    t: translations[language],
    direction: getDirection(language),
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={value.direction} className={value.direction === 'rtl' ? 'font-arabic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
