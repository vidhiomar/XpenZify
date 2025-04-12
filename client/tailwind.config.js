export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3748',
        secondary: '#718096',
        accent: '#FFD700', // changed from #9F7AEA to golden yellow
        background: '#F7FAFC',
        card: '#000000', // changed from white to black
        text: {
          primary: '#FFFFFF', // changed from black to white
          secondary: '#4A5568'
        }
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)', // updated to white shadow
        'hover': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)', // updated to white shadow
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
