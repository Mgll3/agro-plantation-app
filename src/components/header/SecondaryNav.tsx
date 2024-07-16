import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function SecondaryNav() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[1.978rem]";
	const buttonWidth = "w-[160px]";
	const buttonPaddingY = "py-[0.27rem]";

	return (
		<nav aria-label="Login y registro" className="">
			<ul className="flex gap-x-4">
				<li className="">
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Ingresa", linkUrl: "/login" }}
					></Button>
				</li>

				<li className="">
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Regístrate", linkUrl: "/register" }}
					></Button>
				</li>
			</ul>
		</nav>
	);
}

export default SecondaryNav;
