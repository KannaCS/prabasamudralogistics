import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  href?: string;
  className?: string;
};

export default function ServiceCard({ icon, title, description, href, className = "" }: ServiceCardProps) {
  const Wrapper: React.ElementType = href ? Link : "div";
  const wrapperProps = href ? { href, "aria-label": `Learn more about ${typeof title === 'string' ? title : 'service'}` } : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={`service-card block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-transform transition-shadow transition-colors duration-200 focus-within:shadow-md h-full outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-200 ${className}`}
    >
      <div className="service-icon w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="service-title text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="service-description text-gray-600">{description}</p>
      {href ? (
        <div className="mt-4 inline-flex items-center gap-2 text-primary-600 font-medium">
          <span>Learn more</span>
          <ArrowRight size={16} />
        </div>
      ) : null}
    </Wrapper>
  );
}
