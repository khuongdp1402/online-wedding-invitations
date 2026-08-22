export type FontOption = { label: string; value: string };

export const HEADING_FONTS: FontOption[] = [
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Cormorant Garamond", value: "'Cormorant Garamond', serif" },
  { label: "Lora", value: "'Lora', serif" },
  { label: "Marcellus", value: "'Marcellus', serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "EB Garamond", value: "'EB Garamond', serif" },
  { label: "Crimson Pro", value: "'Crimson Pro', serif" },
];

export const BODY_FONTS: FontOption[] = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Montserrat", value: "'Montserrat', sans-serif" },
  { label: "Nunito Sans", value: "'Nunito Sans', sans-serif" },
  { label: "Work Sans", value: "'Work Sans', sans-serif" },
  { label: "Mulish", value: "'Mulish', sans-serif" },
];

export const SCRIPT_FONTS: FontOption[] = [
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Alex Brush", value: "'Alex Brush', cursive" },
  { label: "Parisienne", value: "'Parisienne', cursive" },
  { label: "Pinyon Script", value: "'Pinyon Script', cursive" },
  { label: "Sacramento", value: "'Sacramento', cursive" },
  { label: "Allura", value: "'Allura', cursive" },
  { label: "Tangerine", value: "'Tangerine', cursive" },
];

export type ColorPreset = {
  label: string;
  primary: string;
  accent: string;
  background: string;
  textColor: string;
};

export const COLOR_PRESETS: ColorPreset[] = [
  { label: "Burgundy cổ điển", primary: "#800020", accent: "#d4a853", background: "#FDFBF7", textColor: "#4A4A4A" },
  { label: "Hồng phấn nhẹ nhàng", primary: "#b76e79", accent: "#f2c9c1", background: "#fff7f5", textColor: "#4a3b38" },
  { label: "Xanh navy sang trọng", primary: "#1b2a4a", accent: "#c9a86a", background: "#f7f7f2", textColor: "#2a2a2a" },
  { label: "Xanh sage tự nhiên", primary: "#5f6f52", accent: "#e8d9c5", background: "#faf8f2", textColor: "#3a3a30" },
  { label: "Vàng gold hiện đại", primary: "#8a6d3b", accent: "#e3c16f", background: "#fffdf7", textColor: "#3a2f1e" },
  { label: "Đen trắng tối giản", primary: "#111111", accent: "#888888", background: "#ffffff", textColor: "#222222" },
  { label: "Tím lavender lãng mạn", primary: "#6b4e71", accent: "#d9c2e0", background: "#faf6fb", textColor: "#3d2f40" },
  { label: "Cam đất mùa thu", primary: "#a0522d", accent: "#d9a679", background: "#fdf6ee", textColor: "#3a2a1e" },
];
