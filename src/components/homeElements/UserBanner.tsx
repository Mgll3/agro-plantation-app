import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function UserBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-[40%]";
	const buttonPaddingY = "py-3.5";
	const buttonFuncionality = {
		linkText: "Quiero ser productor",
		linkUrl: "/register",
	};



	return (
		<div className="flex justify-center items-center w-full p-10 bg-[#ebeaea] font-sans">
			<div className="w-[45%]">
				<img className="w-full"
					src="images/banners/UserBanner.png" alt="" 
				/>
			</div>

			<div className="w-[40%]">
				<h2 className="font-semibold text-2xl pb-2">¡Sumate a nuestra comunidad como productor!</h2>
				<p className="pb-4">Completa nuestro formulario para acceder a funciones exclusivas y comparte tus mejores tips de cultivo y experiencias en tu huerta</p>
				<h3 className="font-bold ">Compartí</h3>
				<p className="pb-3">Publica tus propias experiencias, tips y consejos sobre el cultivo.</p>
				<h3 className="font-bold">Destaca tu huerta</h3>
				<p className="pb-5">Brinda información detallada sobre tus cultivos, métodos, técnicas de cuidado de plantas, recetas creativas con tus productos y mucho más.</p>
				<Button buttonColor={buttonColor} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={buttonFuncionality} />
			</div>
		</div>
	);
}

export default UserBanner;
