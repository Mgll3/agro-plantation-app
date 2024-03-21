/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				loginFont: "Macondo",
				plantInFont: "sans-serif",
				sans: ["Sora", "sans-serif"],
				niramit: ["Niramit", "sans-serif"]
			},
			colors: {
				brandingYellow: "#F6C915",
				brandingLightYellow: "#EAE3C0",
				brandingDarkGreen: "#1B7E25",
				brandingLightGreen: "#94B447",
				brandingLightBlue: "#B5B3B3",
				screenDarkening: "#00000070",
				semiTansparentBlack: "#000000cc"
			},
			spacing: {
				"53": "13.25rem"
			},
			backgroundImage: {
				"headerBg": "url('@/images/header_background.avif')",
				"huerta": "url('@/images/huertas.jpg')",
				"login" : "url('@/images/inicio_y_registro.jpg)"
			},
			gridTemplateColumns: {
				"form" : "repeat(auto-fit, minmax(300px, 1fr))"
			},
			dropShadow: {
				"custom": "0 3px 3px rgba(0, 0, 0, 0.55)",
			},
		},
	},
	plugins: [],
};

