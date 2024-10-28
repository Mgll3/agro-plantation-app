import Button from "../../button/Button";
import { ProducerRequestsType } from "../adminTypes";

type ProducerRequestDetailsProps = {
	selectedRequest: ProducerRequestsType;
	onClickGoBack: () => void;
	onClickApprove: () => void;
	onClickReject: () => void;
};

function ProducerRequestDetails({
	selectedRequest,
	onClickGoBack,
	onClickApprove,
	onClickReject
}: ProducerRequestDetailsProps) {
	const selectedRadioStyles =
		"w-[2.5rem] custom-1900:w-[2.8rem] h-[2.5rem] custom-1900:h-[2.8rem] mr-[1.4rem] bg-black";
	const unselectedRadioStyles =
		"w-[2rem] custom-1900:w-[2.5rem] h-[2rem] custom-1900:h-[2.5rem] mr-[1.6rem] ml-[0.2rem] custom-600:ml-[0rem] border-[2px] border-solid border-borderBrand";

	const buttonFontSize =
		"text-[1.2rem] custom-500:text-[1.5rem] custom-700:text-[1.6rem] custom-900:text-[2rem] custom-1400:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[3.5rem]";
	const buttonPaddingY =
		"py-[0.85rem] custom-500:py-[1rem] custom-700:py-[1.5rem] custom-900:py-[1.8rem] custom-1000:py-[2rem] custom-1400:py-[2.52rem] custom-2500:py-[2.8rem] custom-3500:py-[3.2rem]";
	const buttonWidth =
		"w-[14rem] custom-390:w-[16rem] custom-500:w-[22rem] custom-700:w-[25rem] custom-900:w-[30rem] custom-1400:w-[40rem] custom-2500:w-[45rem] custom-3500:w-[53rem]";

	const buttonApproveFunctionality = {
		actionText: "Aceptar productor",
		handleClick: () => onClickApprove()
	};

	const buttonRejectFunctionality = {
		actionText: "Rechazar productor",
		handleClick: () => onClickReject()
	};

	return (
		<div
			className="w-full
			custom-1400:px-[8.2rem]"
		>
			<button
				type="button"
				onClick={onClickGoBack}
				className="flex items-center py-[0.51rem] px-[1.55rem] mb-[4rem] text-[1.6rem] font-semibold border-2 border-brandingYellow rounded-md
						custom-1400:mb-[6.4rem] custom-2500:mb-[10rem] custom-3500:mb-[14rem]
						custom-1900:text-[2rem] custom-2500:text-[2.8rem] custom-3500:text-[3.5rem]
						custom-1900:px-[1.6rem] custom-2500:px-[3rem] custom-3500:px-[4rem]
						custom-1900:py-[0.7rem] custom-2500:py-[1.1rem]"
			>
				<img
					alt=""
					src="/icons/Shape@2x.png"
					className="w-[10px] h-[17px] mr-[20px]
						custom-1900:w-[17px] custom-3500:w-[23px]
						custom-1900:h-[24px] custom-3500:h-[30px]"
				/>
				Volver
			</button>

			<h1
				className="text-[1.6rem] font-semibold mb-[4rem]
				custom-1400:text-[3.2rem] custom-1900:text-[3.5rem] custom-2500:text-[4.5rem] custom-3500:text-[6rem]
				custom-1400:font-bold
				custom-1400:mb-[6rem] custom-1900:mb-[7rem] custom-2500:mb-[12rem] custom-3500:mb-[15rem]"
			>
				Vista formulario usuarios postulados a productores.
			</h1>

			<div
				className="flex flex-wrap justify-between mb-[4rem]
				custom-1400:mb-[6.4rem] custom-1900:mb-[8rem] custom-2500:mb-[10.5rem] custom-3500:mb-[14rem]"
			>
				<div
					className="relative w-[100%] p-[1.6rem] mb-[4rem] border border-black border-solid rounded-md
						custom-1000:mb-[0rem]
						custom-600:w-[95%] custom-1000:w-[44%] custom-2500:w-[40%]
						custom-1900:p-[2rem] custom-2500:p-[2.5rem] custom-3500:p-[3rem]"
				>
					<p
						className="absolute top-[-9px] left-[15px] px-2 text-[1.3rem] bg-white
							custom-420:text-[1.6rem] custom-600:top-[-11px] custom-1400:top-[-12px] custom-2500:top-[-17px] custom-3500:top-[-23px]
							custom-1900:text-[2.1rem] custom-2500:text-[2.5rem] custom-3500:text-[3rem]"
					>
						Nombre de tu huerta
					</p>

					<p
						className="outline-none w-full placeholder-grey500 text-[1.6rem]
							custom-420:text-[2rem] custom-1900:text-[2.3rem] custom-2500:text-[3.2rem] custom-3500:text-[3.8rem]"
					>
						{selectedRequest.gardenName}
					</p>
				</div>

				<div
					className="relative w-[100%] p-[1.6rem] mb-[4rem] border border-black border-solid rounded-md
						custom-1000:mb-[0rem]
						custom-600:w-[95%] custom-1000:w-[44%] custom-2500:w-[40%]
						custom-1900:p-[2rem] custom-2500:p-[2.5rem] custom-3500:p-[3rem]"
				>
					<p
						className="absolute top-[-9px] left-[15px] px-2 text-[1.3rem] bg-white
							custom-420:text-[1.6rem] custom-600:top-[-11px] custom-1400:top-[-12px] custom-2500:top-[-17px] custom-3500:top-[-23px]
							custom-1900:text-[2.1rem] custom-2500:text-[2.5rem] custom-3500:text-[3rem]"
					>
						Dirección de tu huerta
					</p>

					<p
						className="outline-none w-full placeholder-grey500 text-[1.6rem]
							custom-420:text-[2rem] custom-1900:text-[2.3rem] custom-2500:text-[3.2rem] custom-3500:text-[3.8rem]"
					>
						{selectedRequest.gardenAddress}
					</p>
				</div>
			</div>

			<p
				className="mb-[1.6rem] text-[1.978rem]
				custom-1900:mb-[2.5rem] custom-2500:mb-[3.5rem] custom-3500:mb-[5rem]
				custom-1900:text-[2.5rem] custom-2500:text-[3rem] custom-3500:text-[3.6rem]"
			>
				Tamaño de la huerta
			</p>

			<div
				className="flex flex-col items-start
				custom-600:flex-row"
			>
				<div
					className="flex items-center mb-[3rem]
					custom-600:mb-[0rem]
					custom-600:mr-[4.6rem]"
				>
					<div
						className={`rounded-full ${selectedRequest.gardenSize === "familiar" ? selectedRadioStyles : unselectedRadioStyles}`}
					></div>
					<p
						className="text-[1.978rem] font-light
						custom-1900:text-[2.4rem] custom-2500:text-[2.9rem] custom-3500:text-[3.4rem]"
					>
						Familiar
					</p>
				</div>
				<div
					className="flex items-center mb-[3rem]
					custom-600:mb-[0rem]
					custom-600:mr-[4.6rem]"
				>
					<div
						className={`rounded-full ${selectedRequest.gardenSize === "comunitaria" ? selectedRadioStyles : unselectedRadioStyles}`}
					></div>
					<p
						className="text-[1.978rem] font-light
						custom-1900:text-[2.4rem] custom-2500:text-[2.9rem] custom-3500:text-[3.4rem]"
					>
						Comunitaria
					</p>
				</div>
				<div
					className="flex items-center mb-[3rem]
					custom-600:mb-[0rem]
					custom-600:mr-[4.6rem]"
				>
					<div
						className={`rounded-full ${selectedRequest.gardenSize === "comerciales" ? selectedRadioStyles : unselectedRadioStyles}`}
					></div>
					<p
						className="text-[1.978rem] font-light
						custom-1900:text-[2.4rem] custom-2500:text-[2.9rem] custom-3500:text-[3.4rem]"
					>
						Comerciales
					</p>
				</div>
			</div>

			<p
				className="mb-[1.6rem] mt-[4rem] text-[1.978rem]
				custom-1900:mb-[3rem] custom-2500:mb-[5rem] custom-3500:mb-[8rem]
				custom-600:mt-[7rem]
				custom-1900:text-[2.5rem] custom-2500:text-[3rem] custom-3500:text-[3.6rem]"
			>
				Cuéntanos un poco de tu huerta
			</p>

			<div
				className="relative w-[100%] mt-[0.8rem] p-2 border border-black border-solid rounded-2xl
					custom-1000:mt-[1.3rem] custom-1400:mt-[1.6rem] custom-2500:mt-[2.8rem] custom-3500:mt-[3.8rem]
					custom-1400:w-[79%]
					custom-1400:rounded-md"
			>
				<p
					className="absolute top-[-12px] left-[15px] px-2 text-[1.6rem] bg-white
						custom-600:top-[-11px] custom-1400:top-[-12px] custom-1900:top-[-16px] custom-2500:top-[-18px] custom-3500:top-[-26px]
						custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.3rem] custom-3500:text-[3rem]"
				>
					Descripción
				</p>

				<p
					className="w-full min-h-[19rem] px-[1.6rem] py-[2.7rem] text-[1.6rem]
							custom-1900:px-[3rem] custom-3500:px-[5rem]
							custom-1900:py-[3.7rem] custom-3500:py-[4.5rem]
							custom-1900:text-[2rem] custom-2500:text-[2.3rem] custom-3500:text-[3.2rem]"
				>
					{selectedRequest.description}
				</p>
			</div>

			<div
				className="flex justify-between mt-[5rem]
				custom-500:justify-center
				custom-500:gap-x-[5rem] custom-700:gap-x-[7rem] custom-1000:gap-x-[10rem] custom-1200:gap-x-[13rem] custom-1400:gap-x-[16rem] custom-2500:gap-x-[24rem] custom-3500:gap-x-[40rem]
				custom-1400:mt-[11.8rem]"
			>
				<Button
					buttonColor="red"
					buttonFontSize={buttonFontSize}
					buttonPaddingY={buttonPaddingY}
					buttonWidth={buttonWidth}
					buttonFuncionality={buttonRejectFunctionality}
				/>

				<Button
					buttonColor="yellow"
					buttonFontSize={buttonFontSize}
					buttonPaddingY={buttonPaddingY}
					buttonWidth={buttonWidth}
					buttonFuncionality={buttonApproveFunctionality}
				/>
			</div>
		</div>
	);
}

export default ProducerRequestDetails;
