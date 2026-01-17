
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { translations } from './translations';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the language state by checking localStorage first.
  // This satisfies the requirement that the language won't change back 
  // until the user explicitly toggles it again.
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('bics_app_language');
    if (savedLang === 'bn' || savedLang === 'en') {
      return savedLang as Language;
    }
    return 'en'; // Default to English if no preference is saved
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bics_app_language', lang);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
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
