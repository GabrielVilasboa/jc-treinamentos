
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", 
  ],
  theme: {
    extend: {
      
      colors: {
        primary: '#fdfdfd',
        secondary: '#6e6fae', 
        secondaryHover: '#5e5fa8', 
        background: '#161616', 
        dark: '#1b1b1b',
        default: '#e7e9f8',
        utils: '#525252', 
      },
     
      spacing: {
        small: '4px',
        medium: '8px',
        large: '16px',
        'large-x': '24px',
        'large-xx': '32px',
        'large-xxx': '48px',
        'ultra-large': '60px',

        'screen-limit': '850px'
      },
    },
  },
  plugins: [
    require('daisyui'),
    
  ],
  

};
