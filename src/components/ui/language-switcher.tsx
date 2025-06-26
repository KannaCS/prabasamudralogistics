"use client";

import { useCallback, useRef, useState } from "react";
import { useLanguage, type Language } from "@/i18n/LanguageContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleLanguageChange = useCallback((newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  }, [setLanguage]);

  useOnClickOutside(ref, () => setIsOpen(false));

  const languages: Record<Language, { code: string; name: string }> = {
    id: { code: "ID", name: t("common.languages.id") },
    en: { code: "EN", name: t("common.languages.en") },
    jp: { code: "JP", name: t("common.languages.jp") }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <span className="font-medium">{languages[language].code}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
          <div className="py-1">
            {Object.entries(languages).map(([langCode, langInfo]) => (
              <button
                key={langCode}
                onClick={() => handleLanguageChange(langCode as Language)}
                className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                  language === langCode ? "bg-primary-50 text-primary" : "text-gray-700"
                } hover:bg-gray-100 transition-colors`}
                aria-current={language === langCode ? "true" : "false"}
              >
                <span className="font-medium mr-2">{langInfo.code}</span>
                <span>{langInfo.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 