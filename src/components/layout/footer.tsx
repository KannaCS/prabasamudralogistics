"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { footerAnimations } from "@/lib/animations";

export default function Footer() {
  const { t } = useLanguage();

  useEffect(() => {
    // Initialize footer animations
    footerAnimations.slideUpOnScroll('footer');
    footerAnimations.staggerColumns('.footer-column');
  }, []);
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-4">PRABA SAMUDRA LOGISTICS</h3>
            <p className="mb-4">
              {t("footer.aboutText")}
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.facebook.com/share/19mqvBUfsa/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/prabasamudralogistics?igsh=cHhtMWg3enI5OTMy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://x.com/prabalogistics?s=21" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors" aria-label="Twitter/X">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">{t("paymentMethods.title")}</h4>
              <p className="text-gray-400 text-sm mb-3">{t("paymentMethods.description")}</p>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white rounded p-2 shadow-sm flex items-center justify-center h-12 w-12">
                  <Image
                    src="/metode/visa.jpg"
                    alt={t("paymentMethods.methods.visa")}
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white rounded p-2 shadow-sm flex items-center justify-center h-12 w-12">
                  <Image
                    src="/metode/mastercard.jpg"
                    alt={t("paymentMethods.methods.mastercard")}
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white rounded p-2 shadow-sm flex items-center justify-center h-12 w-12">
                  <Image
                    src="/metode/jcb.jpg"
                    alt={t("paymentMethods.methods.jcb")}
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white rounded p-2 shadow-sm flex items-center justify-center h-12 w-12">
                  <Image
                    src="/metode/alipay.jpg"
                    alt={t("paymentMethods.methods.alipay")}
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
                <div className="bg-white rounded p-2 shadow-sm flex items-center justify-center h-12 w-12">
                  <Image
                    src="/metode/gpn.jpg"
                    alt={t("paymentMethods.methods.gpn")}
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  {t("menu.home")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary transition-colors">
                  {t("menu.services")}
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-secondary transition-colors">
                  {t("menu.tracking")}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-secondary transition-colors">
                  {t("menu.booking")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  {t("menu.contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-4">{t("footer.services")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/freight-forwarding" className="hover:text-secondary transition-colors">
                  {t("servicesPage.services.freightForwarding.title")}
                </Link>
              </li>
              <li>
                <Link href="/services/truck-rental" className="hover:text-secondary transition-colors">
                  {t("servicesPage.services.truckRental.title")}
                </Link>
              </li>
              <li>
                <Link href="/services/ship-rental" className="hover:text-secondary transition-colors">
                  {t("servicesPage.services.shipRental.title")}
                </Link>
              </li>
              <li>
                <Link href="/services/export-import" className="hover:text-secondary transition-colors">
                  {t("servicesPage.services.exportImport.title")}
                </Link>
              </li>
              <li>
                <Link href="/services/domestic-shipping" className="hover:text-secondary transition-colors">
                  {t("servicesPage.services.domesticShipping.title")}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-4">{t("footer.contact")}</h3>
            <address className="not-italic">
              <p className="mb-2">PT. Praba Samudra Logistics</p>
              <p className="mb-2">Jalan Raya Kelapa Hybrida Blok PF18 No.30, Pegangsaan Dua, Kelapa Gading, RT.011/RW.012 14250 Daerah Khusus Ibukota Jakarta Indonesia</p>
              <p className="mb-2">
                <span className="font-semibold">{t("footer.email")}:</span>{" "}
                <a href="mailto:ops@prabasamudralogistics.com" className="hover:text-secondary block">
                  ops@prabasamudralogistics.com
                </a>
                <a href="mailto:marketing@prabasamudralogistics.com" className="hover:text-secondary block">
                  marketing@prabasamudralogistics.com
                </a>
                <a href="mailto:prabasamudralogistics@gmail.com" className="hover:text-secondary block">
                  prabasamudralogistics@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <span className="font-semibold">{t("footer.phone")}:</span>{" "}
                <a href="tel:+62817726068" className="hover:text-secondary block">
                  +62 817-726068
                </a>
                <a href="tel:+6281806000469" className="hover:text-secondary block">
                  +62 818-06000-469
                </a>
              </p>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ {t("common.notices.scamWarning")}
                </p>
              </div>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
} 