/** @type {import('tailwindcss').Config} */

export default {
  plugins: [],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true, // Enable preflight
  },
  content: ["./index.html", './src/**/*.{svelte,js,ts}'], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: 'class', // or 'media' or 'class'
}
