/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./content/**/*.{md,mdx}",
      "../../packages/luminescent/src/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
