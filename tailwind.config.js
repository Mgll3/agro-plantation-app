/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				loginFont: "Macondo",
				plantInFont: "sans-serif",
				sans: ["Sora", "sans-serif"],
				niramit: ["Niramit", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"]
			},
			fontSize: {
				size1: "2.618rem",
				size2: "1.618rem",
				size3: "1rem",
				size4: "0.618rem",
				size5: "0.382rem",
				size6: "0.236rem"
			},
			colors: {
				brandingYellow: "#F6C915",
				brandingLightYellow: "#EAE3C0",
				brandingDarkGreen: "#1B7E25",
				brandingLightGreen: "#94B447",
				brandingLightBlue: "#B5B3B3",
				screenDarkening: "#00000070",
				semiTansparentBlack: "#000000cc",
				darkText: "#484848",
				darkGrayText: "#767676",
				reddishBrown: "#C54600",
				blueLink: "#6F86FF",
				brightRed: "#FF0000"
			},
			spacing: {
				53: "13.25rem"
			},
			backgroundImage: {
				headerBg: "url('@/images/backgrounds/header_background.avif')",
				headerBgAdmin: "url('@/images/backgrounds/Header2.png')",
				login: "url('@/images/backgrounds/inicio_y_registro.jpg')",
				publicationCardsBg: "url('@/images/backgrounds/cards-background.jpg')"
			},
			gridTemplateColumns: {
				form: "repeat(auto-fit, minmax(300px, 1fr))"
			},
			dropShadow: {
				custom: "0 3px 3px rgba(0, 0, 0, 0.55)"
			}
		}
	},
	plugins: []
};
