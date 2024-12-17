import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function SecondaryNav() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize =
		"text-[1.5rem] custom-1000:text-[1.978rem] custom-2000:text-[3.2rem] custom-3000:text-[3.8rem]";
	const buttonWidth = "w-[140px] custom-1000:w-[160px] custom-2000:w-[260px] custom-3000:w-[350px]";
	const buttonPaddingY = "py-[0.27rem] custom-2000:py-[0.5rem]";

	return (
		<nav aria-label="Login y registro" className="">
			<ul className="flex gap-x-4 custom-2000:gap-x-8">
				<li className="" id="secondaryNavLoginLinkContainer">
					<Button
						id="secondaryNavLoginLink"
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Ingresa", linkUrl: "/login" }}
					></Button>
				</li>

				<li className="" id="secondaryNavRegisterLinkContainer">
					<Button
						id="secondaryNavRegisterLink"
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
