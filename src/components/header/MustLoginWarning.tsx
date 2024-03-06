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


	return (
		<div className="absolute top-0 flex justify-center items-center bg-screenDarkening w-screen h-screen">
			<div className="relative bg-brandingLightYellow">
				<div title="Cerrar" className="absolute -top-3 -right-3 flex justify-center items-center border border-black text-xl bg-white rounded-full w-8 h-8 cursor-pointer" onClick={handleCloseMustLoginWarning}>
					<CloseIcon fontSize="inherit" />
				</div>

				<h2>TE PEDIMOS DISCULPAS</h2>
				<p>Lamentablemente los links a donde quieres ingresar son links exclusivos de nuestros usuarios registrados.</p>
				<p>Si seguis interesado en conocernos, te invitamos a registrarte.</p>

				<img src="images/logo-plant-in-2.png" alt="" />

				<div>
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}>
					</Button>

					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Logate", linkUrl: "/login" }}>
					</Button>
				</div>
			</div>

		</div>
	);
}

export default MustLoginWarning;
