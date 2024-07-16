import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function UserBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[24px]";
	const buttonWidth = "w-[58.5%]";
	const buttonPaddingY = "py-3.5";
	const buttonFuncionality = {
		linkText: "Quiero ser productor",
		linkUrl: "/user/registerProducer"
	};

	return (
		<div className="relative flex justify-start items-center w-full pl-[66.35px] pt-[57.7px] pb-[75px] bg-[#F9F8F8] font-sans">
			<div className="w-[49.95%]">
				<img className="w-full" src="images/banners/UserBanner.png" alt="" />
			</div>

			<div className="relative top-[33px] self-end w-[40%] ml-[-30px]">
				<h2 className="text-[32px] leading-[47.8px]">¡Sumate a nuestra comunidad como productor!</h2>
				<p className="mt-[9.29px] text-[20px] font-light leading-[33.2px]">
					Completa nuestro formulario para acceder a funciones exclusivas y comparte tus mejores tips de cultivo y
					experiencias en tu huerta
				</p>
				<h3 className="mt-[30.52px] text-[18px] font-semibold">Compartí</h3>
				<p className="mt-[4.65px] text-[16px] leading-[165.4%]">
					Publica tus propias experiencias, tips y consejos sobre el cultivo.
				</p>
				<h3 className="mt-[19.91px] text-[18px] font-semibold">Destaca tu huerta</h3>
				<p className="mt-[4.65px] text-[16px] leading-[165.4%]">
					Brinda información detallada sobre tus cultivos, métodos, técnicas de cuidado de plantas, recetas creativas
					con tus productos y mucho más.
				</p>
				<Button
					buttonColor={buttonColor}
					buttonFontSize={buttonFontSize}
					buttonWidth={buttonWidth}
					buttonPaddingY={buttonPaddingY}
					buttonFuncionality={buttonFuncionality}
					otherStyles="mt-[30.52px] font-semibold"
				/>
			</div>
		</div>
	);
}

export default UserBanner;
