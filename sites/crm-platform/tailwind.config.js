/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ocean: {
          50: '#f0f9ff',   // Lightest blue, like seafoam
          100: '#e0f2fe',  // Very light blue, like shallow water
          200: '#bae6fd',  // Light blue, like tropical waters
          300: '#7dd3fc',  // Medium light blue, like clear ocean
          400: '#38bdf8',  // Medium blue, like deep water
          500: '#0ea5e9',  // Primary blue, like ocean depths
          600: '#0284c7',  // Medium dark blue, like twilight waters
          700: '#0369a1',  // Dark blue, like deep sea
          800: '#075985',  // Very dark blue, like midnight ocean
          900: '#0c4a6e',  // Darkest blue, like ocean abyss
        },
        coral: {
          50: '#fff1f2',   // Lightest coral, like sand
          100: '#ffe4e6',  // Very light coral, like shell pink
          200: '#fecdd3',  // Light coral, like coral reef
          300: '#fda4af',  // Medium light coral, like living coral
          400: '#fb7185',  // Medium coral, like vibrant reef
          500: '#f43f5e',  // Primary coral, like deep coral
          600: '#e11d48',  // Medium dark coral, like red coral
          700: '#be123c',  // Dark coral, like deep reef
          800: '#9f1239',  // Very dark coral, like dark coral
          900: '#881337',  // Darkest coral, like deep sea coral
        },
        seagreen: {
          50: '#f0fdf4',   // Lightest green, like sea spray
          100: '#dcfce7',  // Very light green, like seafoam
          200: '#bbf7d0',  // Light green, like shallow seaweed
          300: '#86efac',  // Medium light green, like kelp forest
          400: '#4ade80',  // Medium green, like seaweed
          500: '#22c55e',  // Primary green, like deep kelp
          600: '#16a34a',  // Medium dark green, like dark seaweed
          700: '#15803d',  // Dark green, like deep kelp forest
          800: '#166534',  // Very dark green, like ocean floor
          900: '#14532d',  // Darkest green, like deep sea plants
        },
        sand: {
          50: '#fefce8',   // Lightest sand, like white sand
          100: '#fef9c3',  // Very light sand, like beach sand
          200: '#fef08a',  // Light sand, like warm sand
          300: '#fde047',  // Medium light sand, like golden sand
          400: '#facc15',  // Medium sand, like sunset sand
          500: '#eab308',  // Primary sand, like wet sand
          600: '#ca8a04',  // Medium dark sand, like dark sand
          700: '#a16207',  // Dark sand, like shadowed sand
          800: '#854d0e',  // Very dark sand, like wet dark sand
          900: '#713f12',  // Darkest sand, like deep wet sand
        },
      },
      spacing: {
        '16': '4rem',
        '64': '16rem',
      },
      zIndex: {
        '40': '40',
        '50': '50',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}