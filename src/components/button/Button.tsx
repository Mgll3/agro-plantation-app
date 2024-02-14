
type ButtonProps = {
	text: string,
	type: "nav" | "register" | "action",
	buttonColor: "yellow" | "green" | "grey"
}

function Button({ text, type, buttonColor }: ButtonProps) {

	let color: string = "";
	let width: string = "";
	let paddingVertical: string = "";
	let fontSize: string = "";
	const boxShadow = "shadow-md";


	switch (type) {
		case "nav":
			width = "w-53";
			paddingVertical = "py-2.5";
			fontSize = "text-lg";
			break;

		case "register":
			width = "w-44";
			paddingVertical = "py-4";
			fontSize = "text-lg";
			break;

		case "action":
			width = "w-52";
			paddingVertical = "py-4";
			fontSize = "text-2xl";
			break;

		default:
			break;
	}

	switch (buttonColor) {
		case "yellow":
			color = "bg-brandingYellow";
			break;

		case "green":
			color = "bg-green-600";
			break;

		case "grey":
			color = "bg-gray-500";
			break;

		default:
			break;
	}

	return (
		<button className={`${boxShadow} ${width} ${paddingVertical} ${fontSize} ${color} text-black rounded-lg font-mono cursor-pointer font-bold`}>
			{text}
		</button>
	);
}

export default Button;
