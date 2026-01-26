import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      spacing: {
        "screen-minus-headers": "var(--screen-minus-headers)"
      },
      fontFamily: {
        'sans': ['var(--font-lexend)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          deep: 'var(--bg-deep)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          raised: 'var(--surface-raised)',
          glow: 'var(--surface-glow)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
          glow: 'var(--border-glow)',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          dim: 'var(--text-dim)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          glow: 'var(--accent-glow)',
          strong: 'var(--accent-strong)',
          soft: 'var(--accent-soft)',
        },
        positive: {
          DEFAULT: 'var(--positive)',
          glow: 'var(--positive-glow)',
          soft: 'var(--positive-soft)',
        },
        negative: {
          DEFAULT: 'var(--negative)',
          glow: 'var(--negative-glow)',
          soft: 'var(--negative-soft)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          soft: 'var(--warning-soft)',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(229, 163, 77, 0.3)',
        'glow': '0 0 25px -5px rgba(229, 163, 77, 0.4)',
        'glow-lg': '0 0 40px -8px rgba(229, 163, 77, 0.5)',
        'glow-green': '0 0 20px -5px rgba(74, 222, 128, 0.4)',
        'glow-red': '0 0 20px -5px rgba(248, 113, 113, 0.4)',
        'card': '0 20px 50px -20px rgba(0, 0, 0, 0.5), 0 0 80px -40px rgba(229, 163, 77, 0.1)',
        'card-hover': '0 25px 60px -20px rgba(0, 0, 0, 0.6), 0 0 100px -40px rgba(229, 163, 77, 0.15)',
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
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'number-tick': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-100%)' },
          '50.01%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'infinite-scroll': 'infinite-scroll 2500s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-down': 'fade-down 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'number-tick': 'number-tick 0.3s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
