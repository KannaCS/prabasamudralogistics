"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function BookingSuccessPage() {
  const { t } = useLanguage();
  const [bookingNumber, setBookingNumber] = useState<string | null>(null);

  useEffect(() => {
    // Ambil nomor booking dari localStorage
    const storedBookingNumber = localStorage.getItem('bookingNumber');
    setBookingNumber(storedBookingNumber);
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("booking.success.title")}</h1>
          
          <p className="text-lg text-gray-600 mb-3">
            {t("booking.success.message")}
          </p>
          
          {bookingNumber && (
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Nomor Booking Anda:</p>
              <div className="bg-gray-100 p-4 rounded-md inline-block">
                <p className="text-xl font-bold text-primary">{bookingNumber}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">Simpan nomor booking ini untuk pelacakan</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              {t("booking.success.backToHome")}
            </Link>
            <Link
              href="/tracking"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {t("menu.tracking")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 