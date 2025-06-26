"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function TruckRentalPage() {
  const { t } = useLanguage();
  
  const truckTypes = [
    {
      name: t("servicesPage.services.truckRental.truckTypes.cdd.name"),
      capacity: "4-8 ton",
      dimensions: "4.2 x 1.8 x 1.8 m",
      description: t("servicesPage.services.truckRental.truckTypes.cdd.description"),
      image: "/CDD AND Fuso truck openat 00.21.04_1bc5335f.jpg"
    },
    {
      name: t("servicesPage.services.truckRental.truckTypes.fuso.name"),
      capacity: "8-16 ton",
      dimensions: "6.0 x 2.4 x 2.2 m",
      description: t("servicesPage.services.truckRental.truckTypes.fuso.description"),
      image: "/Tronton Fuso.jpg"
    },
    {
      name: t("servicesPage.services.truckRental.truckTypes.tronton.name"),
      capacity: "20-30 ton",
      dimensions: "9.5 x 2.5 x 2.5 m",
      description: t("servicesPage.services.truckRental.truckTypes.tronton.description"),
      image: "/Tronton With Load , HD.jpg"
    },
    {
      name: t("servicesPage.services.truckRental.truckTypes.wingbox.name"),
      capacity: "5-15 ton",
      dimensions: "6.0 x 2.4 x 2.3 m",
      description: t("servicesPage.services.truckRental.truckTypes.wingbox.description"),
      image: "/Fuso Wingbox.jpg"
    }
  ];

  const benefits = [
    {
      title: t("servicesPage.services.truckRental.benefits.fleet.title"),
      description: t("servicesPage.services.truckRental.benefits.fleet.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.truckRental.benefits.drivers.title"),
      description: t("servicesPage.services.truckRental.benefits.drivers.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.truckRental.benefits.tracking.title"),
      description: t("servicesPage.services.truckRental.benefits.tracking.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: t("servicesPage.services.truckRental.benefits.safety.title"),
      description: t("servicesPage.services.truckRental.benefits.safety.description"),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: t("servicesPage.services.truckRental.faqs.rental.question"),
      answer: t("servicesPage.services.truckRental.faqs.rental.answer")
    },
    {
      question: t("servicesPage.services.truckRental.faqs.availability.question"),
      answer: t("servicesPage.services.truckRental.faqs.availability.answer")
    },
    {
      question: t("servicesPage.services.truckRental.faqs.driver.question"),
      answer: t("servicesPage.services.truckRental.faqs.driver.answer")
    },
    {
      question: t("servicesPage.services.truckRental.faqs.insurance.question"),
      answer: t("servicesPage.services.truckRental.faqs.insurance.answer")
    },
    {
      question: t("servicesPage.services.truckRental.faqs.booking.question"),
      answer: t("servicesPage.services.truckRental.faqs.booking.answer")
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
              src="/Truck Fuso .jpg" 
              alt={t("servicesPage.services.truckRental.title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("servicesPage.services.truckRental.title")}</h1>
            <p className="text-xl text-white/90 mb-8">
              {t("servicesPage.services.truckRental.heroSubtitle")}
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
          <h2 className="text-3xl font-bold mb-6 text-center">{t("servicesPage.services.truckRental.aboutTitle")}</h2>
          <p className="text-lg text-gray-700 mb-6">
            {t("servicesPage.services.truckRental.aboutContent1")}
          </p>
          <p className="text-lg text-gray-700">
            {t("servicesPage.services.truckRental.aboutContent2")}
          </p>
        </div>

        {/* Truck Types */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.truckRental.truckTypesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {truckTypes.map((truck, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image 
                    src={truck.image} 
                    alt={truck.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{truck.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{t("servicesPage.services.truckRental.capacity")}</p>
                      <p className="font-medium">{truck.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("servicesPage.services.truckRental.dimensions")}</p>
                      <p className="font-medium">{truck.dimensions}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{truck.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.truckRental.benefitsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.truckRental.additionalServicesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("servicesPage.services.truckRental.additionalServices.express.title")}</h3>
              <p className="text-gray-600">{t("servicesPage.services.truckRental.additionalServices.express.description")}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("servicesPage.services.truckRental.additionalServices.multiCity.title")}</h3>
              <p className="text-gray-600">{t("servicesPage.services.truckRental.additionalServices.multiCity.description")}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("servicesPage.services.truckRental.additionalServices.insurance.title")}</h3>
              <p className="text-gray-600">{t("servicesPage.services.truckRental.additionalServices.insurance.description")}</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("servicesPage.services.truckRental.faqsTitle")}</h2>
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
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.services.truckRental.ctaTitle")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.services.truckRental.ctaSubtitle")}
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
