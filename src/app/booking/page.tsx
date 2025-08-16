"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { initAnimations } from "@/lib/animations";

export default function BookingPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    origin: "",
    destination: "",
    shipmentDate: "",
    cargoType: "",
    weight: "",
    dimensions: "",
    specialInstructions: "",
    goodsType: "",
    hsCode: "",
    countryOrigin: "",
    countryDestination: "",
    lartas: "",
    proforma: "",
    exportImportType: "",
    portOfLoading: "",
    portOfDelivery: "",
    laycan: "",
    packingList: "",
    cargoPlan: "",
    cargo: "",
    distance: "",
    pic: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    initAnimations('booking');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error when user edits
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const steps = [
    { id: 1, title: t("booking.contactInfo.title") },
    { id: 2, title: t("booking.shipmentDetails.title") },
    { id: 3, title: t("booking.shipmentDetails.title") + " - More" },
    { id: 4, title: t("booking.submit") + " / Review" },
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = t("booking.shipmentDetails.required");
      if (!formData.email.trim()) newErrors.email = t("booking.shipmentDetails.required");
      if (!formData.phone.trim()) newErrors.phone = t("booking.shipmentDetails.required");
    }
    if (currentStep === 2) {
      if (!formData.serviceType) newErrors.serviceType = t("booking.shipmentDetails.required");
      if (!formData.cargoType.trim()) newErrors.cargoType = t("booking.shipmentDetails.required");
      if (!formData.origin.trim()) newErrors.origin = t("booking.shipmentDetails.required");
      if (!formData.destination.trim()) newErrors.destination = t("booking.shipmentDetails.required");
      if (!formData.shipmentDate) newErrors.shipmentDate = t("booking.shipmentDetails.required");
    }
    if (currentStep === 3) {
      // No strict required fields; optional step
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, steps.length));
      setError("");
    }
  };

  const handleBack = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Final validation before submit
    if (!validateStep(1) || !validateStep(2)) {
      setError(t("booking.shipmentDetails.required"));
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses booking');
      }

      // Simpan nomor booking ke localStorage untuk ditampilkan di halaman sukses
      if (data.bookingNumber) {
        localStorage.setItem('bookingNumber', data.bookingNumber);
      }

      router.push('/booking/success');
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main form card */}
          <div className="lg:col-span-8">
            <div className="booking-form bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
              <h1 className="text-3xl font-bold mb-2">{t("booking.title")}</h1>
              <p className="text-gray-600 mb-6">{t("booking.subtitle")}</p>

              {/* Stepper */}
              <ol className="mb-8 flex items-center gap-3">
                {steps.map((s, idx) => (
                  <li key={s.id} className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold border transition-colors ${
                      step >= s.id ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-300'
                    }`}>
                      {s.id}
                    </div>
                    <span className={`text-sm ${step === s.id ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{s.title}</span>
                    {idx < steps.length - 1 && <span className="mx-2 h-px w-6 bg-gray-300" />}
                  </li>
                ))}
              </ol>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={step === 4 ? handleSubmit : handleNext}>
                <div className="space-y-8">
                  {/* Step 1: Contact Info */}
                  {step === 1 && (
                    <div className="booking-step animate-fade-in">
                      <h2 className="text-xl font-semibold border-b pb-2 mb-4">{t("booking.contactInfo.title")}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.contactInfo.fullName")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.fullName ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.contactInfo.email")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.contactInfo.phone")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.contactInfo.company")}
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">{t("booking.shipmentDetails.cancel")}</Link>
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors">{t("booking.shipmentDetails.next") ?? 'Next'}</button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Shipment Core */}
                  {step === 2 && (
                    <div className="booking-step animate-fade-in">
                      <h2 className="text-xl font-semibold border-b pb-2 mb-4">{t("booking.shipmentDetails.title")}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.serviceType")} <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.serviceType ? 'border-red-400' : 'border-gray-300'}`}
                          >
                            <option value="">{t("booking.shipmentDetails.selectService")}</option>
                            <option value="freight-forwarding">Freight Forwarding</option>
                            <option value="truck-rental">Sewa Truck</option>
                            <option value="ship-rental">Sewa Kapal LCT</option>
                            <option value="export-import">Ekspor & Impor</option>
                            <option value="domestic-shipping">Pengiriman Domestik</option>
                          </select>
                          {errors.serviceType && <p className="mt-1 text-xs text-red-600">{errors.serviceType}</p>}
                        </div>
                        <div>
                          <label htmlFor="cargoType" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.cargoType")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cargoType"
                            name="cargoType"
                            value={formData.cargoType}
                            onChange={handleChange}
                            placeholder={t("booking.shipmentDetails.cargoTypePlaceholder")}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.cargoType ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.cargoType && <p className="mt-1 text-xs text-red-600">{errors.cargoType}</p>}
                        </div>
                        <div>
                          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.origin")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.origin ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.origin && <p className="mt-1 text-xs text-red-600">{errors.origin}</p>}
                        </div>
                        <div>
                          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.destination")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.destination ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.destination && <p className="mt-1 text-xs text-red-600">{errors.destination}</p>}
                        </div>
                        <div>
                          <label htmlFor="shipmentDate" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.shipmentDate")} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            id="shipmentDate"
                            name="shipmentDate"
                            value={formData.shipmentDate}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${errors.shipmentDate ? 'border-red-400' : 'border-gray-300'}`}
                          />
                          {errors.shipmentDate && <p className="mt-1 text-xs text-red-600">{errors.shipmentDate}</p>}
                        </div>
                        <div>
                          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.weight")}
                          </label>
                          <input
                            type="text"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder={t("booking.shipmentDetails.weightPlaceholder")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.dimensions")}
                          </label>
                          <input
                            type="text"
                            id="dimensions"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleChange}
                            placeholder={t("booking.shipmentDetails.dimensionsPlaceholder")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.specialInstructions")}
                          </label>
                          <textarea
                            id="specialInstructions"
                            name="specialInstructions"
                            value={formData.specialInstructions}
                            onChange={handleChange}
                            placeholder={t("booking.shipmentDetails.specialInstructionsPlaceholder")}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <button onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">{t("booking.shipmentDetails.back") ?? 'Back'}</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors">{t("booking.shipmentDetails.next") ?? 'Next'}</button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Additional Details */}
                  {step === 3 && (
                    <div className="booking-step animate-fade-in">
                      <h2 className="text-xl font-semibold border-b pb-2 mb-4">{t("booking.shipmentDetails.title")} – {t("booking.shipmentDetails.packingList")}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="goodsType" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.goodsType")}
                          </label>
                          <input
                            type="text"
                            id="goodsType"
                            name="goodsType"
                            value={formData.goodsType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="hsCode" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.hsCode")}
                          </label>
                          <input
                            type="text"
                            id="hsCode"
                            name="hsCode"
                            value={formData.hsCode}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="countryOrigin" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.countryOrigin")}
                          </label>
                          <input
                            type="text"
                            id="countryOrigin"
                            name="countryOrigin"
                            value={formData.countryOrigin}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="countryDestination" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.countryDestination")}
                          </label>
                          <input
                            type="text"
                            id="countryDestination"
                            name="countryDestination"
                            value={formData.countryDestination}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="lartas" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.lartas")}
                          </label>
                          <select
                            id="lartas"
                            name="lartas"
                            value={formData.lartas}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          >
                            <option value="">{t("booking.shipmentDetails.lartasSelect")}</option>
                            <option value="lartas">{t("booking.shipmentDetails.lartasOption1")}</option>
                            <option value="tidak-lartas">{t("booking.shipmentDetails.lartasOption2")}</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="proforma" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.proforma")}
                          </label>
                          <textarea
                            id="proforma"
                            name="proforma"
                            value={formData.proforma}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          ></textarea>
                        </div>
                        <div>
                          <label htmlFor="exportImportType" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.exportImportType")}
                          </label>
                          <select
                            id="exportImportType"
                            name="exportImportType"
                            value={formData.exportImportType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          >
                            <option value="">{t("booking.shipmentDetails.exportImportSelect")}</option>
                            <option value="export">{t("booking.shipmentDetails.exportOption")}</option>
                            <option value="import">{t("booking.shipmentDetails.importOption")}</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="portOfLoading" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.portOfLoading")}
                          </label>
                          <input
                            type="text"
                            id="portOfLoading"
                            name="portOfLoading"
                            value={formData.portOfLoading}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="portOfDelivery" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.portOfDelivery")}
                          </label>
                          <input
                            type="text"
                            id="portOfDelivery"
                            name="portOfDelivery"
                            value={formData.portOfDelivery}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="laycan" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.laycan")}
                          </label>
                          <input
                            type="text"
                            id="laycan"
                            name="laycan"
                            value={formData.laycan}
                            onChange={handleChange}
                            placeholder={t("booking.shipmentDetails.laycanPlaceholder")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="packingList" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.packingList")}
                          </label>
                          <textarea
                            id="packingList"
                            name="packingList"
                            value={formData.packingList}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          ></textarea>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="cargoPlan" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.cargoPlan")}
                          </label>
                          <textarea
                            id="cargoPlan"
                            name="cargoPlan"
                            value={formData.cargoPlan}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          ></textarea>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.cargo")}
                          </label>
                          <textarea
                            id="cargo"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          ></textarea>
                        </div>
                        <div>
                          <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.distance")}
                          </label>
                          <input
                            type="text"
                            id="distance"
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="pic" className="block text-sm font-medium text-gray-700 mb-1">
                            {t("booking.shipmentDetails.pic")}
                          </label>
                          <input
                            type="text"
                            id="pic"
                            name="pic"
                            value={formData.pic}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <button onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">{t("booking.shipmentDetails.back") ?? 'Back'}</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors">{t("booking.shipmentDetails.next") ?? 'Next'}</button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review */}
                  {step === 4 && (
                    <div className="booking-step animate-fade-in">
                      <h2 className="text-xl font-semibold border-b pb-2 mb-4">Review</h2>
                      <p className="text-sm text-gray-500 mb-4">Please review your details before submitting.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-700">{t("booking.contactInfo.title")}</h3>
                          <p className="text-sm text-gray-600">{t("booking.contactInfo.fullName")}: {formData.fullName || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.contactInfo.email")}: {formData.email || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.contactInfo.phone")}: {formData.phone || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.contactInfo.company")}: {formData.company || '-'}</p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-sm font-semibold text-gray-700">{t("booking.shipmentDetails.title")}</h3>
                          <p className="text-sm text-gray-600">{t("booking.shipmentDetails.serviceType")}: {formData.serviceType || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.shipmentDetails.cargoType")}: {formData.cargoType || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.shipmentDetails.origin")}: {formData.origin || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.shipmentDetails.destination")}: {formData.destination || '-'}</p>
                          <p className="text-sm text-gray-600">{t("booking.shipmentDetails.shipmentDate")}: {formData.shipmentDate || '-'}</p>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <h3 className="text-sm font-semibold text-gray-700">{t("booking.shipmentDetails.specialInstructions")}</h3>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">{formData.specialInstructions || '-'}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <p className="text-sm text-gray-500"><span className="text-red-500">*</span> {t("booking.shipmentDetails.required")}</p>
                        <div className="flex gap-3">
                          <button onClick={handleBack} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">{t("booking.shipmentDetails.back") ?? 'Back'}</button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isSubmitting ? t("booking.shipmentDetails.processing") : t("booking.submit")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sticky summary */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20 sm:top-24 md:top-28 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-1">Summary</h3>
              <p className="text-sm text-gray-500 mb-4">Quick overview of your booking details.</p>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.contactInfo.fullName")}</dt><dd className="text-gray-900 truncate">{formData.fullName || '-'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.contactInfo.email")}</dt><dd className="text-gray-900 truncate">{formData.email || '-'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.contactInfo.phone")}</dt><dd className="text-gray-900 truncate">{formData.phone || '-'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.shipmentDetails.serviceType")}</dt><dd className="text-gray-900 truncate capitalize">{formData.serviceType || '-'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.shipmentDetails.origin")}</dt><dd className="text-gray-900 truncate">{formData.origin || '-'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.shipmentDetails.destination")}</dt><dd className="text-gray-900 truncate">{formData.destination || '-'}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-500">{t("booking.shipmentDetails.shipmentDate")}</dt><dd className="text-gray-900 truncate">{formData.shipmentDate || '-'}</dd></div>
              </dl>
              <div className="mt-6">
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${(step - 1) / (steps.length - 1) * 100}%` }} />
                </div>
                <p className="mt-2 text-xs text-gray-500">Step {step} of {steps.length}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}