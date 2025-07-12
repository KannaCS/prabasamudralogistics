"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ExportImportPage() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t("servicesPage.services.exportImport.servicesList.exportDocs.title"),
      description: t("servicesPage.services.exportImport.servicesList.exportDocs.description"),
      image: "/Kapal Cargo Container HD.webp"
    },
    {
      title: t("servicesPage.services.exportImport.servicesList.importDocs.title"),
      description: t("servicesPage.services.exportImport.servicesList.importDocs.description"),
      image: "/Isuzu  Container Truck with Loading On .webp"
    },
    {
      title: t("servicesPage.services.exportImport.servicesList.customs.title"),
      description: t("servicesPage.services.exportImport.servicesList.customs.description"),
      image: "/Forktift Loading Into Truck ,.webp"
    },
    {
      title: t("servicesPage.services.exportImport.servicesList.consultation.title"),
      description: t("servicesPage.services.exportImport.servicesList.consultation.description"),
      image: "/john-simmons-N7_NUUtCkDU-unsplash.webp"
    }
  ];

  const benefits = [
    {
      title: t("servicesPage.services.exportImport.benefits.fastProcess.title"),
      description: t("servicesPage.services.exportImport.benefits.fastProcess.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.exportImport.benefits.compliance.title"),
      description: t("servicesPage.services.exportImport.benefits.compliance.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.exportImport.benefits.globalNetwork.title"),
      description: t("servicesPage.services.exportImport.benefits.globalNetwork.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.exportImport.benefits.transparency.title"),
      description: t("servicesPage.services.exportImport.benefits.transparency.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: t("servicesPage.services.exportImport.faqs.requiredDocs.question"),
      answer: t("servicesPage.services.exportImport.faqs.requiredDocs.answer")
    },
    {
      question: t("servicesPage.services.exportImport.faqs.clearanceTime.question"),
      answer: t("servicesPage.services.exportImport.faqs.clearanceTime.answer")
    },
    {
      question: t("servicesPage.services.exportImport.faqs.restrictedGoods.question"),
      answer: t("servicesPage.services.exportImport.faqs.restrictedGoods.answer")
    },
    {
      question: t("servicesPage.services.exportImport.faqs.customsDuty.question"),
      answer: t("servicesPage.services.exportImport.faqs.customsDuty.answer")
    },
    {
      question: t("servicesPage.services.exportImport.faqs.doorToDoor.question"),
      answer: t("servicesPage.services.exportImport.faqs.doorToDoor.answer")
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
              src="/Tronton 1 with Container on.webp" 
              alt={t("servicesPage.services.exportImport.title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("servicesPage.services.exportImport.title")}</h1>
            <p className="text-xl text-white/90 mb-8">
              {t("servicesPage.services.exportImport.heroSubtitle")}
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
          <h2 className="text-3xl font-bold mb-6 text-center">{t("servicesPage.services.exportImport.aboutTitle")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("servicesPage.services.exportImport.aboutContent1")}
          </p>
          <p className="text-lg text-gray-700">
            {t("servicesPage.services.exportImport.aboutContent2")}
          </p>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.exportImport.servicesTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.exportImport.benefitsTitle")}</h2>
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

        {/* Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.exportImport.processTitle")}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[21px] top-0 bottom-0 w-[2px] bg-primary/20 z-0 md:left-1/2 md:ml-[-1px]"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative z-10 flex items-center md:justify-end md:pl-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.exportImport.process.step1.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.exportImport.process.step1.description")}</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative z-10 flex items-center md:justify-start md:pr-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:order-1 md:ml-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.exportImport.process.step2.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.exportImport.process.step2.description")}</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative z-10 flex items-center md:justify-end md:pl-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.exportImport.process.step3.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.exportImport.process.step3.description")}</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative z-10 flex items-center md:justify-start md:pr-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:order-1 md:ml-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.exportImport.process.step4.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.exportImport.process.step4.description")}</p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative z-10 flex items-center md:justify-end md:pl-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.exportImport.process.step5.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.exportImport.process.step5.description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.exportImport.faqsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.services.exportImport.ctaTitle")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.services.exportImport.ctaSubtitle")}
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