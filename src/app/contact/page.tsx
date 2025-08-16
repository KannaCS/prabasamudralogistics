"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { initAnimations } from "@/lib/animations";

export default function ContactPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [reason, setReason] = useState<string>("");
  const MESSAGE_LIMIT = 1000;

  useEffect(() => {
    initAnimations('contact');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name: string, value: string) => {
    let message = "";
    if (["fullName", "email", "phone", "subject", "message"].includes(name) && !value.trim()) {
      message = "This field is required.";
    }
    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) message = "Please enter a valid email.";
    }
    if (name === "phone" && value) {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 8) message = "Please enter a valid phone number.";
    }
    return message;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const msg = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const validateAll = () => {
    const entries = Object.entries(formData);
    const nextErrors: Record<string, string> = {};
    for (const [name, value] of entries) {
      const msg = validateField(name, value as string);
      if (msg) nextErrors[name] = msg;
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan');
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });

      // Show success message
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim pesan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-emerald-500/10" />
            <div className="relative backdrop-blur-[1px] px-6 py-8 sm:px-10 sm:py-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-center">{t("contactPage.title")}</h1>
              <p className="mt-2 text-center text-gray-600">{t("contactPage.formTitle")}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <a href="tel:+62817726068" className="group block w-full rounded-xl overflow-hidden border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-0 w-full">
                <div className="rounded-lg bg-primary/10 text-primary p-2 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500">Call us</p>
                  <p className="font-medium truncate">+62 817-726068</p>
                </div>
              </div>
            </a>
            <a href="https://wa.me/62817726068" target="_blank" rel="noopener noreferrer" className="group block w-full rounded-xl overflow-hidden border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all leading-none">
              <div className="flex items-center gap-3 min-w-0 w-full">
                <div className="rounded-lg bg-green-500/10 text-green-600 p-2 shrink-0">
                  <svg className="h-5 w-5 block overflow-visible" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                </div>
                <div className="min-w-0 flex-1 basis-0">
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-medium truncate">Chat now</p>
                </div>
              </div>
            </a>
            <a href="mailto:ops@prabasamudralogistics.com" className="group block w-full rounded-xl overflow-hidden border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 min-w-0 w-full">
                <div className="rounded-lg bg-blue-500/10 text-blue-600 p-2 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="min-w-0 flex-1 basis-0">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium leading-tight whitespace-normal" style={{ overflowWrap: "anywhere" }}>ops@prabasamudralogistics.com</p>
                </div>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div className="contact-info bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">{t("contactPage.office")}</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{t("contactPage.address")}</h3>
                    <p className="text-gray-600">Jalan Raya Kelapa Hybrida Blok PF18 No.30, Pegangsaan Dua, Kelapa Gading, RT.011/RW.012 14250 Daerah Khusus Ibukota Jakarta Indonesia</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{t("contactPage.email")}</h3>
                    <p className="text-gray-600">
                      <a href="mailto:ops@prabasamudralogistics.com" className="hover:text-primary block">ops@prabasamudralogistics.com</a>
                      <a href="mailto:marketing@prabasamudralogistics.com" className="hover:text-primary block">marketing@prabasamudralogistics.com</a>
                      <a href="mailto:prabasamudralogistics@gmail.com" className="hover:text-primary block">prabasamudralogistics@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{t("contactPage.phone")}</h3>
                    <p className="text-gray-600">
                      <a href="tel:+62817726068" className="hover:text-primary block">
                        +62 817-726068
                      </a>
                      <a href="tel:+6281806000469" className="hover:text-primary block">
                        +62 818-06000-469
                      </a>
                    </p>
                    <div className="mt-3">
                      <a
                        href="https://wa.me/62817726068"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors leading-none"
                      >
                        <svg className="w-5 h-5 mr-2 block shrink-0 overflow-visible" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        {t("contactPage.whatsapp")}
                      </a>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800 font-medium">
                        {t("common.notices.scamWarning")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{t("contactPage.operationalHours")}</h3>
                    <p className="text-gray-600">{t("contactPage.mondayToFriday")}</p>
                    <p className="text-gray-600">{t("contactPage.saturday")}</p>
                    <p className="text-gray-600">{t("contactPage.sunday")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">{t("contactPage.socialMedia")}</h3>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/share/19mqvBUfsa/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="Facebook">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/prabasamudralogistics?igsh=cHhtMWg3enI5OTMy" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="Instagram">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://x.com/prabalogistics?s=21" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="Twitter/X">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6">{t("contactPage.formTitle")}</h2>

              {success ? (
                <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-green-800 mb-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    <div>
                      <p className="font-semibold">Pesan berhasil dikirim</p>
                      <p className="text-sm">Kami akan segera menghubungi Anda.</p>
                      <div className="mt-3">
                        <button onClick={() => router.push('/')} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-600 transition-colors">
                          <span>Kembali ke Beranda</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field */}
                <div className="hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" autoComplete="off" tabIndex={-1} />
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <select
                      id="reason"
                      name="reason"
                      value={reason}
                      onChange={(e) => {
                        const val = e.target.value;
                        setReason(val);
                        const subjectMap: Record<string, string> = {
                          general: "General Inquiry",
                          quote: "Request a Quote",
                          support: "Customer Support",
                          partnership: "Partnership Opportunity",
                        };
                        const preset = subjectMap[val] || "";
                        setFormData((prev) => ({ ...prev, subject: preset }));
                        if (fieldErrors.subject) setFieldErrors((prev) => ({ ...prev, subject: "" }));
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select a reason</option>
                      <option value="general">General Inquiry</option>
                      <option value="quote">Request a Quote</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contactPage.fullName")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={!!fieldErrors.fullName}
                      aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${fieldErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.fullName && (
                      <p id="fullName-error" className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contactPage.emailAddress")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                    )}
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
                      onBlur={handleBlur}
                      required
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                    )}
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

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contactPage.subject")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${fieldErrors.subject ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {fieldErrors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-600">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("contactPage.message")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      maxLength={MESSAGE_LIMIT}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                      <span>{formData.message.length}/{MESSAGE_LIMIT}</span>
                      <span>{MESSAGE_LIMIT - formData.message.length} characters left</span>
                    </div>
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting && (
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                      <span>{isSubmitting ? t("contactPage.submitting") : t("contactPage.submit")}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">{t("contactPage.location")}</h2>
            <div className="relative rounded-lg overflow-hidden shadow-md h-96">
              {!mapLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8646621540766!2d106.91451609999999!3d-6.148782899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa010abd0363562e9%3A0xdbce869e99645f1e!2sPT.Praba%20Samudra%20Logistics!5e0!3m2!1sen!2sid!4v1719754726972!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
