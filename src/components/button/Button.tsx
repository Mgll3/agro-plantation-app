import { Link } from "react-router-dom";
import { ButtonProps } from "./buttonTypes";

function Button({ buttonColor, buttonFontSize, buttonWidth, buttonPaddingY, buttonFuncionality }: ButtonProps) {
	let bgColor: string = "";
	let textColor: string = "";

	switch (buttonColor) {
		case "yellow":
			bgColor = "bg-brandingYellow";
			textColor = "text-black";
			break;

		case "green":
			bgColor = "bg-brandingDarkGreen";
			textColor = "text-brandingYellow";
			break;

		case "grey":
			bgColor = "bg-gray-500";
			textColor = "text-brandingYellow";
			break;

		case "red":
			bgColor = "bg-redError";
			textColor = "text-black";
			break;

		default:
			break;
	}

	if ("actionText" in buttonFuncionality) {
		return (
			<button
				type="button"
				onClick={buttonFuncionality.handleClick}
				className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${bgColor} ${textColor} shadow-md rounded-lg font-sans cursor-pointer font-bold tracking-widest hover:bg-brandingDarkGreen transition-all hover:text-[#F6C915]`}
			>
				{buttonFuncionality.actionText}
			</button>
		);
	} else if ("submitText" in buttonFuncionality) {
		return (
			<button
				type="submit"
				className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${bgColor} ${textColor} shadow-md rounded-lg font-sans cursor-pointer font-bold hover:bg-opacity-80 transition-all`}
			>
				{buttonFuncionality.submitText}
			</button>
		);
	} else if ("linkText" in buttonFuncionality) {
		return (
			<Link to={buttonFuncionality.linkUrl} className={`inline-block ${buttonWidth}`}>
				<button
					className={`${buttonPaddingY} ${buttonFontSize} ${bgColor} ${textColor} w-[100%] shadow-md rounded-lg font-sans cursor-pointer font-bold hover:bg-brandingDarkGreen transition-all hover:text-[#F6C915]`}
				>
					{buttonFuncionality.linkText}
				</button>
			</Link>
		);
	}
}

export default Button;
