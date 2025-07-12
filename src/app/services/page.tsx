"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: "freight-forwarding",
      title: t("servicesPage.services.freightForwarding.title"),
      description: t("servicesPage.services.freightForwarding.description"),
      image: "/Tronton With Load Hd_.webp",
      features: t("servicesPage.services.freightForwarding.features"),
    },
    {
      id: "truck-rental",
      title: t("servicesPage.services.truckRental.title"),
      description: t("servicesPage.services.truckRental.description"),
      image: "/Truck Fuso .webp",
      features: t("servicesPage.services.truckRental.features"),
    },
    {
      id: "ship-rental",
      title: t("servicesPage.services.shipRental.title"),
      description: t("servicesPage.services.shipRental.description"),
      image: "/Kapal Cargo Stock Photo.webp",
      features: t("servicesPage.services.shipRental.features"),
    },
    {
      id: "export-import",
      title: t("servicesPage.services.exportImport.title"),
      description: t("servicesPage.services.exportImport.description"),
      image: "/Tronton 1 with Container on.webp",
      features: t("servicesPage.services.exportImport.features"),
    },
    {
      id: "domestic-shipping",
      title: t("servicesPage.services.domesticShipping.title"),
      description: t("servicesPage.services.domesticShipping.description"),
      image: "/Tronton Isuzu With Cargo.webp",
      features: t("servicesPage.services.domesticShipping.features"),
    },
    {
      id: "roro-shipping",
      title: t("servicesPage.services.roroShipping.title"),
      description: t("servicesPage.services.roroShipping.description"),
      image: "/Kapal lct.webp",
      features: t("servicesPage.services.roroShipping.features"),
    },
    {
      id: "vehicle-shipping",
      title: t("servicesPage.services.vehicleShipping.title"),
      description: t("servicesPage.services.vehicleShipping.description"),
      image: "/Trailer Hino .webp",
      features: t("servicesPage.services.vehicleShipping.features"),
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("servicesPage.hero.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("servicesPage.hero.subtitle")}
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-gray-300 w-full h-full relative">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-primary">{service.title}</h2>
                <p className="text-gray-700 mb-6 text-lg">{service.description}</p>
                
                <h3 className="font-semibold text-xl mb-4">{t("servicesPage.featureTitle")}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {Array.isArray(service.features) && service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-6 w-6 text-primary flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/services/${service.id}`}
                  className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  {t("servicesPage.learnMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-primary text-white p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">{t("servicesPage.cta.title")}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            {t("servicesPage.cta.subtitle")}
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
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-primary transition-colors"
            >
              {t("servicesPage.cta.bookingButton")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 