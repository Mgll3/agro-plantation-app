import { PublicationInfoType } from "../../admin/adminTypes";
import Button from "../../button/Button";

type ContactProducerProps = {
	publicationInfo: PublicationInfoType;
};

function ContactProducer({ publicationInfo }: ContactProducerProps) {
	const contactButtonFuncionality = {
		actionText: "Contactar",
		handleClick: contactProducer
	};

	function contactProducer() {
		const email = "***Email del Productor***";
		const mailto = `mailto:${email}`;
		window.location.href = mailto;
	}

	return (
		<div
			className="flex flex-col items-center w-[85.2%] mr-[0rem] mt-[3.2rem] p-[1.466rem_1.123rem_2.6rem] rounded-xl border-[1px] border-grey300 border-solid
				custom-700:w-[75%] custom-900:w-[65%] custom-1000:w-[60%] custom-1200:w-[28%]
				custom-1200:mr-[1rem]
				custom-700:mt-[4rem] custom-1200:mt-[0rem] custom-3500:mt-[6rem]
				custom-400:px-[4.123rem] custom-500:px-[4rem] custom-700:px-[7rem] custom-1200:p-[2rem] custom-1900:p-[2.5rem] custom-3500:p-[3rem]
				custom-1200:border-0"
		>
			<h2
				className="font-semibold text-[1.4rem] text-grey800
					custom-390:text-[1.6rem] custom-400:text-[1.812rem] custom-1900:text-[2.4rem] custom-2500:text-[2.8rem] custom-3500:text-[3.5rem]"
			>
				Contactar con productor
			</h2>

			<div
				className="w-[100%] mt-[2rem] mb-[2.4rem] border-[1px] border-ligthGrayText2 border-solid
					custom-400:w-[117%]  custom-500:w-[100%] custom-1200:w-[117%]
					custom-1200:mt-[2.5rem] custom-2500:mt-[3.5rem] custom-3500:mt-[4rem]
					custom-3500:mb-[4rem]"
			></div>

			<div
				className="flex flex-col items-center mb-[5rem] p-[2.2rem_2.2rem_1.531rem] bg-veryLightGrey
					custom-2500:p-[3rem_3rem_2rem] custom-3500:p-[4rem_4rem_4rem]"
			>
				<p
					className="font-semibold text-[1.466rem] text-black
						custom-1900:text-[1.8rem] custom-2500:text-[2.4rem] custom-3500:text-[3.2rem]"
				>
					{`${publicationInfo.author.name} ${publicationInfo.author.lastname}`}
				</p>
				<p
					className="font-normal text-[1.466rem] text-darkGrayText2
						custom-1900:text-[1.9rem] custom-2500:text-[2.3rem] custom-3500:text-[3rem]"
				>
					Productor Local
				</p>

				<div
					className="flex w-[100%] mt-[1rem]
						custom-1900:mt-[2rem] custom-2500:mt-[2.5rem] custom-3500:mt-[3.5rem]"
				>
					<img
						className="w-[18px]
							custom-1900:w-[25px] custom-2500:w-[30px] custom-3500:w-[38px]"
						src="/icons/contact/phone.svg"
						alt=""
					/>
					<p
						className="ml-[1rem] font-normal text-darkText text-[1.099rem]
							custom-1900:ml-[2rem]
							custom-1900:text-[1.6rem] custom-2500:text-[2rem] custom-3500:text-[2.8rem]"
					>
						***Teléfono***
					</p>
				</div>

				<div
					className="flex w-[100%] mt-[1rem]
			custom-2500:mt-[2.5rem] custom-3500:mt-[3.5rem]"
				>
					<img
						className="w-[22px]
				custom-1900:w-[28px] custom-2500:w-[35px] custom-3500:w-[42px]"
						src="/icons/contact/building.svg"
						alt=""
					/>
					<p
						className="ml-[1rem] font-normal text-darkText text-[1.099rem]
				custom-1900:ml-[2rem]
				custom-1900:text-[1.6rem] custom-2500:text-[2rem] custom-3500:text-[2.8rem]"
					>
						{publicationInfo.author.address}
					</p>
				</div>

				<div
					className="flex w-[100%] mt-[1rem]
			custom-2500:mt-[2.5rem] custom-3500:mt-[3.5rem]"
				>
					<img
						className="w-[18px]
				custom-1900:w-[25px] custom-2500:w-[30px] custom-3500:w-[38px]"
						src="/icons/contact/envelope.svg"
						alt=""
					/>
					<p
						className="ml-[1rem] font-normal text-darkText text-[1.099rem]
				custom-1900:ml-[2rem]
				custom-1900:text-[1.6rem] custom-2500:text-[2rem] custom-3500:text-[2.8rem]"
					>
						***Email del Productor***
					</p>
				</div>
			</div>

			<Button
				buttonColor="green"
				buttonFontSize="text-[1.2rem] custom-500:text-[1.374rem] custom-1900:text-[1.8rem] custom-2500:text-[2.5rem] custom-3500:text-[3rem]"
				buttonWidth="w-[39%] custom-400:w-[37%] custom-500:w-[33%] custom-700:w-[33%] custom-1200:w-[100%]"
				buttonPaddingY="py-[1rem] custom-1900:py-[1.5rem] custom-3500:py-[2rem]"
				buttonFuncionality={contactButtonFuncionality}
			/>
		</div>
	);
}

export default ContactProducer;
