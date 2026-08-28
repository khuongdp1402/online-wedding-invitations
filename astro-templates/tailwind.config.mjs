/**
 * Cấu hình Tailwind riêng cho astro-templates — chỉ phần `theme.extend` mà
 * classic-burgundy thực sự dùng (fontFamily), copy thủ công từ
 * ../tailwind.config.ts thay vì import chéo 2 project (tránh Tailwind v3
 * PostCSS phải resolve toàn bộ dependency của Next).
 */
export default {
  content: ["./src/**/*.{astro,tsx,jsx,ts,js}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-heading)", "Georgia", "serif"],
      },
      colors: {
        cream: {
          light: "#FDFBF7",
          dark: "#F5F1EA",
        },
        burgundy: {
          DEFAULT: "#800020",
          light: "#A01B35",
          dark: "#5A0016",
        },
        gold: {
          DEFAULT: "#D4AF37",
          muted: "#B89B49",
        },
        ink: {
          DEFAULT: "#4A4A4A",
          dark: "#2A2A2A",
        },
        paper: "#FDFBF7",
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -5px rgba(128, 0, 32, 0.02)",
        gold: "0 0 0 1px rgba(212, 175, 55, 0.3)",
      },
    },
  },
  plugins: [],
};
