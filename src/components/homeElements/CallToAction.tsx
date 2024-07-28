import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function CallToAction() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[1.978rem]";
	const buttonWidth = "w-[20.8rem]";
	const buttonPaddingY = "py-[1.717rem]";

	return (
		<div className="flex justify-between items-center w-full py-[4rem] pl-[13.3rem] pr-[16.9rem] font-sans text-[2.4rem] text-semiTansparentBlack bg-brandingLightGreen">
			<div>
				<p>Regístrate a PLANT-IN y compartí tu huerta, tus cosechas y mucho más.</p>
				<p className="mt-[1.2rem]">
					Completa el formulario y forma parte de la Comunidad
					<span className="font-loginFont text-brandingDarkGreen"> PLANT-IN </span>!!!
				</p>
			</div>

			<Button
				buttonColor={buttonColor}
				buttonFontSize={buttonFontSize}
				buttonWidth={buttonWidth}
				buttonPaddingY={buttonPaddingY}
				buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}
			></Button>
		</div>
	);
}

export default CallToAction;
