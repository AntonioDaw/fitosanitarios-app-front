module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",      // si tienes Pages Router o quieres cubrir esa carpeta
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./node_modules/anjrot-components/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}