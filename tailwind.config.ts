import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Premium Theme Palette - Cow/Pasture Theme
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a', // Base Farm Green
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        neutral: {
          50: '#fafaf9',  // Warm White (Stone-50)
          100: '#f5f5f4',
          200: '#e7e5e4', // Warm Grey
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524', // Warm Charcoal
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
        'subtle-mesh': 'radial-gradient(at 0% 0%, rgba(22, 163, 74, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(132, 204, 22, 0.1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(22, 163, 74, 0.05)', // Green-tinted shadow
        'glass-hover': '0 8px 32px 0 rgba(22, 163, 74, 0.15)',
      }
    },
  },
  plugins: [],
};
export default config;
