import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type NetworkErrorProps = {
	failedAction: string;
	buttonText: string;
	handleClose: () => void;
};

function NetworkError({ failedAction, buttonText, handleClose }: NetworkErrorProps) {
	const buttonColorYellow: ButtonColorType = "yellow";
	const buttonFontSize = "text-[2rem] custom-700:text-[2.4rem] custom-2500:text-[3rem]";
	const buttonWidth = "w-[200px] custom-700:w-[225px] custom-1400:w-[243px]";
	const buttonPaddingY = "py-[0.65rem] custom-700:py-[1rem] custom-2500:py-[1.5rem]";
	const otherStyles = "tracking-normal";

	const buttonFuncionality = {
		actionText: buttonText,
		handleClick: handleClose
	};

	return (
		<div className="z-[1000] fixed left-0 top-0 flex justify-center items-center w-screen  h-screen bg-screenDarkening">
			<div
				className="flex items-center flex-col justify-center w-[95vw] aspect-[709/489] p-[32px_16px] bg-white text-center text-black font-sans rounded-2xl
				custom-600:w-[85vw] custom-700:w-[70vw] custom-1000:w-[60vw] custom-1200:w-[55vw] custom-1400:w-[50vw] custom-1900:w-[40vw] custom-2500:w-[37vw] custom-3500:w-[27vw]
				custom-1200:p-[40px_20px] custom-1400:p-[64px_32px]
				custom-1400:rounded-3xl"
			>
				<div className="">
					<img
						src="/icons/modals/error-oops.png"
						className="w-[120px]
						custom-420:w-[150px] custom-2500:w-[250px]"
					/>
				</div>

				<h3
					className="mt-[32px] text-[2rem]
					custom-700:text-[2.4rem] custom-2500:text-[3rem]"
				>
					Hubo un problema al intentar {failedAction}
				</h3>

				<p
					className="mt-[12px] mb-[3rem] text-[2rem]
					custom-1400:mb-[6.4rem]
					custom-700:text-[2.4rem] custom-2500:text-[3rem]"
				>
					Por favor, revisa tu conexión e inténtalo de nuevo.
				</p>

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
