/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				loginFont: "Macondo",
				plantInFont: "sans-serif"
			},
			colors: {
				brandingYellow: "#F6C915",
				brandingDarkGreen: "#1B7E25",
				brandingLightGreen: "#94B447"
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
			}
		},
	},
	plugins: [],
};

