/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        galaxy: {
          bg: "#05070D",
          secondary: "#0B0F1A",
          card: "#0F1628",
          border: "#1E2A45",
          purple: "#7C3AED",
          indigo: "#4F46E5",
          cyan: "#22D3EE",
          violet: "#A78BFA",
          pink: "#EC4899",
          text: "#E5E7EB",
          subtext: "#9CA3AF",
          muted: "#4B5563",
        },
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.4)",
        glowCyan: "0 0 20px rgba(34,211,238,0.4)",
        glowStrong:
          "0 0 60px rgba(124,58,237,0.6), 0 0 120px rgba(34,211,238,0.2)",
        card: "0 0 0 1px rgba(124,58,237,0.15), 0 8px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "galaxy-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.1) 0%, transparent 50%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(15,22,40,0.8) 100%)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.3) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
