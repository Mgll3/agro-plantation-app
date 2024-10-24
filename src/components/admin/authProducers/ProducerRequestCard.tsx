import Button from "../../button/Button";
import { ProducerRequestsType } from "../adminTypes";

type ProducerRequestCardProps = {
	request: ProducerRequestsType;
	onClickShowDetails: () => void;
};

function ProducerRequestCard({ request, onClickShowDetails }: ProducerRequestCardProps) {
	const buttonFontSize =
		"text-[1rem] custom-500:text-[1.3rem] custom-700:text-[1.6rem] custom-900:text-[1.978rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem]";
	const buttonPaddingY = "py-[0.33rem]";
	const buttonWidth = "w-[27%] custom-1400:w-[28.81%]";

	const buttonGoToDetailsFunctionality = {
		actionText: "Ver Perfil",
		handleClick: onClickShowDetails
	};

	const shortedDescription = `${request.description.substring(0, 40)}...`;

	return (
		<div className="flex justify-between items-center w-full mb-[0.77rem] px-[2.038rem] py-[0.5rem] bg-terciary50">
			<div>
				<p className="text-[1.2rem] font-semibold">{request.gardenName}</p>
				<div className="text-[0.9rem]">
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
