import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function ProducerBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[24px]";
	const buttonWidth = "w-[40%]";
	const buttonPaddingY = "py-[14px]";
	const otherStyles = "px-[4px]";
	const buttonFuncionality = {
		linkText: "Publicar ahora",
		linkUrl: "/producer/publications/createPublication"
	};

	return (
		<div className="relative flex justify-between w-full h-[100%] p-0 bg-white font-sans">
			<div className="w-[58.4%]">
				<img className="w-full" src="images/banners/ProducerBanner.jpg" alt="" />
			</div>

			<div className="w-[41.6%]"></div>

			<div className="absolute top-[16%] right-0 flex flex-col justify-center w-[48.6%] h-[72.42%] pl-[4.76%] pr-[2.644%] text-grey700 bg-[#F9F8F8] rounded-2xl">
				<h2 className="leading-[50.7px] text-[36.49px] tracking-[1px]">¡Compartí tus conocimientos!</h2>
				<p className="my-[25px] text-[16px] font-openSans">
					Publica sobre tu huerta o comparte tus mejores tips de jardinería.
				</p>
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
	);
}

export default ProducerBanner;
