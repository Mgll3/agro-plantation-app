import { Link } from "react-router-dom";
import { ButtonProps } from "./buttonTypes";

function Button({
	id,
	buttonColor,
	buttonFontSize,
	buttonWidth,
	buttonPaddingY,
	buttonFuncionality,
	otherStyles
}: ButtonProps) {
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
				id={id ? id : undefined}
				type="button"
				onClick={buttonFuncionality.handleClick}
				className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${bgColor} ${textColor} shadow-md rounded-lg custom-900:rounded-xl custom-2000:rounded-2xl font-sans cursor-pointer font-bold tracking-widest ${buttonColor === "green" ? "hover:bg-green300" : "hover:bg-brandingDarkGreen"}  transition-all ${buttonColor === "green" ? "hover:text-black" : "hover:text-[#F6C915]"} ${otherStyles}`}
			>
				{buttonFuncionality.actionText}
			</button>
		);
	} else if ("submitText" in buttonFuncionality) {
		return (
			<button
				id={id ? id : undefined}
				type="submit"
				className={`${buttonWidth} ${buttonPaddingY} ${buttonFontSize} ${bgColor} ${textColor} shadow-md rounded-lg custom-900:rounded-xl custom-2000:rounded-2xl font-sans cursor-pointer font-bold hover:bg-opacity-80 transition-all ${otherStyles}`}
			>
				{buttonFuncionality.submitText}
			</button>
		);
	} else if ("linkText" in buttonFuncionality) {
		return (
			<Link to={buttonFuncionality.linkUrl} className={`inline-block ${buttonWidth}`} id={id ? id : undefined}>
				<button
					className={`${buttonPaddingY} ${buttonFontSize} ${bgColor} ${textColor} w-[100%] shadow-md rounded-lg custom-900:rounded-xl custom-2000:rounded-2xl font-sans cursor-pointer font-bold ${buttonColor === "green" ? "hover:bg-green300" : "hover:bg-brandingDarkGreen"} transition-all ${buttonColor === "green" ? "hover:text-black" : "hover:text-[#F6C915]"} ${otherStyles}`}
				>
					{buttonFuncionality.linkText}
				</button>
			</Link>
		);
	}
}

export default Button;
