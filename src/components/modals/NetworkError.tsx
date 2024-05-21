import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type NetworkErrorProps = {
	failedAction: string,
	buttonText: string,
	handleClose: () => void
}

function NetworkError( {failedAction, buttonText, handleClose}: NetworkErrorProps) {
	const buttonColorYellow: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-[200px]";
	const buttonPaddingY = "py-3.5";

	const buttonFuncionality = {
		actionText: buttonText,
		handleClick: handleClose
	};

	
	return (
		<div className="z-50 fixed left-0 top-0 flex justify-center items-center w-screen  h-screen bg-screenDarkening">
			<div className="flex items-center flex-col justify-between bg-brandingLightYellow w-[30vw] h-[58vh] text-center text-black font-sans rounded-xl shadow-[0_6px_16px_#94B447] p-[.5rem_1rem]">

				<div className="">
					<img src="icons/modals/error-oops.png" className="w-[120px]"/>
				</div>
			
				<h3 className="text-size2 font-light">Hubo un problema al intentar {failedAction}</h3>

				<p className="text-size3 font-light p-[2rem_0]">Por favor, revisa tu conexión e inténtalo de nuevo</p>

				<div className="p-[1rem_0]">
					<Button 
						buttonColor={buttonColorYellow}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={buttonFuncionality} 
					/>
				</div>

			</div>
	
		</div>
	);
}

export default NetworkError;