"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <Image 
                src="/logo.webp" 
                alt="PRABA SAMUDRA LOGISTICS" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary leading-tight">PRABA SAMUDRA</span>
              <span className="text-sm font-bold text-primary leading-tight">LOGISTICS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              {t("menu.home")}
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary transition-colors">
              {t("menu.services")}
            </Link>
            <Link href="/tracking" className="text-gray-700 hover:text-primary transition-colors">
              {t("menu.tracking")}
            </Link>
            <Link href="/booking" className="text-gray-700 hover:text-primary transition-colors">
              {t("menu.booking")}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              {t("menu.contact")}
            </Link>
            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {/* Language Switcher for Mobile */}
            <div className="mr-4">
              <LanguageSwitcher />
            </div>
            <button
              className="text-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("menu.home")}
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("menu.services")}
              </Link>
              <Link 
                href="/tracking" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("menu.tracking")}
              </Link>
              <Link 
                href="/booking" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("menu.booking")}
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("menu.contact")}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 