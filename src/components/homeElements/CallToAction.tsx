import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function CallToAction() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize =
		"text-[1rem] custom-400:text-[1.2rem]  custom-600:text-[1.5rem] custom-700:text-[1.7rem] custom-900:text-[1.978rem] custom-1900:text-[3rem] custom-2500:text-[3.5rem] custom-3500:text-[5rem]";
	const buttonWidth =
		"w-[13rem] custom-400:w-[13.23rem] custom-600:w-[20.8rem] custom-1900:w-[30rem] custom-2500:w-[38rem] custom-3500:w-[55rem]";
	const buttonPaddingY = "py-[0.8rem] custom-1400:py-[1.72rem] custom-1900:py-[2rem] custom-3500:py-[3rem]";

	return (
		<div
			className="flex justify-between items-center w-full py-[0.8rem] px-[1.6rem] font-sans text-semiTansparentBlack bg-brandingLightGreen 
			custom-600:py-[2rem] custom-600:px-[3rem]
			custom-1200:px-[6rem]
			custom-1400:py-[4rem] custom-1400:pl-[13.3rem] custom-1400:pr-[16.9rem]
			custom-2500:py-[6rem] custom-2500:pl-[16.3rem] custom-2500:pr-[19.9rem]
			custom-3500:py-[8rem] custom-3500:pl-[26rem] custom-3500:pr-[35rem]
			"
		>
			<div className="mr-[2.1rem] custom-600:mr-[4rem] text-[1.2rem] custom-600:text-[1.6rem] custom-750:text-[2.4rem] custom-1900:text-[3.2rem] custom-2500:text-[4.5rem] custom-3500:text-[6rem]">
				<p>
					Regístrate a{" "}
					<span className="font-loginFont text-[1.4rem] custom-600:text-[2rem] custom-750:text-[2.4rem] custom-1900:text-[3.2rem] custom-2500:text-[4.5rem] custom-3500:text-[6rem]">
						PLANT-IN{" "}
					</span>
					y compartí tu huerta, tus cosechas y mucho más.
				</p>
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
				buttonFuncionality={{ linkText: "Regístrate", linkUrl: "/register" }}
			></Button>
		</div>
	);
}

export default CallToAction;
