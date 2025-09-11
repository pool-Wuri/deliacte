/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/.{html,ts}",
    "./node_modules/flowbite/*/.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        'burkina-green': '#009639',
        'burkina-red': '#E31E24',
        'burkina-yellow': '#FCD116',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
