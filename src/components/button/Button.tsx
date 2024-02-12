
type ButtonProps = {
	text: string,
	size: "small" | "medium" | "big",
	color: "blue" | "green" | "grey"
}

function Button({ text, size, color }: ButtonProps) {

	const buttonStyles = {
		size: "",
		color: ""
	};

	switch (size) {
		case "small":
			buttonStyles.size = "w-20";
			break;

		case "medium":
			buttonStyles.size = "w-28";
			break;

		case "big":
			buttonStyles.size = "w-36";
			break;

		default:
			break;
	}

	switch (color) {
		case "blue":
			buttonStyles.color = "bg-blue-500";
			break;

		case "green":
			buttonStyles.color = "bg-green-600";
			break;

		case "grey":
			buttonStyles.color = "bg-gray-500";
			break;

		default:
			break;
	}

	return (
		<button className={`${buttonStyles.size} ${buttonStyles.color} border text-white px-2 py-1 rounded-md font-mono cursor-pointer text-lg font-semibold`}>
			{text}
		</button>
	);
}

export default Button;
