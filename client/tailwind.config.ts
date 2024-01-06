import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: undefined,
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      background1: 'rgba(255,255,255, 0.9)',
      shadow1: '0px 7px 14px rgba(0, 0, 0, .05), 0px 0px 3.12708px rgba(0, 0, 0, .0798), 0px 0px .931014px rgba(0, 0, 0, .1702)',
      shadow2: '0 0 0 1px #4a47b1',
      border1: '#b8b8b8',
      border2: '#d6d6d6',
      text1: '#3d3d3d',
      text2: '#e3e2fe',
      text3: '#bae6fd',
      text4: '#09090b',
      white: '#FFFCF7',
      purple: '#fae8ff',
      blue: '#ADD8E6',
      pink: '#FFB6C1',
      black: '#000000'
    }
  },
  plugins: [],
}
export default config
