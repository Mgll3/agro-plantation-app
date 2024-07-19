import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type NetworkErrorProps = {
	failedAction: string;
	buttonText: string;
	handleClose: () => void;
};

function NetworkError({ failedAction, buttonText, handleClose }: NetworkErrorProps) {
	const buttonColorYellow: ButtonColorType = "yellow";
	const buttonFontSize = "text-[24px]";
	const buttonWidth = "w-[243px]";
	const buttonPaddingY = "py-[6.5px]";
	const otherStyles = "tracking-normal";

	const buttonFuncionality = {
		actionText: buttonText,
		handleClick: handleClose
	};

	return (
		<div className="z-[1000] fixed left-0 top-0 flex justify-center items-center w-screen  h-screen bg-screenDarkening">
			<div className="flex items-center flex-col justify-center w-[709px] h-[489px] p-[64px_32px] bg-white text-center text-black font-sans rounded-2xl ">
				<div className="">
					<img src="/icons/modals/error-oops.png" className="w-[150px]" />
				</div>

				<h3 className="mt-[32px] text-[24px]">Hubo un problema al intentar {failedAction}</h3>

				<p className="mt-[12px] mb-[64px] text-[24px]">Por favor, revisa tu conexión e inténtalo de nuevo.</p>

				<div className="p-[1rem_0]">
					<Button
						buttonColor={buttonColorYellow}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={buttonFuncionality}
						otherStyles={otherStyles}
					/>
				</div>
			</div>
		</div>
	);
}

export default NetworkError;
