"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { initAnimations } from "@/lib/animations";
import SectionTitle from "@/components/ui/section-title";
import ServiceCard from "@/components/home/ServiceCard";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    initAnimations('home');
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500" aria-hidden="true" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,theme(colors.secondary.400),transparent_50%)]" aria-hidden>
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="hero-title text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t("homePage.hero.title")}
              </h1>
              <p className="hero-subtitle mt-5 text-lg md:text-xl text-white/90 max-w-xl">
                {t("homePage.hero.subtitle")}
              </p>
              <div className="hero-buttons mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/booking"
                  aria-label="Go to booking"
                  className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                >
                  <span>{t("homePage.hero.bookingButton")}</span>
                </Link>
                <Link
                  href="/tracking"
                  aria-label="Go to tracking"
                  className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-transparent px-6 py-3 font-semibold text-white hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  {t("homePage.hero.trackingButton")}
                </Link>
              </div>
              {/* trust strip */}
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-white" />
                  <span>Reliable & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-white" />
                  <span>Nationwide Coverage</span>
                </div>
              </div>
            </div>
            <div>
              <div className="relative w-full h-80 md:h-[28rem]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                  <Image
                    src="/gambarkapalpraba.webp"
                    alt="Praba Samudra Logistics Services"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Visual */}
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="relative w-full h-72 md:h-[24rem]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                  <Image
                    src="/2 HIno Trailer In PORT HD_.webp"
                    alt="About Praba Samudra Logistics"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="md:col-span-7 order-1 md:order-2">
              <SectionTitle
                align="left"
                title={t("homePage.about.title")}
                subtitle={t("homePage.about.content1")}
                className="mb-6"
              />
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary-500 mt-0.5" size={20} />
                  <p className="text-gray-700">{t("homePage.about.content2")}</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary-500 mt-0.5" size={20} />
                  <p className="text-gray-700">{t("homePage.about.content3")}</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary-500 mt-0.5" size={20} />
                  <p className="text-gray-700">{t("homePage.about.content4")}</p>
                </li>
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="rounded-xl bg-white p-5 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary mb-1">{t("homePage.about.vision")}</h3>
                  <p className="text-gray-700 text-sm">{t("homePage.about.visionContent")}</p>
                </div>
                <div className="rounded-xl bg-white p-5 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary mb-1">{t("homePage.about.mission")}</h3>
                  <p className="text-gray-700 text-sm">{t("homePage.about.missionContent")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section relative py-20 bg-slate-900 text-white overflow-hidden">
        {/* gradient base */}
        <div className="services-bg absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" aria-hidden />
        {/* animated gradient mesh */}
        <div
          className="services-gradient pointer-events-none absolute -inset-20 opacity-35 blur-3xl mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(40% 40% at 20% 20%, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 60%), radial-gradient(35% 35% at 80% 30%, rgba(16,185,129,0.32) 0%, rgba(16,185,129,0) 60%), radial-gradient(45% 45% at 50% 80%, rgba(14,165,233,0.28) 0%, rgba(14,165,233,0) 60%)',
            backgroundSize: '140% 140%, 140% 140%, 140% 140%',
            backgroundPosition: '0% 0%, 100% 0%, 50% 100%',
            willChange: 'transform, background-position',
          }}
        />
        {/* particles layer */}
        <div
          className="services-particles absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          aria-hidden
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            backgroundPosition: '0 0, 11px 11px',
          }}
        />
        {/* secondary particles layer for deeper parallax */}
        <div
          className="services-particles-2 absolute inset-0 opacity-25"
          aria-hidden
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            backgroundPosition: '0 0',
            willChange: 'transform, background-position',
          }}
        />
        {/* ambient light sweep */}
        <div
          className="services-ambient pointer-events-none absolute -inset-x-1/2 inset-y-0 opacity-0"
          aria-hidden
          style={{
            background:
              'linear-gradient(70deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.08) 65%, rgba(255,255,255,0) 100%)',
            transform: 'translateX(-30%)',
            willChange: 'transform, opacity',
          }}
        />
        {/* parallax blobs */}
        <div className="parallax-layer absolute -top-16 -right-20 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" data-speed="0.35" aria-hidden style={{ willChange: 'transform' }} />
        <div className="parallax-layer absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl" data-speed="0.2" aria-hidden style={{ willChange: 'transform' }} />
        <div className="relative container mx-auto px-4">
          <SectionTitle 
            title={t("homePage.services.title")} 
            titleClassName="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4"
            subtitleClassName="text-lg text-white/70"
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Featured service */}
            <div className="md:col-span-5">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
                <div className="p-6 md:p-8 relative z-10">
                  <div className="w-14 h-14 bg-white/15 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{t("homePage.services.shipping")}</h3>
                  <p className="mt-3 text-white/90">{t("homePage.services.shippingDesc")}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-white" /> Door-to-door & port-to-port</li>
                    <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-white" /> Asuransi & dokumentasi lengkap</li>
                    <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-white" /> Real-time tracking</li>
                  </ul>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link href="/booking" className="inline-flex items-center justify-center rounded-lg bg-white text-primary-700 px-5 py-2.5 font-semibold hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">{t("homePage.hero.bookingButton")}</Link>
                    <Link href="/services" className="inline-flex items-center justify-center rounded-lg border border-white/80 text-white px-5 py-2.5 font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">{t("homePage.hero.trackingButton")}</Link>
                  </div>
                </div>
                {/* subtle noise overlay for depth */}
                <div className="absolute inset-0 opacity-20" aria-hidden style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
              </div>
            </div>

            {/* Services grid */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 h-full">
                <ServiceCard
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  }
                  title={t("homePage.services.truckRental")}
                  description={t("homePage.services.truckRentalDesc")}
                  className="hover:border-primary-200"
                  href="/services/truck-rental"
                />
                <ServiceCard
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                  title={t("homePage.services.shipRental")}
                  description={t("homePage.services.shipRentalDesc")}
                  className="hover:border-primary-200"
                  href="/services/ship-rental"
                />
                <ServiceCard
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  }
                  title={t("homePage.services.exportImport")}
                  description={t("homePage.services.exportImportDesc")}
                  className="hover:border-primary-200"
                  href="/services/export-import"
                />
                <ServiceCard
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  }
                  title={t("homePage.services.shipping")}
                  description={t("homePage.services.shippingDesc")}
                  className="hover:border-primary-200"
                  href="/services/domestic-shipping"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title={t("homePage.clients.title")} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              "PT. Gaya Makmur Tractors",
              "PT. Gaya Makmur Putra",
              "PT. Medcopapua Hijau Selaras",
              "PT. Heral Eranio Jaya",
              "PT. Nusantara Auto World International",
              "PT. Putra Borneo Nusantara Indah",
              "PT. Putra Agung Santoso",
              "PT. Samudera Makmur Abadi",
              "PT. Link Pasifik Indonesia",
              "PT. Wahana Multi Trans"
            ].map((client, index) => (
              <div key={index} className="client-card bg-gray-50 px-4 py-3 rounded-full border border-gray-200 flex items-center justify-center text-center hover:border-primary-200 transition-colors">
                <p className="text-xs md:text-sm font-medium text-gray-700">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title={t("homePage.partners.title")} subtitle={t("homePage.partners.subtitle")} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-stretch">
            {/* Partner 1 - Association of Indonesian Logistics */}
            <div className="partner-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center border border-gray-200 focus-visible:ring-2 focus-visible:ring-primary-200 min-h-[160px]">
              <div className="w-full h-16 md:h-20 relative grayscale hover:grayscale-0 transition">
                <Image
                  src="/mitra/Asosition logistics indonesia.jpg"
                  alt="Asosiasi Logistik Indonesia"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 text-center">Asosiasi Logistik Indonesia</p>
            </div>
            
            {/* Partner 2 - Bandar Golf Kemayoran */}
            <div className="partner-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center border border-gray-200 focus-visible:ring-2 focus-visible:ring-primary-200 min-h-[160px]">
              <div className="w-full h-16 md:h-20 relative grayscale hover:grayscale-0 transition">
                <Image
                  src="/mitra/Bandar golf Kemayoran.jpg"
                  alt="Bandar Golf Kemayoran"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 text-center">Bandar Golf Kemayoran</p>
            </div>
            
            {/* Partner 3 - National Logistics Collaboration */}
            <div className="partner-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center border border-gray-200 focus-visible:ring-2 focus-visible:ring-primary-200 min-h-[160px]">
              <div className="w-full h-16 md:h-20 relative grayscale hover:grayscale-0 transition">
                <Image
                  src="/mitra/Collaboration logistics nasional.jpg"
                  alt="Kolaborasi Logistik Nasional"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 text-center">Kolaborasi Logistik Nasional</p>
            </div>
            
            {/* Partner 4 - Indonesian Chamber of Commerce */}
            <div className="partner-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center border border-gray-200 focus-visible:ring-2 focus-visible:ring-primary-200 min-h-[160px]">
              <div className="w-full h-16 md:h-20 relative grayscale hover:grayscale-0 transition">
                <Image
                  src="/mitra/Kadin.jpg"
                  alt="Kamar Dagang dan Industri Indonesia"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 text-center">Kadin Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative cta-section">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 via-secondary-500 to-secondary-600" aria-hidden />
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t("homePage.cta.title")}</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl md:max-w-none mx-auto md:mx-0">
                {t("homePage.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                <Link
                  href="/booking"
                  aria-label="CTA booking"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-secondary px-6 py-3 font-semibold hover:bg-white/90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  {t("homePage.cta.bookingButton")}
                </Link>
                <Link
                  href="/contact"
                  aria-label="CTA contact"
                  className="inline-flex items-center justify-center rounded-lg border border-white/80 text-white px-6 py-3 font-semibold hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  {t("homePage.cta.contactButton")}
                </Link>
              </div>
            </div>
            <div>
              <div className="relative w-full h-56 md:h-72 lg:h-80">
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                  <Image
                    src="/CDD AND Fuso truck openat 00.21.04_1bc5335f.webp"
                    alt="Praba Samudra Logistics fleet"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}