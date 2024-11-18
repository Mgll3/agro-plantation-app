import Button from "../../button/Button";
import { ButtonColorType } from "../../button/buttonTypes";

type VotePublicationProps = {
	isVoted: boolean;
	//Esta variable se utiliza para cambiar el aspecto del botón de voto sin necesidad de hacer una nueva consulta al servidor para saber el valor de "userVote"
	isVoteChangedFlag?: null | string;
	handleVotePublication: () => void;
};

function VotePublication({ isVoted, isVoteChangedFlag, handleVotePublication }: VotePublicationProps) {
	const voteButtonFuncionality = {
		actionText: isVoted ? "NO ME GUSTA!" : "ME GUSTA!",
		handleClick: handleVotePublication
	};

	let buttonColor: ButtonColorType;

	if (!isVoteChangedFlag) {
		buttonColor = isVoted ? "red" : "green";
	} else {
		buttonColor = isVoteChangedFlag === "like" ? "green" : "red";
		voteButtonFuncionality.actionText = isVoteChangedFlag === "like" ? "ME GUSTA!" : "NO ME GUSTA!";
	}

	return (
		<div
			className="flex flex-col items-center w-[88.5%] mr-[0rem] mt-[3.2rem] p-[1.466rem_1.123rem_2.6rem] rounded-xl font-sans
				custom-500:w-[75%] custom-900:w-[65%] custom-1000:w-[60%] custom-1200:w-[30%] custom-2500:w-[28%] custom-3500:w-[27%]
				custom-700:mt-[4rem] custom-1200:mt-[0rem] custom-3500:mt-[6rem]
				custom-400:px-[3.123rem] custom-500:px-[3rem] custom-700:px-[7rem] custom-1200:px-[0rem]
				custom-1200:pr-0 custom-1900:pr-[5rem] custom-2500:pr-[7rem] custom-3500:pr-[17rem]
				custom-1200:pl-[2rem]"
		>
			<h2
				className="font-semibold text-[1.82rem] text-darkText
				custom-600:text-[2rem] custom-700:text-[2.2rem] custom-1200:text-[1.82rem] custom-1900:text-[2.2rem] custom-2500:text-[2.7rem] custom-3500:text-[3.2rem]"
			>
				Regálanos un ME GUSTA!
			</h2>
			<div
				className="w-[110%] mt-[2.5rem] mb-[2.382rem] border-[1px] border-ligthGrayText2 border-solid
					custom-400:w-[120%]  custom-500:w-[115%]
					custom-1200:mt-[2.5rem] custom-2500:mt-[3.5rem] custom-3500:mt-[4rem]
					custom-3500:mb-[4rem]"
			></div>

			<div
				className="mb-[1.8rem] pt-[2.2rem] pb-[4.5rem] px-[2.25rem] bg-veryLightGrey border-[1px] border-ligthGrayText2 border-solid shadow-below-dark
				custom-2500:px-[4rem] custom-3500:px-[8rem]"
			>
				<h3
					className="text-center font-semibold text-[1.466rem] leading-[120%]
					custom-600:text-[1.7rem] custom-700:text-[1.9rem] custom-1200:text-[1.47rem] custom-1900:text-[1.9rem] custom-2500:text-[2.3rem] custom-3500:text-[2.7rem]"
				>
					Para que sirve darnos <br></br> ME GUSTA?
				</h3>
				<p
					className="mt-[2.4rem] text-[1.2rem]
					custom-500:text-[1.3rem] custom-600:text-[1.4rem] custom-700:text-[1.5rem] custom-1200:text-[1.2rem] custom-1900:text-[1.5rem] custom-2500:text-[2rem] custom-3500:text-[2.4rem]"
				>
					Darnos un me gusta, nos da visibilidad. <br></br>
					Nos hace sentir que nuestros proyectos están teniendo sentido y que la importancia que le damos a la
					agroecología está dando sus frutos. Por eso si te gustó la publicación, regálale al productor un me gusta!!!
				</p>
			</div>

			<Button
				buttonColor={buttonColor}
				buttonFontSize="text-[1.45rem] custom-1900:text-[1.8rem] custom-2500:text-[2.5rem] custom-3500:text-[3rem]"
				buttonWidth="w-[100%]"
				buttonPaddingY="py-[1.18rem] custom-1900:py-[1.5rem] custom-3500:py-[2rem]"
				buttonFuncionality={voteButtonFuncionality}
			/>
		</div>
	);
}

export default VotePublication;
