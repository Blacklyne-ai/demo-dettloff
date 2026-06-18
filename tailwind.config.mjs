/** @type {import('tailwindcss').Config} */
// Schwimmbadtechnik Dettloff — Palette aus Logo-Pixel-Analyse (sharp, scripts/phase0.mjs):
//   Türkis #00b5e4 (Schriftzug „Schwimmbadtechnik" + Taucher) → dominanter Marken-Akzent (Wasser)
//   Rot    #c10012 (Schriftzug „Dettloff")                    → seltener, scharfer Akzent
//   #00b5e4 bestätigt exakt die theme-color der alten Seite.
// Fundament ~80 % hell (Wasser-nah, frisch). Dunkel nur CtaBand + Footer.
// Single Source of Truth der Farbwerte: src/styles/global.css :root (RGB-Triplets).
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--rgb-ink) / <alpha-value>)',
          soft: 'rgb(var(--rgb-ink-soft) / <alpha-value>)',
        },
        muted: 'rgb(var(--rgb-muted) / <alpha-value>)',
        paper: 'rgb(var(--rgb-paper) / <alpha-value>)',
        surface: 'rgb(var(--rgb-surface) / <alpha-value>)',
        mist: 'rgb(var(--rgb-mist) / <alpha-value>)',
        shell: 'rgb(var(--rgb-shell) / <alpha-value>)',
        line: 'rgb(var(--rgb-line) / <alpha-value>)',
        aqua: {
          DEFAULT: 'rgb(var(--rgb-aqua) / <alpha-value>)',
          deep: 'rgb(var(--rgb-aqua-deep) / <alpha-value>)',
          ink: 'rgb(var(--rgb-aqua-ink) / <alpha-value>)',
          tint: 'rgb(var(--rgb-aqua-tint) / <alpha-value>)',
        },
        red: {
          DEFAULT: 'rgb(var(--rgb-red) / <alpha-value>)',
          deep: 'rgb(var(--rgb-red-deep) / <alpha-value>)',
        },
        dark: {
          DEFAULT: 'rgb(var(--rgb-dark) / <alpha-value>)',
          deep: 'rgb(var(--rgb-dark-deep) / <alpha-value>)',
          soft: 'rgb(var(--rgb-dark-soft) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: { pill: '999px', '2xl': '1.125rem', '3xl': '1.5rem', '4xl': '2rem' },
      maxWidth: { '7xl': '80rem', '8xl': '88rem' },
      boxShadow: {
        // wasser-getönte Schatten (Teal statt neutralem Grau)
        soft: '0 1px 2px rgb(8 37 48 / 0.04), 0 10px 28px -14px rgb(8 37 48 / 0.16)',
        lift: '0 2px 6px rgb(8 37 48 / 0.06), 0 28px 56px -24px rgb(8 37 48 / 0.28)',
        glow: '0 12px 40px -12px rgb(0 181 228 / 0.45)',
      },
      letterSpacing: { tightish: '-0.015em', tighter: '-0.03em' },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseDot: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.45', transform: 'scale(0.82)' } },
        ripple: { '0%': { transform: 'scale(1)', opacity: '0.5' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.8s ease both',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        ripple: 'ripple 3s ease-out infinite',
      },
    },
  },
  plugins: [],
};
