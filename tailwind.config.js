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
				grey300: "#DAD9D9",
				grey400: "#CECDCD",
				grey500: "#C2C0C0",
				grey600: "#9C9999",
				grey700: "#6B6B6B",
				grey800: "#4E4C4C",
				brown150: "#F7F4E6",
				terciary300: "#BFD390"
			},
			spacing: {
				53: "13.25rem"
			},
			backgroundImage: {
				headerBg: "url('@/images/backgrounds/header_background.avif')",
				headerBgAdmin: "url('@/images/backgrounds/header_background_admin.png')",
				login: "url('@/images/backgrounds/inicio_y_registro.jpg')",
				publicationCardsBg: "url('@/images/backgrounds/cards-background.jpg')"
			},
			gridTemplateColumns: {
				form: "repeat(auto-fit, minmax(300px, 1fr))"
			},
			dropShadow: {
				custom: "0 3px 3px rgba(0, 0, 0, 0.55)"
			},
			boxShadow: {
				"below-light": "2px 2px 5px rgba(0, 0, 0, 0.2)",
				"below-dark": "0px 4px 4px rgba(0, 0, 0, 0.5)",
				"around-light": "0px 0px 10px rgba(0, 0, 0, 0.2)",
				"around-dark": "0px 0px 5px rgba(0, 0, 0, 0.5)"
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
