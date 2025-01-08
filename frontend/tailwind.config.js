// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}', 
//     './public/index.html',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         tan: '#dbb583',
//         darkGray: "#4a4a4a", // Gris foncé
//         white: "#ffffff", // Blanc pur
//         softBrown: "#8c5a3d", // Marron doux
//         lightBeige: "#e4dcd2", // Beige clair
//         pastelBlue: "#6495ed", // Bleu pastel
        
//       },
//       fontFamily:{
//         serif: ["Playfair Display", "serif"],
//         sans: ["Open Sans", "sans-serif"]
//       },
//       boxShadow: {
//         subtle: "0 4px 6px rgba(0, 0, 0, 0.1)", 
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#291C0E',
        primaryBrown: '#A78D78',
        primaryPale: '#E1D4C2',
        secondaryPale: '#EADDD3'

      },
      fontFamily: {
        title: ['Oswald'],
        secondary: ['Lora', 'sans-serif']
      },
      boxShadow: {
        subtle: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      },
    },
  },
  plugins: [],
};
