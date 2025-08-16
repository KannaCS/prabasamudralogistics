"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { initAnimations } from "@/lib/animations";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  category: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  all: "Semua",
  logistics: "Logistik",
  sea: "Laut",
  customs: "Bea Cukai",
  domestic: "Domestik",
  vehicle: "Kendaraan",
};

export default function ServicesPage() {
  const { t } = useLanguage();

  useEffect(() => {
    initAnimations("services");
  }, []);

  const baseServices: Service[] = useMemo(
    () => [
      {
        id: "freight-forwarding",
        title: t("servicesPage.services.freightForwarding.title"),
        description: t("servicesPage.services.freightForwarding.description"),
        image: "/Tronton With Load Hd_.webp",
        features: t("servicesPage.services.freightForwarding.features") as unknown as string[],
        category: "logistics",
      },
      {
        id: "truck-rental",
        title: t("servicesPage.services.truckRental.title"),
        description: t("servicesPage.services.truckRental.description"),
        image: "/Truck Fuso .webp",
        features: t("servicesPage.services.truckRental.features") as unknown as string[],
        category: "logistics",
      },
      {
        id: "ship-rental",
        title: t("servicesPage.services.shipRental.title"),
        description: t("servicesPage.services.shipRental.description"),
        image: "/Kapal Cargo Stock Photo.webp",
        features: t("servicesPage.services.shipRental.features") as unknown as string[],
        category: "sea",
      },
      {
        id: "export-import",
        title: t("servicesPage.services.exportImport.title"),
        description: t("servicesPage.services.exportImport.description"),
        image: "/Tronton 1 with Container on.webp",
        features: t("servicesPage.services.exportImport.features") as unknown as string[],
        category: "customs",
      },
      {
        id: "domestic-shipping",
        title: t("servicesPage.services.domesticShipping.title"),
        description: t("servicesPage.services.domesticShipping.description"),
        image: "/Tronton Isuzu With Cargo.webp",
        features: t("servicesPage.services.domesticShipping.features") as unknown as string[],
        category: "domestic",
      },
      {
        id: "roro-shipping",
        title: t("servicesPage.services.roroShipping.title"),
        description: t("servicesPage.services.roroShipping.description"),
        image: "/Kapal lct.webp",
        features: t("servicesPage.services.roroShipping.features") as unknown as string[],
        category: "sea",
      },
      {
        id: "vehicle-shipping",
        title: t("servicesPage.services.vehicleShipping.title"),
        description: t("servicesPage.services.vehicleShipping.description"),
        image: "/Trailer Hino .webp",
        features: t("servicesPage.services.vehicleShipping.features") as unknown as string[],
        category: "vehicle",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  );

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>(["all", ...baseServices.map((s) => s.category)]);
    return Array.from(set);
  }, [baseServices]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return baseServices.filter((s) => {
      const inCat = activeCategory === "all" || s.category === activeCategory;
      if (!inCat) return false;
      if (!q) return true;
      const hay = `${s.title} ${s.description} ${(s.features || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, query, baseServices]);

  return (
    <div className="services-page relative">
      {/* Hero with gradient background */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" aria-hidden />
        <div
          className="pointer-events-none absolute -inset-32 opacity-40 blur-3xl mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(40% 40% at 20% 20%, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0) 60%), radial-gradient(35% 35% at 80% 30%, rgba(16,185,129,0.32) 0%, rgba(16,185,129,0) 60%), radial-gradient(45% 45% at 50% 80%, rgba(14,165,233,0.28) 0%, rgba(14,165,233,0) 60%)',
            backgroundSize: '140% 140%, 140% 140%, 140% 140%',
            backgroundPosition: '0% 0%, 100% 0%, 50% 100%',
            willChange: 'transform, background-position',
          }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t("servicesPage.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl">
            {t("servicesPage.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-slate-950 text-white/90 border-b border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400/60 ${
                  activeCategory === cat
                    ? "bg-primary-500 border-primary-400 text-white shadow-sm"
                    : "border-white/15 bg-white/5 hover:border-white/30 text-white/85"
                }`}
                aria-pressed={activeCategory === cat}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-96">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder={t("servicesPage.searchPlaceholder") || "Cari layanan..."}
              className="w-full rounded-lg bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400/70"
              aria-label="Search services"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-14">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-gray-600">{filtered.length} layanan</div>
          {filtered.length === 0 ? (
            <p className="text-center text-gray-600">{t("common.noResults") || "No services match your search."}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((service) => (
                <div key={service.id} className="service-card group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:ring-1 hover:ring-primary-200/60 transition-all duration-200 hover:-translate-y-0.5 focus-within:shadow-md focus-within:outline-none flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {CATEGORY_LABELS[service.category] || service.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">{service.description}</p>
                    {Array.isArray(service.features) && service.features.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-600 transition-colors"
                        aria-label={`${t("servicesPage.learnMore")} ${service.title}`}
                      >
                        {t("servicesPage.learnMore")}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </Link>
                      <Link href="/booking" className="text-sm font-medium text-primary hover:text-primary-700">
                        {t("common.getQuote") || "Get quote"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
            <div className="relative z-10 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-3">{t("servicesPage.cta.title")}</h2>
              <p className="text-white/90 max-w-3xl mb-6">{t("servicesPage.cta.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex justify-center px-6 py-3 rounded-md bg-white text-primary font-semibold hover:bg-white/90"
                >
                  {t("servicesPage.cta.contactButton")}
                </Link>
                <Link
                  href="/booking"
                  className="inline-flex justify-center px-6 py-3 rounded-md border-2 border-white text-white font-semibold hover:bg-white hover:text-primary"
                >
                  {t("servicesPage.cta.bookingButton")}
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-20 opacity-30 blur-3xl mix-blend-overlay" aria-hidden style={{
              backgroundImage:
                'radial-gradient(40% 40% at 20% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%), radial-gradient(35% 35% at 80% 30%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 60%)'
            }} />
          </div>
        </div>
      </section>
    </div>
  );
}