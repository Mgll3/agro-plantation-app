/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				brandingYellow: "#F6C915"
			},
			spacing: {
				"53": "13.25rem"
			}
		},
	},
	plugins: [],
};

