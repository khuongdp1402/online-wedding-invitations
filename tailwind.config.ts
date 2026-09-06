import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
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
        winglove: {
          ivory: "#FBF3EA",
          "ivory-deep": "#F3E4CB",
          red: "#B3242E",
          "red-deep": "#8C1C24",
          "red-tint": "#F7DEDD",
          gold: "#C99A44",
          "gold-soft": "#F1E0B8",
          pine: "#3F6E52",
          "pine-tint": "#E1EBE3",
          ink: "#2B1E15",
          "ink-soft": "#7C6A57",
          "ink-faint": "#B7A488",
          line: "#E9D9BA",
          surface: "#FFFFFF",
          "surface-sunken": "#F6EAD6",
          band: "#1D1410",
          "band-deep": "#150E0B",
          "band-ink": "#F5E9D8",
          "band-ink-soft": "#C9B49C",
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
  			script: ['var(--font-script)', 'cursive'],
        // template2 dùng `font-serif` ở 75 chỗ. Trỏ về --font-heading để font
        // người dùng chọn có tác dụng, thay vì rơi về serif mặc định của Tailwind.
        serif: ['var(--font-heading)', 'Georgia', 'serif'],
        // Font riêng cho trang chủ mới (Winglove landing) — khác với
        // `heading`/`body` ở trên vốn dùng cho font do người dùng chọn theo
        // từng mẫu thiệp (xem TemplateRenderer).
        "wg-display": ['var(--font-wg-display)', 'Georgia', 'serif'],
        "wg-body": ['var(--font-wg-body)', '-apple-system', 'sans-serif'],
  		},
      boxShadow: {
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -5px rgba(128, 0, 32, 0.02)",
        gold: "0 0 0 1px rgba(212, 175, 55, 0.3)",
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
