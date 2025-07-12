"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function VehicleShippingPage() {
  const { t } = useLanguage();

  // Vehicle shipping routes and pricing data
  const shippingRoutes = [
    {
      route: "Tanjung Priok – Surabaya",
      estimatedTime: "2–3 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.300.000", examples: "Beat, Mio, Nex" },
        { type: "Motor 150 cc+", price: "1.500.000", examples: "Vixion, NMax, PCX" },
        { type: "Motor Mewah", price: "2.500.000", examples: "Harley, Vespa GTS" },
        { type: "Mobil Kecil (KK)", price: "2.500.000 – 3.000.000", examples: "Brio, Ayla, Karimun" },
        { type: "Sedan/MPV (DC)", price: "3.000.000 – 3.250.000", examples: "Avanza, Xpander, Mobilio" },
        { type: "Mobil Mewah", price: "4.000.000 – 4.200.000", examples: "Pajero, Fortuner, Alphard" },
      ]
    },
    {
      route: "Surabaya – Makassar",
      estimatedTime: "2–4 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.300.000", examples: "Beat, Mio" },
        { type: "Motor 150 cc+", price: "1.600.000", examples: "NMax, PCX" },
        { type: "Motor Mewah", price: "2.700.000", examples: "Harley, Vespa GTS" },
        { type: "Mobil Kecil (KK)", price: "3.500.000 – 4.000.000", examples: "Brio, Karimun" },
        { type: "Sedan/MPV (DC)", price: "4.000.000 – 4.500.000", examples: "Innova, Xpander" },
        { type: "Mobil Mewah", price: "4.800.000 – 5.500.000", examples: "Fortuner, Alphard" },
      ]
    },
    {
      route: "Tanjung Priok – Batam",
      estimatedTime: "2–3 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.300.000", examples: "Mio, Scoopy" },
        { type: "Motor 150 cc+", price: "1.600.000", examples: "Vixion, Aerox" },
        { type: "Motor Mewah", price: "2.600.000", examples: "Harley, Ducati" },
        { type: "Mobil Kecil (KK)", price: "3.000.000 – 3.800.000", examples: "Brio, Agya" },
        { type: "Sedan/MPV (DC)", price: "3.800.000 – 4.000.000", examples: "Mobilio, Xpander" },
        { type: "Mobil Mewah", price: "4.000.000 – 4.200.000", examples: "Alphard, Fortuner" },
      ]
    },
    {
      route: "Jakarta – Balikpapan",
      estimatedTime: "3–5 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.500.000", examples: "Revo, Vario" },
        { type: "Motor 150 cc+", price: "1.800.000", examples: "Aerox, Ninja 250" },
        { type: "Motor Mewah", price: "2.800.000", examples: "Harley, BMW R18" },
        { type: "Mobil Kecil (KK)", price: "4.500.000 – 5.500.000", examples: "Karimun, Ayla" },
        { type: "Sedan/MPV (DC)", price: "5.500.000 – 6.000.000", examples: "Innova, Xpander" },
        { type: "Mobil Mewah", price: "6.000.000 – 6.500.000", examples: "Alphard, Pajero" },
      ]
    },
    {
      route: "Jakarta – Makassar",
      estimatedTime: "4–6 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.500.000", examples: "Supra, Beat" },
        { type: "Motor 150 cc+", price: "1.800.000", examples: "NMax, PCX" },
        { type: "Motor Mewah", price: "2.800.000", examples: "Harley, Triumph" },
        { type: "Mobil Kecil (KK)", price: "5.000.000 – 5.500.000", examples: "Ayla, Brio" },
        { type: "Sedan/MPV (DC)", price: "5.500.000 – 6.000.000", examples: "Xpander, Mobilio" },
        { type: "Mobil Mewah", price: "6.000.000 – 6.500.000", examples: "Fortuner, Alphard" },
      ]
    },
    {
      route: "Makassar – Jakarta",
      estimatedTime: "4–6 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.500.000", examples: "Beat, Vario, Mio" },
        { type: "Motor 150 cc+", price: "1.800.000", examples: "NMax, Aerox" },
        { type: "Motor Mewah", price: "2.800.000", examples: "Harley, Vespa GTS, Triumph" },
        { type: "Mobil Kecil (KK)", price: "5.000.000 – 5.500.000", examples: "Brio, Ayla, Karimun" },
        { type: "Sedan/MPV (DC)", price: "5.500.000 – 6.000.000", examples: "Avanza, Mobilio" },
        { type: "Mobil Mewah", price: "6.000.000 – 6.500.000", examples: "Pajero, Alphard" },
      ]
    },
    {
      route: "Jakarta – Batam",
      estimatedTime: "2–4 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.300.000", examples: "Beat, Mio, Vario" },
        { type: "Motor 150 cc+", price: "1.500.000", examples: "NMax, Vixion, Aerox" },
        { type: "Motor Mewah", price: "2.500.000", examples: "Harley, Vespa GTS, Triumph" },
        { type: "Mobil Kecil (KK)", price: "3.000.000 – 3.500.000", examples: "Brio, Ayla, Karimun" },
        { type: "Sedan/MPV (DC)", price: "3.500.000 – 4.000.000", examples: "Avanza, Xpander, Mobilio" },
        { type: "Mobil Mewah", price: "4.000.000 – 4.200.000", examples: "Fortuner, Pajero, Alphard" },
      ]
    },
    {
      route: "Batam – Jakarta",
      estimatedTime: "2–4 hari",
      vehicles: [
        { type: "Motor 110–150 cc", price: "1.300.000", examples: "Beat, Mio, Scoopy" },
        { type: "Motor 150 cc+", price: "1.500.000", examples: "PCX, Aerox, Ninja 250" },
        { type: "Motor Mewah", price: "2.500.000", examples: "Harley, Ducati, BMW R18" },
        { type: "Mobil Kecil (KK)", price: "3.000.000 – 3.500.000", examples: "Brio, Karimun, Ayla" },
        { type: "Sedan/MPV (DC)", price: "3.500.000 – 4.000.000", examples: "Xpander, Mobilio, Innova" },
        { type: "Mobil Mewah", price: "4.000.000 – 4.200.000", examples: "Pajero, Alphard, Fortuner" },
      ]
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Pengiriman Kendaraan via Kapal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Layanan pengiriman kendaraan bermotor melalui kapal dengan basis CY-CY (Container Yard to Container Yard) ke berbagai rute di Indonesia.
          </p>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">Tentang Layanan Pengiriman Kendaraan</h2>
            <p className="text-gray-700 mb-6">
              PT. Praba Samudra Logistic menyediakan layanan pengiriman kendaraan bermotor melalui kapal dengan basis CY-CY (Container Yard to Container Yard). 
              Kami menangani pengiriman berbagai jenis kendaraan termasuk motor, mobil kecil, sedan, MPV, dan mobil mewah ke berbagai rute di Indonesia.
            </p>
            <p className="text-gray-700 mb-6">
              Dengan jaringan dan pengalaman kami, kami memastikan kendaraan Anda sampai di tujuan dengan aman dan tepat waktu. 
              Layanan ini ideal untuk relokasi, pengiriman kendaraan baru, atau kebutuhan logistik lainnya.
            </p>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Tarif Pengiriman Kendaraan (CY-CY Basis)</h2>
          
          <div className="space-y-10">
            {shippingRoutes.map((route, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary text-white p-4">
                  <h3 className="text-xl font-bold">{route.route}</h3>
                  <p className="text-sm">Estimasi Waktu: {route.estimatedTime}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jenis Kendaraan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estimasi Tarif (Rp)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contoh Kendaraan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {route.vehicles.map((vehicle, vIndex) => (
                        <tr key={vIndex} className={vIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {vehicle.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vehicle.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vehicle.examples}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-primary">Keterangan</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><span className="font-semibold">KK</span> = Mobil Kecil (LCGC, City Car)</li>
              <li><span className="font-semibold">DC</span> = Sedan/MPV (Mobil keluarga, SUV ringan)</li>
              <li><span className="font-semibold">Mobil Mewah</span> = BYD, Alphard, Tesla, Jeep, Mercy, Lexus, Fortuner, Pajero, dll</li>
              <li>Tarif dapat berubah tergantung musim, ukuran kendaraan, kondisi jalan, dan rotasi kapal</li>
              <li>STNK aktif & kendaraan laik jalan wajib</li>
              <li><span className="font-semibold">CY–CY</span>: Kendaraan diserahkan dan diambil di pelabuhan (tidak termasuk pick-up/delivery)</li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Keunggulan Layanan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Tepat Waktu</h3>
              <p className="text-gray-600">Pengiriman kendaraan dengan estimasi waktu yang akurat dan terpercaya.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-600">Kendaraan Anda ditangani dengan hati-hati dan profesional untuk memastikan keamanan selama pengiriman.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Harga Kompetitif</h3>
              <p className="text-gray-600">Tarif yang bersaing dengan kualitas layanan terbaik untuk pengiriman kendaraan Anda.</p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Proses Pengiriman</h2>
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Booking & Konsultasi</h3>
                  <p className="text-gray-600">Hubungi kami untuk konsultasi dan booking pengiriman kendaraan Anda.</p>
                </div>
                <div className="md:w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                  <span className="font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                  <span className="font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 md:text-left">
                  <h3 className="text-xl font-bold mb-2">Persiapan Dokumen</h3>
                  <p className="text-gray-600">Menyiapkan dokumen kendaraan seperti STNK dan dokumen lainnya yang diperlukan.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Pengiriman ke Pelabuhan Asal</h3>
                  <p className="text-gray-600">Kendaraan dikirim ke pelabuhan asal untuk proses pemuatan ke kapal.</p>
                </div>
                <div className="md:w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                  <span className="font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                  <span className="font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 md:text-left">
                  <h3 className="text-xl font-bold mb-2">Pengiriman via Kapal</h3>
                  <p className="text-gray-600">Kendaraan dikirim menggunakan kapal ke pelabuhan tujuan.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Penerimaan di Pelabuhan Tujuan</h3>
                  <p className="text-gray-600">Kendaraan diterima dan diperiksa di pelabuhan tujuan.</p>
                </div>
                <div className="md:w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                  <span className="font-bold">5</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                  <span className="font-bold">6</span>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 md:text-left">
                  <h3 className="text-xl font-bold mb-2">Pengambilan Kendaraan</h3>
                  <p className="text-gray-600">Kendaraan dapat diambil di pelabuhan tujuan sesuai dengan basis CY-CY.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Kirim Kendaraan Anda Sekarang</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut atau booking pengiriman kendaraan Anda ke berbagai tujuan di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Hubungi Kami
            </Link>
            <Link 
              href="/booking"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-primary transition-colors"
            >
              Booking Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 