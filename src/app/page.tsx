"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { initAnimations } from "@/lib/animations";

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    initAnimations('home');
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">
                {t("homePage.hero.title")}
              </h1>
              <p className="hero-subtitle text-lg mb-8">
                {t("homePage.hero.subtitle")}
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/booking" 
                  className="bg-secondary text-white px-6 py-3 rounded-md font-medium text-center hover:bg-secondary-600 transition-colors"
                >
                  {t("homePage.hero.bookingButton")}
                </Link>
                <Link 
                  href="/tracking" 
                  className="bg-white text-primary-500 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
                >
                  {t("homePage.hero.trackingButton")}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="hero-image relative w-full h-80 md:h-96">
                <Image
                  src="/gambarkapalpraba.webp"
                  alt="Praba Samudra Logistics Services"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("homePage.about.title")}</h2>
            <p className="text-lg text-gray-600">
              {t("homePage.about.content1")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                {t("homePage.about.content2")}
              </p>
              <p className="text-gray-600 mb-4">
                {t("homePage.about.content3")}
              </p>
              <p className="text-gray-600">
                {t("homePage.about.content4")}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-primary mb-2">{t("homePage.about.vision")}</h3>
                <p>{t("homePage.about.visionContent")}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-primary mb-2">{t("homePage.about.mission")}</h3>
                <p>{t("homePage.about.missionContent")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("homePage.services.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <div className="service-icon w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="service-title text-xl font-semibold mb-2">{t("homePage.services.truckRental")}</h3>
              <p className="service-description text-gray-600">{t("homePage.services.truckRentalDesc")}</p>
            </div>
            
            {/* Service 2 */}
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <div className="service-icon w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="service-title text-xl font-semibold mb-2">{t("homePage.services.shipping")}</h3>
              <p className="service-description text-gray-600">{t("homePage.services.shippingDesc")}</p>
            </div>
            
            {/* Service 3 */}
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <div className="service-icon w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="service-title text-xl font-semibold mb-2">{t("homePage.services.shipRental")}</h3>
              <p className="service-description text-gray-600">{t("homePage.services.shipRentalDesc")}</p>
            </div>
            
            {/* Service 4 */}
            <div className="service-card bg-white p-6 rounded-lg shadow-md">
              <div className="service-icon w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="service-title text-xl font-semibold mb-2">{t("homePage.services.exportImport")}</h3>
              <p className="service-description text-gray-600">{t("homePage.services.exportImportDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("homePage.clients.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
              <div key={index} className="client-card bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-center text-center">
                <p className="text-sm font-medium text-gray-700">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{t("homePage.cta.title")}</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            {t("homePage.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="btn bg-white text-secondary px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition-colors"
            >
              {t("homePage.cta.bookingButton")}
            </Link>
            <Link
              href="/contact"
              className="btn bg-transparent text-white border border-white px-6 py-3 rounded-md font-medium text-center hover:bg-white/10 transition-colors"
            >
              {t("homePage.cta.contactButton")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 