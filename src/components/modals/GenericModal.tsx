

//Modal genérico con texto principal, texto secundario y botón para cerrar el modal u otros efectos.

import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type GenericModalProps = {
	mainText: string,
	secondaryText: string,
	buttonText: string,
	handleClick: () => void
}

function GenericModal( {mainText, secondaryText, buttonText, handleClick}: GenericModalProps) {
	const buttonColorYellow: ButtonColorType = "yellow";
	const buttonFontSize = "text-[19.78px]";
	const buttonWidth = "w-[180px]";
	const buttonPaddingY = "py-[16px]";

	const buttonFuncionality = {
		actionText: buttonText,
		handleClick: handleClick
	};


	return (
		<div className="z-50 fixed top-0 flex justify-center items-center w-screen  h-screen bg-screenDarkening">
			<div className="flex flex-col items-center w-[550px] px-[35px] py-[64px] bg-white rounded-2xl text-center font-light">
				<h2 className="text-[32px] tracking-[-1.5%]">
					{mainText}
				</h2>

				<p className="mt-8 mb-20 text-[19.78px]">
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
