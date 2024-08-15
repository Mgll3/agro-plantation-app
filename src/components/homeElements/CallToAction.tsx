import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function CallToAction() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSizeDesktop = "text-[1.978rem]";
	const buttonWidth = "w-[20.8rem]";
	const buttonPaddingY = "py-[1.717rem]";

	return (
		<div className="flex w-full p-4 font-sans text-semiTansparentBlack bg-brandingLightGreen items-center
		md:justify-between md:py-[4rem] md:pl-[13.3rem] md:pr-[16.9rem] md:text-[2.4rem] ">
			<div>
				<p>Regístrate a PLANT-IN y compartí tu huerta, tus cosechas y mucho más.</p>
				<p className="mt-[1.2rem]">
					Completa el formulario y forma parte de la Comunidad
					<span className="font-loginFont text-brandingDarkGreen"> PLANT-IN </span>!!!
				</p>
			</div>

			<Button
				buttonColor={buttonColor}
				buttonFontSize={buttonFontSizeDesktop}
				buttonWidth={buttonWidth}
				buttonPaddingY={buttonPaddingY}
				buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}
			></Button>
		</div>
	);
}

export default CallToAction;
