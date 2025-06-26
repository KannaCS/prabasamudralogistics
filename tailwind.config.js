/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0056b3",
          50: "#e6f0f9",
          100: "#cce0f3",
          200: "#99c2e6",
          300: "#66a3da",
          400: "#3385cd",
          500: "#0056b3",
          600: "#00448f",
          700: "#00336c",
          800: "#002248",
          900: "#001124",
        },
        secondary: {
          DEFAULT: "#ff6b00",
          50: "#fff2e6",
          100: "#ffe5cc",
          200: "#ffcb99",
          300: "#ffb166",
          400: "#ff9733",
          500: "#ff6b00",
          600: "#cc5600",
          700: "#994000",
          800: "#662b00",
          900: "#331500",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 