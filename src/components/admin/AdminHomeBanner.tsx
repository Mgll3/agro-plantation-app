import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function AdminHomeBanner() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize =
		"text-[1.2rem] custom-500:text-[1.6rem] custom-1000:text-[1.5rem] custom-1200:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3rem] custom-3500:text-[4rem]";
	const buttonWidth =
		"w-[19rem] custom-500:w-[25rem] custom-1000:w-[14rem] custom-1200:w-[16rem] custom-1400:w-[20.8rem] custom-2500:w-[29rem] custom-3500:w-[35rem]";
	const buttonPaddingY = "py-[0.6rem]";
	const otherStyles = "tracking-[0.125px] custom-1000:tracking-[0.08px]";
	const navigate = useNavigate();

	const button1Funcionality = {
		actionText: "Aprobar publicaciones",
		handleClick: () => navigate("/admin/publications/1", { state: "auth" })
	};
	const button2Funcionality = {
		linkText: "Ver publicaciones",
		linkUrl: "/admin/publications/1"
	};
	const button3Funcionality = {
		linkText: "Aprobar productores",
		linkUrl: "/admin/users"
	};

	return (
		<div
			className="overflow-hidden relative justify-between w-full h-[100%] p-0 bg-white border-[2px] border-grey500 border-solid rounded-3xl font-sans
				custom-1000:border-0"
		>
			<div
				className="w-full 
					custom-1000:w-[73.34%]"
			>
				<img
					className="w-full"
					src={
						window.innerWidth >= 600
							? "/images/banners/admin_banner_desktop.jpg"
							: "/images/banners/admin_banner_mobile.jpg"
					}
					alt=""
				/>
			</div>

			<div className="w-[41.6%]"></div>

			<div
				className="static top-[14%] right-0 flex flex-col w-full px-[2px] pt-[8px] pb-[12px] bg-brandingLightYellow
				custom-1000:absolute
				custom-1000:justify-center
				custom-1000:w-[60%] custom-1200:w-[50%] custom-1400:w-[49.2%]
				custom-1000:h-[75%] custom-1200:h-[74%] custom-1400:h-[73.5%]
				custom-500:px-[10px] custom-700:px-[25px] custom-1000:px-[20px] custom-1200:px-[30px] custom-1400:px-[44px] custom-3000:px-[65px]
				custom-500:pt-[15px] custom-1400:pt-[21px]
				custom-500:pb-[15px] custom-700:pb-[20px] custom-1400:pb-[29px]
				custom-1000:rounded-3xl"
			>
				<div
					className="w-full
					custom-1000:ml-[13px]"
				>
					<h2
						className="leading-tight tracking-[0.15px] text-[1.55rem] font-semibold
				custom-2500:leading-normal
				custom-1400:tracking-[0.25px]
				custom-390:text-[1.9rem] custom-420:text-[2rem] custom-500:text-[2.3rem] custom-600:text-[2.6rem] custom-700:text-[2.8rem] custom-900:text-[3.3rem] custom-1000:text-[2rem] custom-1200:text-[2.8rem] custom-1400:text-[3.5rem] custom-1900:text-[3.8rem] custom-2500:text-[2vw]
				custom-1000:text-grey700"
					>
						Bienvenido!!
						<br />
						Este es tu perfil&nbsp;
						<br
							className="hidden
						custom-1200:block"
						></br>
						de ADMINISTRADOR.
					</h2>
					<p
						className="my-[9.29px] text-[1.6rem] font-sans
					custom-500:mb-[22px] custom-1000:mb-[2px]
					custom-1000:mt-[25px]
					custom-600:text-[1.8rem] custom-1000:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[1vw]
					custom-1000:text-grey700"
					>
						En él podrás:
					</p>
					<ul
						className="list-disc ml-[2.5rem] font-sans text-[1.6rem]
					custom-600:text-[1.8rem] custom-1000:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[1vw]
					custom-1000:text-grey700"
					>
						<li>Ver todas las publicaciones en sus distintas categorías.</li>
						<li
							className="my-[2rem]
							custom-1000:my-[1.5rem] custom-1200:my-[2.4rem] custom-1900:my-[3rem]"
						>
							Aprobar nuevos productores de <span className="font-loginFont">PLANT-IN</span>.
						</li>
						<li>Aprobar nuevas publicaciones.</li>
					</ul>
					<p
						className="hidden my-[9.29px] text-[1.6rem] font-sans font-semibold
					custom-1200:block
					custom-500:mb-[22px]
					custom-1000:my-[15px] custom-1200:my-[30px] custom-1900:my-[40px] custom-3000:my-[60px]
					custom-600:text-[1.8rem] custom-1000:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[1vw]
					custom-1000:text-grey700"
					>
						Elige una opción:
					</p>
				</div>
				<div
					className="flex flex-col items-center gap-y-[0.929rem] gap-x-[1rem] mt-[1rem]
					custom-1000:flex-row
					custom-500:gap-y-[1.2rem]
					custom-1000:gap-x-[1.5rem] custom-1400:gap-x-[2.15rem] custom-3000:gap-x-[3rem]
					custom-500:mt-[2rem] custom-1000:mt-[3rem] custom-1200:mt-[0rem]"
				>
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={button1Funcionality}
						otherStyles={otherStyles}
					/>
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={button2Funcionality}
						otherStyles={otherStyles}
					/>
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={button3Funcionality}
						otherStyles={otherStyles}
					/>
				</div>
			</div>
		</div>
	);
}

export default AdminHomeBanner;
