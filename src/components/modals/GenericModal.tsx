//Modal genérico con texto principal, texto secundario y botón para cerrar el modal u otros efectos.

import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type GenericModalProps = {
	mainText: string;
	secondaryText: string;
	buttonText: string;
	handleClick: () => void;
};

function GenericModal({ mainText, secondaryText, buttonText, handleClick }: GenericModalProps) {
	const buttonColorYellow: ButtonColorType = "yellow";
	const buttonFontSize = "text-[2rem] custom-1900:text-[2.2rem] custom-2500:text-[3rem]";
	const buttonWidth =
		"w-[11.7rem] custom-500:w-[13rem] custom-900:w-[15rem] custom-1400:w-[18rem] custom-2500:w-[25rem]";
	const buttonPaddingY = "py-[1rem] custom-900:py-[1.3rem] custom-1400:py-[1.6rem]";

	const buttonFuncionality = {
		actionText: buttonText,
		handleClick: handleClick
	};

	return (
		<div className="z-[1000] fixed top-0 flex justify-center items-center w-screen  h-screen bg-screenDarkening">
			<div
				className="flex flex-col items-center w-[93%] px-[1.9rem] py-[4.1rem] bg-white rounded-2xl text-center font-light
				custom-500:w-[470px] custom-900:w-[500px] custom-1400:w-[550px] custom-1900:w-[600px] custom-2500:w-[800px]
				custom-1400:px-[3.2rem]
				custom-420:py-[6.4rem]"
			>
				<h2
					className="text-[2.4rem] tracking-[0%] font-semibold
						custom-1400:tracking-[-1.5%]
						custom-900:text-[2.9rem] custom-1400:text-[3.2rem] custom-1900:text-[3.4rem] custom-2500:text-[4.5rem]"
				>
					{mainText}
				</h2>

				<p
					className="mt-8 mb-20 text-[1.978rem]
					custom-1900:text-[2.3rem] custom-2500:text-[3rem]"
				>
					{secondaryText}
				</p>

				<Button
					buttonColor={buttonColorYellow}
					buttonFontSize={buttonFontSize}
					buttonPaddingY={buttonPaddingY}
					buttonWidth={buttonWidth}
					buttonFuncionality={buttonFuncionality}
				/>
			</div>
		</div>
	);
}

export default GenericModal;
