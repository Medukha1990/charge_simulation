/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				deepBlue: '#111729',
				darkPurple: '#1D1B48',
				vibrantBlue: '#3662E3',
				mutedBlue: '#20293A',
				softGray: '#364153',
				mediumGray: '#4A5567',
				lightGray: '#CDD5E0',
			},
		},
	},
	plugins: [],
};
