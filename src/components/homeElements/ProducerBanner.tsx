import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function ProducerBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-[40%]";
	const buttonPaddingY = "py-3.5";
	const buttonFuncionality = {
		linkText: "Publicar Ahora",
		linkUrl: "/register",
	};



	return (
		<div className="relative flex justify-between w-full h-[100%] p-0 bg-white font-sans">
			<div className="w-[50%]">
				<img className="w-full"
					src="images/banners/ProducerBanner.jpg" alt="" 
				/>
			</div>

			<div className="absolute top-[16%] right-0 w-[53%] h-[70%] p-10 bg-[#F9F8F8] rounded-2xl flex flex-col gap-[2rem] justify-center text-[#797979]">
				<h2 className="text-3xl">¡Compartí tus <br/>conocimientos!</h2>
				<p>Publica sobre tu huerta o comparte tus mejores tips de jardinería.</p>
				<Button buttonColor={buttonColor} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={buttonFuncionality} />
			</div>
		</div>
	);
}

export default ProducerBanner;