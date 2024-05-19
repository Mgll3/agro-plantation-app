import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function CallToAction() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-40";
	const buttonPaddingY = "py-3.5";

	return (
		<div className="flex items-center justify-between w-full bg-[#F9F8F8] p-[16px_128px]">
			<div className="flex flex-col ">
				<p className="font-niramit text-2xl text-semiTansparentBlack">Regístrate a PLANT-IN y compartí tu huerta, tus cosechas y mucho más.
				</p>
				<p>Completa el formulario y forma parte de la Comunidad <span className="text-[#1B7E25]"> PLANT- IN!!!</span></p>
			</div>

			<Button
				buttonColor={buttonColor}
				buttonFontSize={buttonFontSize}
				buttonWidth={buttonWidth}
				buttonPaddingY={buttonPaddingY}
				buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}>
			</Button>
		</div>
	);
}

export default CallToAction;
