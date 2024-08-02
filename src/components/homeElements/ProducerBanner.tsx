import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function ProducerBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[1.2rem] custom-500:text-[1.8rem] custom-1000:text-[2.4rem] custom-2000:text-[3rem]";
	const buttonWidth = "w-[12.3rem] custom-500:w-[15.5rem] custom-1000:w-[20.8rem] custom-2000:w-[29rem]";
	const buttonPaddingY = "py-[1.4rem]";
	const otherStyles = "px-[0.4rem]";
	const buttonFuncionality = {
		linkText: "Publicar ahora",
		linkUrl: "/producer/publications/createPublication"
	};

	return (
		<div className="overflow-hidden relative justify-between w-full h-[100%] p-0 bg-white border-[2px] border-grey500 border-solid custom-1000:border-0 rounded-3xl custom-1000:rounded-none font-sans">
			<div className="w-full custom-1000:w-[58.4%]">
				<img className="w-full" src="images/banners/ProducerBanner.jpg" alt="" />
			</div>

			<div className="w-[41.6%]"></div>

			<div className="static custom-1000:absolute top-[16%] right-0 flex flex-col custom-1000:justify-center w-full custom-1000:w-[48.6%] custom-1000:h-[72.42%] px-[2px] pt-[8px] pb-[12px] custom-1000:pl-[4.76%] custom-1000:pr-[2.644%] bg-terciary300 custom-1000:bg-[#F9F8F8] custom-1000:rounded-3xl">
				<h2 className="leading-tight custom-1000:leading-[5.7rem] custom-2000:leading-normal text-[1.7rem] custom-390:text-[2rem] custom-500:text-[2.8rem] custom-1000:text-[3.649rem] custom-2000:text-[2vw] custom-1000:text-grey700 font-semibold custom-1000:font-normal tracking-[0.1rem]">
					¡Compartí tus conocimientos!
				</h2>
				<p className="my-[9.29px] custom-500:mb-[22px] custom-1000:my-[25px] text-[1.6rem] custom-500:text-[2rem] custom-1000:text-[1.6rem] custom-1900:text-[1.8rem] custom-2000:text-[1vw] font-openSans">
					Publica sobre tu huerta o comparte tus mejores tips de jardinería.
				</p>
				<div className="self-center custom-1000:self-start">
					<Button
						buttonColor={buttonColor}
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

export default ProducerBanner;
