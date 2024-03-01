import { Link } from "react-router-dom";
import { ButtonProps } from "./buttonTypes";

function Button({ buttonColor, buttonFontSize, buttonWidth, buttonPaddingY, buttonFuncionality }: ButtonProps) {

	let color: string = "";
	let textColor: string = "";

	switch (buttonColor) {
		case "yellow":
			color = "bg-brandingYellow";
			textColor = "text-black";
			break;

		case "green":
			color = "bg-brandingDarkGreen";
			textColor = "text-brandingYellow";
			break;

		case "grey":
			color = "bg-gray-500";
			textColor = "text-brandingYellow";
			break;

		default:
			break;
	}

	if ("actionText" in buttonFuncionality) {
		return (
			<button
				type="button"
				onClick={buttonFuncionality.handleClick}
				className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${color} ${textColor} shadow-md rounded-lg font-loginFont cursor-pointer font-bold tracking-widest`}
			>
				{buttonFuncionality.actionText}
			</button>
		);
	} else if ("submitText" in buttonFuncionality) {
		return (
			<button
				type="submit"
				className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${color} ${textColor} shadow-md rounded-lg font-sans cursor-pointer font-bold hover:opacity-80`}
			>
				{buttonFuncionality.submitText}
			</button>
		);
	} else if ("linkText" in buttonFuncionality) {
		return (
			<Link to={buttonFuncionality.linkUrl} className="">
				<button
					className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${color} ${textColor} shadow-md rounded-lg font-sans cursor-pointer font-bold hover:bg-brandingDarkGreen`}
				>

					{buttonFuncionality.linkText}

				</button>
			</Link>
		);
	}
}

export default Button;
