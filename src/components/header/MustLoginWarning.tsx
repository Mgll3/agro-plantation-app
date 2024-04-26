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
	const buttonWidth = "w-53";
	const buttonPaddingY = "py-2.5";
	const navigate = useNavigate();


	return (
		<div className="absolute top-0 flex justify-center items-center bg-screenDarkening w-screen h-screen">
			<div className="relative bg-brandingLightYellow p-3 flex flex-col items-center gap-y-2 max-w-[450px] 
			max-[650px]:max-w-[350px] text-center shadow-[0_3px_12px_#94B447] transition-all">
				<div className="absolute -top-3 -right-3 flex justify-center items-center border border-black text-xl bg-white rounded-full w-8 h-8 cursor-pointer" onClick={handleCloseMustLoginWarning}>
					<CloseIcon fontSize="inherit" />
				</div>

				<h2 className="text-2xl">TE PEDIMOS DISCULPAS!</h2>
				<p>Lamentablemente los links a donde quieres ingresar son links exclusivos de nuestros usuarios registrados.</p>
				<p>Si seguis interesado en conocernos, te invitamos a registrarte.</p>

				<img src="images/LogoVerde.png" alt="" className="w-[130px] m-[1rem_0]" />

				<div>
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}>
					</Button>

				</div>
				<p>Si ya estás registrado, por favor <span className="text-brandingLightGreen mt-2" role="button" onClick={() => navigate("/register")}>INICIA SESIÓN</span></p>
			</div>

		</div>
	);
}

export default MustLoginWarning;
