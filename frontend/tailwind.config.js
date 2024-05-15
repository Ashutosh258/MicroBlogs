import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
// /** @type {import('tailwindcss').Config} */rgb(190,126,64)
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			"light",
			{
				black: {
					...daisyUIThemes["coffee"],
					primary: "rgb(190,126,64)",
					secondary: "rgb(32,53,54)",
				},
			},
		],
	},
};