import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type MustLoginWarningProps = {
	handleCloseMustLoginWarning: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function MustLoginWarning({ handleCloseMustLoginWarning }: MustLoginWarningProps) {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[24px]";
	const buttonWidth = "w-[192px]";
	const buttonPaddingY = "py-[6.5px]";
	const otherStyles = "mt-[60px]";
	const navigate = useNavigate();

	return (
		<div
			id="mustLoginModalMainContainer"
			className="z-[950] fixed top-0 flex justify-center items-center bg-screenDarkening w-screen h-screen"
			onClick={handleCloseMustLoginWarning}
		>
			<div
				id="mustLoginModalSecondaryContainer"
				className="flex flex-col items-center w-[709px] p-[60px_32px] rounded-2xl bg-white text-center transition-all"
			>
				<img src="images/logos/LogoVerde.png" alt="" className="w-[133px]" />
				<h2 className="my-[30px] text-[49px]">¡Hola!</h2>
				<p id="mustLoginModalParagraph1" className="text-[24px]">
					Los enlaces son exclusivos para usuarios registrados.
				</p>
				<p id="mustLoginModalParagraph2" className="mt-[3px] text-[24px]">
					¡Regístrate y accede al contenido especial!
				</p>

				<div id="mustLoginModalButtonContainer">
					<Button
						id="mustLoginModalRegisterLink"
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}
						otherStyles={otherStyles}
					></Button>
				</div>
				<p id="mustLoginModalParagraph3" className="mt-[16px] text-[19.78px] font-light">
					Si ya estás registrado, por favor{" "}
					<span className="text-brandingDarkGreen font-semibold" role="button" onClick={() => navigate("/login")}>
						inicia sesión
					</span>
				</p>
			</div>
		</div>
	);
}

export default MustLoginWarning;
