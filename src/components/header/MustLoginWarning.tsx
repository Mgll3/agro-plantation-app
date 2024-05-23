import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";
import CloseIcon from "@mui/icons-material/Close";

type MustLoginWarningProps = {
	handleCloseMustLoginWarning: () => void;
};

function MustLoginWarning({ handleCloseMustLoginWarning }: MustLoginWarningProps) {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "px-[16px]";
	const buttonPaddingY = "py-[8px]";
	const navigate = useNavigate();
	/*shadow-[0_3px_12px_#94B447] */

	return (
		<div className="absolute top-0 flex justify-center items-center bg-screenDarkening w-screen h-screen">
			<div className="relative bg-[#fff] flex flex-col items-center gap-y-2 p-[40px_24px] text-center  rounded-2xl transition-all">
				<div className="absolute -top-3 -right-3 flex justify-center items-center border border-black text-xl bg-white rounded-full w-8 h-8 cursor-pointer" onClick={handleCloseMustLoginWarning}>
					<CloseIcon fontSize="inherit" />
				</div>
				<img src="images/logos/LogoVerde.png" alt="" className="w-[110px] " />
				<div className="flex flex-col gap-[16px] mb-[32px] mt-[16px]">
					<h2 className="text-4xl">¡Hola!</h2>
					<p className="">Los enlaces son exclusivos para usuarios registrados. <br />
						Registrate y accede al contenido especial!</p>
				</div>



				<div>
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}>
					</Button>

				</div>
				<p className="font-light text-sm">Si ya estás registrado, por favor <span className="text-[#1B7E25] font-bold" role="button" onClick={() => navigate("/register")}>inicia sesión</span></p>
			</div>

		</div>
	);
}

export default MustLoginWarning;
