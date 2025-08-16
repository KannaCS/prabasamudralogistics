"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { headerAnimations } from "@/lib/animations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const links = useMemo(() => (
    [
      { href: "/", label: t("menu.home") },
      { href: "/services", label: t("menu.services") },
      { href: "/tracking", label: t("menu.tracking") },
      { href: "/booking", label: t("menu.booking") },
      { href: "/contact", label: t("menu.contact") },
    ]
  ), [t]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  useEffect(() => {
    // Initialize header animations once
    headerAnimations.logoEntrance('.logo');
    headerAnimations.navigationSlideIn('nav a');
  }, []);

  useEffect(() => {
    // Animate mobile menu when opened
    if (isMenuOpen) headerAnimations.mobileMenuSlide('.mobile-nav');
  }, [isMenuOpen]);

  useEffect(() => {
    // Scroll-aware header style
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={
        `sticky top-0 z-50 border-b transition-colors duration-200 ` +
        (isScrolled
          ? `bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm`
          : `bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60`)
      }
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="logo flex items-center group" aria-label="Go to homepage">
            <div className="relative w-10 h-10 mr-2">
              <Image
                src="/logo.webp"
                alt="PRABA SAMUDRA LOGISTICS logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 40px, 40px"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors">PRABA SAMUDRA</span>
              <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">LOGISTICS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  `group relative py-1 text-sm transition-colors ` +
                  (isActive(link.href)
                    ? `text-primary`
                    : `text-slate-700 hover:text-primary`)
                }
              >
                {link.label}
                <span
                  className={
                    `absolute left-0 -bottom-0.5 h-0.5 w-full transform transition-opacity ` +
                    (isActive(link.href) ? `opacity-100 bg-primary` : `opacity-0 group-hover:opacity-100`)
                  }
                  aria-hidden
                />
              </Link>
            ))}
            {/* Language Switcher */}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <div className="mr-2">
              <LanguageSwitcher />
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-primary-nav"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav id="mobile-primary-nav" className="mobile-nav md:hidden py-3 border-t" aria-label="Mobile Primary">
            <div className="flex flex-col divide-y divide-slate-100">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    `py-3 text-sm transition-colors ` +
                    (isActive(link.href) ? `text-primary` : `text-slate-700 hover:text-primary`)
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}