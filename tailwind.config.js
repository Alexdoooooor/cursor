/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#09090b",
        surface: "#111214",
        "surface-2": "#17181d",
        text: "#f5f7fa",
        muted: "#9ba3af",
        border: "rgba(255,255,255,0.08)",
        accent: "#8b5cf6",
        "accent-soft": "rgba(139, 92, 246, 0.15)",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.28)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top, rgba(139,92,246,0.18), transparent 42%)",
      },
    },
  },
  plugins: [],
};

