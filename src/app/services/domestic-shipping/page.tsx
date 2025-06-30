"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function DomesticShippingPage() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t("servicesPage.services.domesticShipping.servicesList.landShipping.title"),
      description: t("servicesPage.services.domesticShipping.servicesList.landShipping.description"),
      image: "/Tronton Isuzu With Cargo.webp"
    },
    {
      title: t("servicesPage.services.domesticShipping.servicesList.seaShipping.title"),
      description: t("servicesPage.services.domesticShipping.servicesList.seaShipping.description"),
      image: "/Kapal Cargo Container HD.webp"
    },
    {
      title: t("servicesPage.services.domesticShipping.servicesList.airShipping.title"),
      description: t("servicesPage.services.domesticShipping.servicesList.airShipping.description"),
      image: "/Forktift Loading Into Truck ,.webp"
    },
    {
      title: t("servicesPage.services.domesticShipping.servicesList.projectCargo.title"),
      description: t("servicesPage.services.domesticShipping.servicesList.projectCargo.description"),
      image: "/Trailer With Load.webp"
    }
  ];

  const benefits = [
    {
      title: t("servicesPage.services.domesticShipping.benefits.wideNetwork.title"),
      description: t("servicesPage.services.domesticShipping.benefits.wideNetwork.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.domesticShipping.benefits.competitive.title"),
      description: t("servicesPage.services.domesticShipping.benefits.competitive.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.domesticShipping.benefits.tracking.title"),
      description: t("servicesPage.services.domesticShipping.benefits.tracking.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.domesticShipping.benefits.safety.title"),
      description: t("servicesPage.services.domesticShipping.benefits.safety.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const destinations = [
    { name: t("servicesPage.services.domesticShipping.destinations.java"), value: 35 },
    { name: t("servicesPage.services.domesticShipping.destinations.sumatra"), value: 25 },
    { name: t("servicesPage.services.domesticShipping.destinations.kalimantan"), value: 15 },
    { name: t("servicesPage.services.domesticShipping.destinations.sulawesi"), value: 10 },
    { name: t("servicesPage.services.domesticShipping.destinations.bali"), value: 8 },
    { name: t("servicesPage.services.domesticShipping.destinations.papua"), value: 5 },
    { name: t("servicesPage.services.domesticShipping.destinations.others"), value: 2 }
  ];

  const faqs = [
    {
      question: t("servicesPage.services.domesticShipping.faqs.cost.question"),
      answer: t("servicesPage.services.domesticShipping.faqs.cost.answer")
    },
    {
      question: t("servicesPage.services.domesticShipping.faqs.delivery.question"),
      answer: t("servicesPage.services.domesticShipping.faqs.delivery.answer")
    },
    {
      question: t("servicesPage.services.domesticShipping.faqs.track.question"),
      answer: t("servicesPage.services.domesticShipping.faqs.track.answer")
    },
    {
      question: t("servicesPage.services.domesticShipping.faqs.insurance.question"),
      answer: t("servicesPage.services.domesticShipping.faqs.insurance.answer")
    },
    {
      question: t("servicesPage.services.domesticShipping.faqs.remoteAreas.question"),
      answer: t("servicesPage.services.domesticShipping.faqs.remoteAreas.answer")
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
              src="/Kapal Cargo Stock Photo.webp" 
              alt={t("servicesPage.services.domesticShipping.title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("servicesPage.services.domesticShipping.title")}</h1>
            <p className="text-xl text-white/90 mb-8">
              {t("servicesPage.services.domesticShipping.heroSubtitle")}
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
          <h2 className="text-3xl font-bold mb-6 text-center">{t("servicesPage.services.domesticShipping.aboutTitle")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("servicesPage.services.domesticShipping.aboutContent1")}
          </p>
          <p className="text-lg text-gray-700">
            {t("servicesPage.services.domesticShipping.aboutContent2")}
          </p>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.domesticShipping.servicesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.domesticShipping.benefitsTitle")}</h2>
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

        {/* Coverage */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.domesticShipping.coverageTitle")}</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-8 text-center">
              {t("servicesPage.services.domesticShipping.coverageDescription")}
            </p>
            
            {/* Destinations Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t("servicesPage.services.domesticShipping.destinationDistribution")}</h3>
                <div className="space-y-4">
                  {destinations.map((dest, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{dest.name}</span>
                        <span>{dest.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${dest.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{t("servicesPage.services.domesticShipping.serviceCapabilities")}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>{t("servicesPage.services.domesticShipping.capabilities.major")}</li>
                  <li>{t("servicesPage.services.domesticShipping.capabilities.remote")}</li>
                  <li>{t("servicesPage.services.domesticShipping.capabilities.interisland")}</li>
                  <li>{t("servicesPage.services.domesticShipping.capabilities.express")}</li>
                  <li>{t("servicesPage.services.domesticShipping.capabilities.regular")}</li>
                  <li>{t("servicesPage.services.domesticShipping.capabilities.special")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.domesticShipping.faqsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.services.domesticShipping.ctaTitle")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.services.domesticShipping.ctaSubtitle")}
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