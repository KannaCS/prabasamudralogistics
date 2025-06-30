"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function RoRoShippingPage() {
  const { t } = useLanguage();
  
  const cargoTypes = [
    {
      type: t("servicesPage.services.roroShipping.cargoTypes.personalVehicles.type"),
      examples: t("servicesPage.services.roroShipping.cargoTypes.personalVehicles.examples"),
      notes: t("servicesPage.services.roroShipping.cargoTypes.personalVehicles.notes")
    },
    {
      type: t("servicesPage.services.roroShipping.cargoTypes.motorcycles.type"),
      examples: t("servicesPage.services.roroShipping.cargoTypes.motorcycles.examples"),
      notes: t("servicesPage.services.roroShipping.cargoTypes.motorcycles.notes")
    },
    {
      type: t("servicesPage.services.roroShipping.cargoTypes.trucksAndBuses.type"),
      examples: t("servicesPage.services.roroShipping.cargoTypes.trucksAndBuses.examples"),
      notes: t("servicesPage.services.roroShipping.cargoTypes.trucksAndBuses.notes")
    },
    {
      type: t("servicesPage.services.roroShipping.cargoTypes.heavyEquipment.type"),
      examples: t("servicesPage.services.roroShipping.cargoTypes.heavyEquipment.examples"),
      notes: t("servicesPage.services.roroShipping.cargoTypes.heavyEquipment.notes")
    },
    {
      type: t("servicesPage.services.roroShipping.cargoTypes.generalCargo.type"),
      examples: t("servicesPage.services.roroShipping.cargoTypes.generalCargo.examples"),
      notes: t("servicesPage.services.roroShipping.cargoTypes.generalCargo.notes")
    }
  ];

  const routes = [
    {
      route: t("servicesPage.services.roroShipping.routes.jakartaSurabaya.route"),
      time: t("servicesPage.services.roroShipping.routes.jakartaSurabaya.time"),
      price: t("servicesPage.services.roroShipping.routes.jakartaSurabaya.price")
    },
    {
      route: t("servicesPage.services.roroShipping.routes.surabayaMakassar.route"),
      time: t("servicesPage.services.roroShipping.routes.surabayaMakassar.time"),
      price: t("servicesPage.services.roroShipping.routes.surabayaMakassar.price")
    },
    {
      route: t("servicesPage.services.roroShipping.routes.jakartaBatam.route"),
      time: t("servicesPage.services.roroShipping.routes.jakartaBatam.time"),
      price: t("servicesPage.services.roroShipping.routes.jakartaBatam.price")
    },
    {
      route: t("servicesPage.services.roroShipping.routes.jakartaBalikpapan.route"),
      time: t("servicesPage.services.roroShipping.routes.jakartaBalikpapan.time"),
      price: t("servicesPage.services.roroShipping.routes.jakartaBalikpapan.price")
    }
  ];

  const benefits = [
    {
      title: t("servicesPage.services.roroShipping.benefits.efficiency.title"),
      description: t("servicesPage.services.roroShipping.benefits.efficiency.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.roroShipping.benefits.safety.title"),
      description: t("servicesPage.services.roroShipping.benefits.safety.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.roroShipping.benefits.costEffective.title"),
      description: t("servicesPage.services.roroShipping.benefits.costEffective.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.roroShipping.benefits.expertise.title"),
      description: t("servicesPage.services.roroShipping.benefits.expertise.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: t("servicesPage.services.roroShipping.faqs.whatIsRoRo.question"),
      answer: t("servicesPage.services.roroShipping.faqs.whatIsRoRo.answer")
    },
    {
      question: t("servicesPage.services.roroShipping.faqs.vehiclePreparation.question"),
      answer: t("servicesPage.services.roroShipping.faqs.vehiclePreparation.answer")
    },
    {
      question: t("servicesPage.services.roroShipping.faqs.timeEstimation.question"),
      answer: t("servicesPage.services.roroShipping.faqs.timeEstimation.answer")
    },
    {
      question: t("servicesPage.services.roroShipping.faqs.insurance.question"),
      answer: t("servicesPage.services.roroShipping.faqs.insurance.answer")
    },
    {
      question: t("servicesPage.services.roroShipping.faqs.documentation.question"),
      answer: t("servicesPage.services.roroShipping.faqs.documentation.answer")
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image 
              src="/kapalrorojpg.webp" 
              alt={t("servicesPage.services.roroShipping.title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("servicesPage.services.roroShipping.title")}</h1>
            <p className="text-xl text-white/90 mb-8">
              {t("servicesPage.services.roroShipping.heroSubtitle")}
            </p>
            <Link 
              href="/booking" 
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-600 transition-colors"
            >
              {t("booking.submit")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("servicesPage.services.roroShipping.aboutTitle")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("servicesPage.services.roroShipping.aboutContent1")}
          </p>
          <p className="text-lg text-gray-700">
            {t("servicesPage.services.roroShipping.aboutContent2")}
          </p>
        </div>

        {/* Vehicle & Cargo Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.roroShipping.cargoTypesTitle")}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">{t("servicesPage.services.roroShipping.cargoTypesTable.type")}</th>
                  <th className="py-4 px-6 text-left font-semibold">{t("servicesPage.services.roroShipping.cargoTypesTable.examples")}</th>
                  <th className="py-4 px-6 text-left font-semibold">{t("servicesPage.services.roroShipping.cargoTypesTable.notes")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cargoTypes.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6">{item.type}</td>
                    <td className="py-4 px-6">{item.examples}</td>
                    <td className="py-4 px-6">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Route Estimation */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.roroShipping.routesTitle")}</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-8 text-center">
              {t("servicesPage.services.roroShipping.routesDescription")}
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold">{t("servicesPage.services.roroShipping.routesTable.route")}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t("servicesPage.services.roroShipping.routesTable.time")}</th>
                    <th className="py-4 px-6 text-left font-semibold">{t("servicesPage.services.roroShipping.routesTable.price")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {routes.map((route, index) => (
                    <tr key={index}>
                      <td className="py-4 px-6">{route.route}</td>
                      <td className="py-4 px-6">{route.time}</td>
                      <td className="py-4 px-6">{route.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 italic">
              {t("servicesPage.services.roroShipping.priceDisclaimer")}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.roroShipping.benefitsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.roroShipping.faqsTitle")}</h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.services.roroShipping.ctaTitle")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.services.roroShipping.ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/booking" 
              className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              {t("booking.submit")}
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white/10 transition-colors"
            >
              {t("homePage.cta.contactButton")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 