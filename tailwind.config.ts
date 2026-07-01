import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        forest: {
          DEFAULT: "hsl(var(--forest))",
          light: "hsl(var(--forest-light))",
          dark: "hsl(var(--forest-dark))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          light: "hsl(var(--gold-light))",
          pale: "hsl(var(--gold-pale))",
        },
        sage: {
          DEFAULT: "hsl(var(--sage))",
          light: "hsl(var(--sage-light))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          dark: "hsl(var(--cream-dark))",
        },
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          dark: "hsl(var(--terracotta-dark))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Source Sans 3", "system-ui", "sans-serif"],
        quote: ["Cormorant Garamond", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.1" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.2" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        gold: "0 4px 20px hsl(43 89% 38% / 0.25)",
        forest: "0 4px 30px hsl(150 43% 16% / 0.15)",
        card: "0 2px 20px hsl(150 43% 16% / 0.08)",
        "card-hover": "0 8px 40px hsl(150 43% 16% / 0.15)",
      },
      backgroundImage: {
        "forest-gradient":
          "linear-gradient(135deg, hsl(var(--forest-dark)) 0%, hsl(var(--forest)) 40%, hsl(var(--forest-light)) 70%, hsl(var(--sage)) 100%)",
        "gold-gradient":
          "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--terracotta)))",
        "cream-gradient":
          "linear-gradient(135deg, hsl(var(--cream)) 0%, hsl(var(--cream-dark)) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 30s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
