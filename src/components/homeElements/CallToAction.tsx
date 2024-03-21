import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function CallToAction() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-40";
	const buttonPaddingY = "py-3.5";

	return (
		<div className="flex items-center w-full px-[10vw] bg-brandingLightGreen">
			<p className="font-niramit text-[32px] text-semiTansparentBlack">Lo pensaste? Dale registrate a 
				<span className="font-loginFont"> PLANT-IN </span>
				y comparti tu huerta, tus cosechas tus logros . Solo tenes que completar el formulario y sos parte de esta familia!!!!
			</p>
			
			<Button
				buttonColor={buttonColor}
				buttonFontSize={buttonFontSize}
				buttonWidth={buttonWidth}
				buttonPaddingY={buttonPaddingY}
				buttonFuncionality={{ linkText: "Registrate", linkUrl: "/register" }}>
			</Button>
		</div>
	);
}

export default CallToAction;
