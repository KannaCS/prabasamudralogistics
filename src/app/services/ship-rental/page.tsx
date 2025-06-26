"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ShipRentalPage() {
  const { t } = useLanguage();

  const shipTypes = [
    {
      name: "LCT Small",
      capacity: "500-1000 ton",
      dimensions: "45 x 12 x 3.5 m",
      description: t("servicesPage.services.shipRental.shipTypes.small"),
      image: "/Kapal lct.png"
    },
    {
      name: "LCT Medium",
      capacity: "1000-2000 ton",
      dimensions: "60 x 15 x 4 m",
      description: t("servicesPage.services.shipRental.shipTypes.medium"),
      image: "/Kapal lct.png"
    },
    {
      name: "LCT Large",
      capacity: "2000-3000 ton",
      dimensions: "75 x 18 x 4.5 m",
      description: t("servicesPage.services.shipRental.shipTypes.large"),
      image: "/gambarkapalpraba.png"
    },
    {
      name: "LCT Extra Large",
      capacity: "3000+ ton",
      dimensions: "90 x 20 x 5 m",
      description: t("servicesPage.services.shipRental.shipTypes.extraLarge"),
      image: "/gambarkapalpraba.png"
    }
  ];

  const benefits = [
    {
      title: t("servicesPage.services.shipRental.benefits.maintainedFleet.title"),
      description: t("servicesPage.services.shipRental.benefits.maintainedFleet.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.shipRental.benefits.experiencedCrew.title"),
      description: t("servicesPage.services.shipRental.benefits.experiencedCrew.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.shipRental.benefits.wideReach.title"),
      description: t("servicesPage.services.shipRental.benefits.wideReach.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.shipRental.benefits.logisticsSupport.title"),
      description: t("servicesPage.services.shipRental.benefits.logisticsSupport.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: t("servicesPage.services.shipRental.faqs.howToRent.question"),
      answer: t("servicesPage.services.shipRental.faqs.howToRent.answer")
    },
    {
      question: t("servicesPage.services.shipRental.faqs.minimumTime.question"),
      answer: t("servicesPage.services.shipRental.faqs.minimumTime.answer")
    },
    {
      question: t("servicesPage.services.shipRental.faqs.operationAreas.question"),
      answer: t("servicesPage.services.shipRental.faqs.operationAreas.answer")
    },
    {
      question: t("servicesPage.services.shipRental.faqs.insurance.question"),
      answer: t("servicesPage.services.shipRental.faqs.insurance.answer")
    },
    {
      question: t("servicesPage.services.shipRental.faqs.loadingProcess.question"),
      answer: t("servicesPage.services.shipRental.faqs.loadingProcess.answer")
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
              src="/Kapal Cargo Stock Photo.jpg" 
              alt={t("servicesPage.services.shipRental.title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("servicesPage.services.shipRental.title")}</h1>
            <p className="text-xl text-white/90 mb-8">
              {t("servicesPage.services.shipRental.heroSubtitle")}
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
          <h2 className="text-3xl font-bold mb-6 text-center">{t("servicesPage.services.shipRental.aboutTitle")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("servicesPage.services.shipRental.aboutContent1")}
          </p>
          <p className="text-lg text-gray-700">
            {t("servicesPage.services.shipRental.aboutContent2")}
          </p>
        </div>

        {/* Ship Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.shipRental.shipTypesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shipTypes.map((ship, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image 
                    src={ship.image} 
                    alt={ship.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{ship.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{t("servicesPage.services.shipRental.capacity")}</p>
                      <p className="font-medium">{ship.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("servicesPage.services.shipRental.dimensions")}</p>
                      <p className="font-medium">{ship.dimensions}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{ship.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.shipRental.benefitsTitle")}</h2>
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

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.shipRental.additionalServicesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("servicesPage.services.shipRental.additionalServices.cargoInsurance.title")}</h3>
              <p className="text-gray-600">{t("servicesPage.services.shipRental.additionalServices.cargoInsurance.description")}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("servicesPage.services.shipRental.additionalServices.routePlanning.title")}</h3>
              <p className="text-gray-600">{t("servicesPage.services.shipRental.additionalServices.routePlanning.description")}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("servicesPage.services.shipRental.additionalServices.support.title")}</h3>
              <p className="text-gray-600">{t("servicesPage.services.shipRental.additionalServices.support.description")}</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.shipRental.faqsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.services.shipRental.ctaTitle")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.services.shipRental.ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              {t("servicesPage.cta.contactButton")}
            </Link>
            <Link 
              href="/booking"
              className="px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary-600 transition-colors"
            >
              {t("servicesPage.cta.bookingButton")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 