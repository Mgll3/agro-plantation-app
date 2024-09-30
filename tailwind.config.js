/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				loginFont: "Macondo",
				plantInFont: "sans-serif",
				sans: ["Sora", "sans-serif"],
				openSans: ["Open Sans", "sans-serif"],
				niramit: ["Niramit", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
				lato: ["Lato", "sans-serif"]
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
				darkGrayText2: "#595959",
				lightGrayText: "#9A9A9A",
				ligthGrayText2: "#E0E2E6",
				veryLightGrey: "#F9FAFB",
				reddishBrown: "#C54600",
				blueLink: "#6F86FF",
				brightRed: "#FF0000",
				redError: "#FD0303",
				green300: "#AAC46A",
				grey150: "#E7E6E6",
				grey300: "#DAD9D9",
				grey400: "#CECDCD",
				grey500: "#C2C0C0",
				grey600: "#9C9999",
				grey700: "#6B6B6B",
				grey800: "#4E4C4C",
				grey900: "#272626",
				brown150: "#F7F4E6",
				yellow500: "#F6C915",
				terciary150: "#D4E2B5",
				terciary300: "#BFD390"
			},
			spacing: {
				53: "13.25rem"
			},
			backgroundImage: {
				headerBg: "url('@/images/backgrounds/header_background.avif')",
				headerBgAdmin: "url('@/images/backgrounds/header_background_admin.png')",
				login: "url('@/images/backgrounds/inicio_y_registro.jpg')",
				loginMobile: "url('@/images/backgrounds/inicio_y_registro_mobile.jpg')",
				publicationCardsBg: "url('@/images/backgrounds/cards-background.jpg')"
			},
			gridTemplateColumns: {
				form: "repeat(auto-fit, minmax(300px, 1fr))"
			},
			dropShadow: {
				custom: "0 3px 3px rgba(0, 0, 0, 0.55)",
				bigText: "0 2px 2px rgba(0, 0, 0, 0.45)",
				smallText: "0 2px 1px rgba(0, 0, 0, 0.35)"
			},
			boxShadow: {
				"below-light": "2px 2px 5px rgba(0, 0, 0, 0.2)",
				"below-dark": "0px 4px 4px rgba(0, 0, 0, 0.5)",
				"around-light": "0px 0px 10px rgba(0, 0, 0, 0.2)",
				"around-dark": "0px 0px 5px rgba(0, 0, 0, 0.5)",
				"below-right-light": "1px 3px 3px rgba(0, 0, 0, 0.3)",
				"below-right-dark": "2px 2px 3px rgba(0, 0, 0, 0.5)"
			},
			screens: {
				"custom-390": "390px",
				"custom-400": "400px",
				"custom-420": "420px",
				"custom-500": "500px",
				"custom-550": "550px",
				"custom-600": "600px",
				"custom-640": "640px",
				"custom-650": "650px",
				"custom-700": "700px",
				"custom-750": "750px",
				"custom-800": "800px",
				"custom-850": "850px",
				"custom-900": "900px",
				"custom-950": "950px",
				"custom-1000": "1000px",
				"custom-1200": "1200px",
				"custom-1250": "1250px",
				"custom-1300": "1300px",
				"custom-1400": "1400px",
				"custom-1500": "1500px",
				"custom-1600": "1600px",
				"custom-1900": "1900px",
				"custom-2000": "2000px",
				"custom-2500": "2500px",
				"custom-3000": "3000px",
				"custom-3500": "3500px"
			},
			animation: {
				sliderMainImgGoLeft: "moveLeftFromCenter 0.7s ease-in-out forwards",
				sliderMainImgGoRight: "moveRightFromCenter 0.7s ease-in-out forwards",
				sliderPrevImgGoRight: "moveRightFromLeft 0.7s ease-in-out forwards",
				sliderNextImgGoLeft: "moveLeftFromRight 0.7s ease-in-out forwards"
			},
			keyframes: {
				moveLeftFromCenter: {
					"0%": { left: "0%" },
					"100%": { left: "-100%" }
				},
				moveRightFromCenter: {
					"0%": { left: "0%" },
					"100%": { left: "100%" }
				},
				moveRightFromLeft: {
					"0%": { left: "-100%" },
					"100%": { left: "0%" }
				},
				moveLeftFromRight: {
					"0%": { right: "-100%" },
					"100%": { right: "0%" }
				}
			}
		}
	},
	plugins: []
};
