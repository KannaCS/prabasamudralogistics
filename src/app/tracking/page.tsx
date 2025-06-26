"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface TrackingTimeline {
  status: string;
  date: string;
  description: string;
}

interface TrackingResult {
  bookingNumber: string;
  status: string;
  origin: string;
  destination: string;
  serviceType: string;
  estimatedDelivery: string;
  timeline: TrackingTimeline[];
}

export default function TrackingPage() {
  const { t } = useLanguage();
  const [bookingNumber, setBookingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingNumber.trim()) {
      setError(t("tracking.error.emptyInput"));
      return;
    }

    setIsLoading(true);
    setError("");
    setTrackingResult(null);

    try {
      const response = await fetch(`/api/tracking?bookingNumber=${encodeURIComponent(bookingNumber)}`);
      const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || t("tracking.error.notFound"));
      }

      setTrackingResult(data.data);
    } catch (error) {
      console.error("Error tracking shipment:", error);
      setError(error instanceof Error ? error.message : t("tracking.error.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-center mb-8">{t("tracking.title")}</h1>
            
            <div className="mb-8">
              <p className="text-gray-600 text-center">
                {t("tracking.subtitle")}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  placeholder={t("tracking.inputPlaceholder")}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? t("tracking.loadingText") : t("tracking.buttonText")}
                </button>
              </div>
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </form>
            
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500">
                {t("tracking.exampleText")}
              </p>
            </div>
          </div>
          
          {trackingResult && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">{t("tracking.result.title")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">{t("tracking.result.trackingNumber")}</p>
                  <p className="font-medium">{trackingResult.bookingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("tracking.result.status")}</p>
                  <p className="font-medium">
                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(trackingResult.status)}`}>
                      {trackingResult.status === 'pending' ? 'Menunggu Konfirmasi' :
                       trackingResult.status === 'confirmed' ? 'Dikonfirmasi' :
                       trackingResult.status === 'completed' ? 'Selesai' :
                       trackingResult.status === 'cancelled' ? 'Dibatalkan' : trackingResult.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("tracking.result.origin")}</p>
                  <p className="font-medium">{trackingResult.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("tracking.result.destination")}</p>
                  <p className="font-medium">{trackingResult.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("tracking.result.service")}</p>
                  <p className="font-medium">{trackingResult.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t("tracking.result.estimatedDelivery")}</p>
                  <p className="font-medium">{formatDate(trackingResult.estimatedDelivery)}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{t("tracking.result.history")}</h3>
              <div className="space-y-6">
                {trackingResult.timeline.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-6">
                    {index < trackingResult.timeline.length - 1 && (
                      <div className="absolute top-2 left-[9px] w-0.5 h-full bg-gray-200"></div>
                    )}
                    <div className="absolute top-2 left-0 w-5 h-5 rounded-full bg-primary"></div>
                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <p className="font-medium">{item.status}</p>
                        <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 