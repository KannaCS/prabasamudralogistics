"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">{t("booking.title")}</h1>
          
          <div className="mb-8">
            <p className="text-gray-600">
              {t("booking.subtitle")}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
              </div>
              
              {/* Shipment Details */}
              <div>
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    >
                      <option value="">{t("booking.shipmentDetails.selectService")}</option>
                      <option value="freight-forwarding">Freight Forwarding</option>
                      <option value="truck-rental">Sewa Truck</option>
                      <option value="ship-rental">Sewa Kapal LCT</option>
                      <option value="export-import">Ekspor & Impor</option>
                      <option value="domestic-shipping">Pengiriman Domestik</option>
                    </select>
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
                      required
                      placeholder={t("booking.shipmentDetails.cargoTypePlaceholder")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
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
                  {/* Jenis Barang */}
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
                  {/* HS Code */}
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
                  {/* Negara Asal */}
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
                  {/* Negara Tujuan */}
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
                  {/* Barang Lartas */}
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
                  {/* Proforma Invoice / PO / Packing List */}
                  <div>
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
                  {/* Jenis Export/Import */}
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
                  {/* Port of Loading */}
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
                  {/* Port of Delivery */}
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
                  {/* Laycan */}
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
                  {/* Packing List */}
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
                  {/* Denah Rencana List Muatan di Kapal */}
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
                  {/* Muatan */}
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
                  {/* Jarak Tempuh */}
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
                  {/* PIC */}
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
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center pt-4">
                <p className="text-sm text-gray-500 mb-4 md:mb-0">
                  <span className="text-red-500">*</span> {t("booking.shipmentDetails.required")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-center"
                  >
                    {t("booking.shipmentDetails.cancel")}
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? t("booking.shipmentDetails.processing") : t("booking.submit")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 