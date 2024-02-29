/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				brandingYellow: "#F6C915",
				brandingLightYellow: "#EAE3C0",
				brandingDarkGreen: "#1B7E25",
				brandingLightGreen: "#94B447",
				brandingLightBlue: "#B5B3B3",
				screenDarkening: "#00000070"
			},
			spacing: {
				"53": "13.25rem"
			},
			backgroundImage: {
				"headerBg": "url('@/images/header_background.avif')",
				"huerta": "url('@/images/huertas.jpg')",
			},
			fontFamily: {
				"sans": ["Sora", "sans-serif"],
			}
		},
	},
	plugins: [],
};

