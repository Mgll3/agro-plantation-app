import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";
import styles from "./UserBanner.module.scss";

function UserBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = `${styles.button} font-normal custom-1000:font-semibold`;
	const buttonWidth = "max-w-[290px] min-w-[164px] w-[36vw] custom-2000:max-w-[480px]";
	const buttonPaddingY = "py-3.5";
	const buttonFuncionality = {
		linkText: "Quiero ser productor",
		linkUrl: "/user/registerProducer"
	};

	return (
		<div className="flex flex-col justify-center items-center custom-1000:flex-row w-full px-[0px] custom-1000:pl-[20px] custom-1000:pr-[66.35px] custom-1200:px-[66.35px] pt-[0px] custom-1000:pt-[57.7px] pb-[12px] custom-700:pb-[30px] custom-1000:pb-[75px] custom-1000:bg-[#F9F8F8] border-[2px] border-grey500 border-solid custom-1000:border-0 rounded-3xl custom-1000:rounded-none font-sans">
			<div className="overflow-hidden w-full custom-1000:w-[54.9%] rounded-3xl bg-gradient-to-b from-white to-[#F1F1F1] custom-1000:from-transparent custom-1000:to-transparent">
				<img
					className="relative top-[3vh] custom-1000:static custom-1000:top-0 w-[90%] m-auto custom-1000:w-full"
					src="images/banners/UserBanner.png"
					alt=""
				/>
			</div>

			<div className="flex flex-col items-start w-[100%] custom-1000:w-[465px] custom-2000:w-[950px] custom-1000:ml-[-30px] px-[4px] custom-700:px-[80px] custom-1000:px-[0px] pt-[8px] custom-700:pt-[50px] custom-1000:pt-[0px]">
				<h2
					className={`${styles.h2} leading-tight custom-1000:leading-[47.8px] custom-2000:leading-normal font-semibold custom-800:font-normal tracking-[-1px] custom-2000:tracking-normal`}
				>
					¡Súmate a nuestra comunidad como productor!
				</h2>
				<p
					className={`${styles.mainParagraph} mt-[9.29px] font-normal custom-800:font-light leading-tight custom-1000:leading-[33.2px] custom-2000:leading-normal tracking-[-0.5px]`}
				>
					Completa nuestro formulario para acceder a funciones exclusivas y comparte tus mejores tips de cultivo y
					experiencias en tu huerta
				</p>
				<h3 className={`${styles.h3} mt-[30.52px] font-semibold`}>Compartí</h3>
				<p className={`${styles.secondaryParagraph} mt-[4.65px] leading-tight custom-1000:leading-[165.4%]`}>
					Publica tus propias experiencias, tips y consejos sobre el cultivo.
				</p>
				<h3 className={`${styles.h3} mt-[19.91px] font-semibold`}>Destaca tu huerta</h3>
				<p className={`${styles.secondaryParagraph} mt-[4.65px] leading-tight custom-1000:leading-[165.4%]`}>
					Brinda información detallada sobre tus cultivos, métodos, técnicas de cuidado de plantas, recetas creativas
					con tus productos y mucho más.
				</p>
				<div className="self-center custom-1000:self-start">
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={buttonFuncionality}
						otherStyles="mt-[30.52px]"
					/>
				</div>
			</div>
		</div>
	);
}

export default UserBanner;
