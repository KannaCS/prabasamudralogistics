"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function FreightForwardingPage() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t("servicesPage.services.freightForwarding.servicesList.seaFreight.title"),
      description: t("servicesPage.services.freightForwarding.servicesList.seaFreight.description"),
      image: "/Kapal Cargo Container HD.jpg"
    },
    {
      title: t("servicesPage.services.freightForwarding.servicesList.landTransport.title"),
      description: t("servicesPage.services.freightForwarding.servicesList.landTransport.description"),
      image: "/Tronton _ Trailer With Load HD .jpg"
    },
    {
      title: t("servicesPage.services.freightForwarding.servicesList.airFreight.title"),
      description: t("servicesPage.services.freightForwarding.servicesList.airFreight.description"),
      image: "/Hino Truck Long.jpg"
    },
    {
      title: t("servicesPage.services.freightForwarding.servicesList.cargoConsolidation.title"),
      description: t("servicesPage.services.freightForwarding.servicesList.cargoConsolidation.description"),
      image: "/Forktift Loading Into Truck ,.jpg"
    },
    {
      title: t("servicesPage.services.freightForwarding.servicesList.customs.title"),
      description: t("servicesPage.services.freightForwarding.servicesList.customs.description"),
      image: "/Hino Trailer with loading on.jpg"
    },
    {
      title: t("servicesPage.services.freightForwarding.servicesList.insurance.title"),
      description: t("servicesPage.services.freightForwarding.servicesList.insurance.description"),
      image: "/Trailer , With Load Fuso.jpg"
    }
  ];

  const benefits = [
    {
      title: t("servicesPage.services.freightForwarding.benefits.global.title"),
      description: t("servicesPage.services.freightForwarding.benefits.global.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.freightForwarding.benefits.customized.title"),
      description: t("servicesPage.services.freightForwarding.benefits.customized.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.freightForwarding.benefits.efficient.title"),
      description: t("servicesPage.services.freightForwarding.benefits.efficient.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.freightForwarding.benefits.experts.title"),
      description: t("servicesPage.services.freightForwarding.benefits.experts.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: t("servicesPage.services.freightForwarding.faqs.services.question"),
      answer: t("servicesPage.services.freightForwarding.faqs.services.answer")
    },
    {
      question: t("servicesPage.services.freightForwarding.faqs.cost.question"),
      answer: t("servicesPage.services.freightForwarding.faqs.cost.answer")
    },
    {
      question: t("servicesPage.services.freightForwarding.faqs.time.question"),
      answer: t("servicesPage.services.freightForwarding.faqs.time.answer")
    },
    {
      question: t("servicesPage.services.freightForwarding.faqs.track.question"),
      answer: t("servicesPage.services.freightForwarding.faqs.track.answer")
    },
    {
      question: t("servicesPage.services.freightForwarding.faqs.international.question"),
      answer: t("servicesPage.services.freightForwarding.faqs.international.answer")
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
              src="/Tronton With Load Hd_.jpg" 
              alt={t("servicesPage.services.freightForwarding.title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("servicesPage.services.freightForwarding.title")}</h1>
            <p className="text-xl text-white/90 mb-8">
              {t("servicesPage.services.freightForwarding.heroSubtitle")}
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
          <h2 className="text-3xl font-bold mb-6 text-center">{t("servicesPage.services.freightForwarding.aboutTitle")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("servicesPage.services.freightForwarding.aboutContent1")}
          </p>
          <p className="text-lg text-gray-700">
            {t("servicesPage.services.freightForwarding.aboutContent2")}
          </p>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.freightForwarding.servicesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48">
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
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.freightForwarding.benefitsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.freightForwarding.processTitle")}</h2>
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
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.freightForwarding.process.step1.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.freightForwarding.process.step1.description")}</p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative z-10 flex items-center md:justify-start md:pr-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:order-1 md:ml-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.freightForwarding.process.step2.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.freightForwarding.process.step2.description")}</p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative z-10 flex items-center md:justify-end md:pl-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.freightForwarding.process.step3.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.freightForwarding.process.step3.description")}</p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative z-10 flex items-center md:justify-start md:pr-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:order-1 md:ml-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.freightForwarding.process.step4.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.freightForwarding.process.step4.description")}</p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative z-10 flex items-center md:justify-end md:pl-12">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-4 md:absolute md:left-1/2 md:ml-[-20px]">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md md:w-[calc(50%-40px)]">
                    <h3 className="font-semibold text-lg mb-2">{t("servicesPage.services.freightForwarding.process.step5.title")}</h3>
                    <p className="text-gray-600">{t("servicesPage.services.freightForwarding.process.step5.description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.freightForwarding.faqsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.services.freightForwarding.ctaTitle")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.services.freightForwarding.ctaSubtitle")}
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
