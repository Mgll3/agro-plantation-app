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
		<div className="flex justify-center w-full p-10 bg-[#F9F8F8] font-sans">
			<div className="w-[45%]">
				<img className="w-full"
					src="../../../public/images/banners/UserBanner.png" alt="" 
				/>
			</div>

			<div className="w-[40%]">
				<h2>¡Sumate a nuestra comunidad como productor!</h2>
				<p>Completa nuestro formulario para acceder a funciones exclusivas y comparte tus mejores tips de cultivo y experiencias en tu huerta</p>
				<h3>Compartí</h3>
				<p>Publica tus propias experiencias, tips y consejos sobre el cultivo.</p>
				<h3>Destaca tu huerta</h3>
				<p>Brinda información detallada sobre tus cultivos, métodos, técnicas de cuidado de plantas, recetas creativas con tus productos y mucho más.</p>
				<Button buttonColor={buttonColor} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={buttonFuncionality} />
			</div>
		</div>
	);
}

export default UserBanner;
