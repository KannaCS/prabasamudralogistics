import React from "react";

type SectionTitleProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function SectionTitle({ title, subtitle, align = "center", className = "", titleClassName, subtitleClassName }: SectionTitleProps) {
  const alignMap: Record<typeof align, string> = {
    left: "text-left mx-0",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  } as const;

  return (
    <div className={`max-w-3xl ${alignMap[align]} mb-12 ${className}`}>
      <h2 className={titleClassName ?? "text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4"}>
        {title}
      </h2>
      {subtitle ? (
        <p className={subtitleClassName ?? "text-lg text-gray-600"}>{subtitle}</p>
      ) : null}
    </div>
  );
}
