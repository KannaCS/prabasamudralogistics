"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { id } from "./locales/id";
import { en } from "./locales/en";
import { jp } from "./locales/jp";

// Define available languages
export type Language = "id" | "en" | "jp";

// Define translation type with recursive structure that supports arrays
type TranslationValue = string | string[] | Record<string, any>;

// Define translation type
type Translations = {
  [key: string]: TranslationValue;
};

// Translation mapping
const translations: Record<Language, Translations> = {
  id,
  en,
  jp,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Helper to get deep value from object using path
const getNestedValue = (obj: any, path: string[]): any => {
  if (!obj || path.length === 0) return undefined;
  
  let current = obj;
  for (const key of path) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  
  return current;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Default language is Indonesian
  const [language, setLanguageState] = useState<Language>("id");
  const availableLanguages: Language[] = ["id", "en", "jp"];

  // Set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("praba-language", newLanguage);
    }
  };

  // Get translation for a key
  const t = (key: string): any => {
    // Split key by dots to navigate nested objects
    const keys = key.split(".");
    
    // First try current language
    const result = getNestedValue(translations[language], keys);
    
    if (result !== undefined) {
      return result;
    }
    
    // If not found in current language, try English as fallback
    if (language !== "en") {
      const enResult = getNestedValue(translations["en"], keys);
      if (enResult !== undefined) {
        console.warn(`Using English fallback for missing translation: ${key}`);
        return enResult;
      }
    }
    
    // If not found in English either, try other languages
    for (const lang of availableLanguages) {
      if (lang !== language && lang !== "en") {
        const otherResult = getNestedValue(translations[lang], keys);
        if (otherResult !== undefined) {
          console.warn(`Using ${lang} fallback for missing translation: ${key}`);
          return otherResult;
        }
      }
    }
    
    // If all else fails, return a formatted version of the key
    console.warn(`Translation key not found in any language: ${key}`);
    return keys[keys.length - 1]
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Load language from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("praba-language") as Language;
      if (savedLanguage && availableLanguages.includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);
 
  // Keep document <html lang="..."> in sync with current language
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", language);
    }
  }, [language]);
 
  const value = {
    language,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 