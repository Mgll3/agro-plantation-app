import { windowWidthType } from "../../../pages/admin/AdminUsers";
import Button from "../../button/Button";
import { ProducerRequestsType } from "../adminTypes";

type ProducerRequestCardProps = {
	request: ProducerRequestsType;
	windowWidth: windowWidthType;
	onClickShowDetails: (requestData: ProducerRequestsType) => void;
};

function ProducerRequestCard({ request, windowWidth, onClickShowDetails }: ProducerRequestCardProps) {
	const buttonFontSize =
		"text-[1rem] custom-500:text-[1.4rem] custom-700:text-[1.6rem] custom-900:text-[1.8rem] custom-1400:text-[2rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem]";
	const buttonPaddingY =
		"py-[0.33rem] custom-700:py-[0.5rem] custom-1400:py-[0.7rem] custom-2500:py-[1rem] custom-3500:py-[1.2rem]";
	const buttonWidth =
		"w-[25%] custom-500:w-[23%] custom-700:w-[22.5%] custom-1400:w-[21.5%] custom-2500:w-[18%] custom-3500:w-[14%]";

	const buttonGoToDetailsFunctionality = {
		actionText: "Ver Perfil",
		handleClick: () => onClickShowDetails(request)
	};

	//Esta sección determina el nº de caracteres de request.description que se renderizan en pantalla. El objetivo es que no haya un salto de línea.
	let numberOfCharacters: number = 0;

	switch (windowWidth) {
		case "xs":
			numberOfCharacters = 33;
			break;

		case "s":
			numberOfCharacters = 40;
			break;

		case "m":
			numberOfCharacters = 42;
			break;

		case "lg":
			numberOfCharacters = 55;
			break;

		case "xl":
			numberOfCharacters = 60;
			break;

		default:
			break;
	}

	const shortedDescription = `${request.description.substring(0, numberOfCharacters)}...`;

	return (
		<div
			className="flex justify-between items-center w-full mb-[0.77rem] px-[2.038rem] py-[0.5rem] bg-terciary50
			custom-500:mb-[1rem] custom-700:mb-[1.3rem] custom-1400:mb-[1.6rem] custom-2500:mb-[2rem] custom-3500:mb-[3rem]
			custom-700:px-[2.7rem] custom-1400:px-[4.25rem] custom-2500:px-[5rem] custom-3500:px-[7rem]
			custom-700:py-[0.7rem] custom-1400:py-[1rem] custom-2500:py-[1.3rem] custom-3500:py-[1.5rem]"
		>
			<div>
				<p
					className="text-[1.2rem] font-semibold
					custom-500:text-[1.6rem] custom-700:text-[1.8rem] custom-900:text-[2.1rem] custom-1200:text-[2.4rem] custom-1900:text-[2.8rem] custom-2500:text-[3.2rem] custom-3500:text-[3.7rem]"
				>
					{request.gardenName}
				</p>
				<div
					className="text-[0.9rem]
					custom-500:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.4rem] custom-3500:text-[2.9rem]"
				>
					<p>{request.gardenAddress}</p>
					<p>{shortedDescription}</p>
				</div>
			</div>

			<Button
				buttonColor="yellow"
				buttonFontSize={buttonFontSize}
				buttonPaddingY={buttonPaddingY}
				buttonWidth={buttonWidth}
				buttonFuncionality={buttonGoToDetailsFunctionality}
			/>
		</div>
	);
}

export default ProducerRequestCard;
