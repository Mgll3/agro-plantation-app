type RegisterKoProps = {
	errorText: string;
};

function RegisterKo({ errorText }: RegisterKoProps) {
	return (
		<div
			className="absolute flex justify-center items-center w-screen bg-screenDarkening h-screen"
			id="registerKoMainContainer"
		>
			<div
				className="flex items-center flex-col bg-brandingLightYellow w-[30vw] h-[55vh] text-center"
				id="registerKoSecondaryContainer"
			>
				<h3 className="text-black font-sans text-xl" id="registerKoH3Tag">
					REGISTRO INCORRECTO
					<span className="block text-md">{errorText}</span>
				</h3>

				<img src="images/logos/LogoVerde.png" alt="logo" className=" w-[120px] h-[150px] mb-5" />
			</div>
		</div>
	);
}

export default RegisterKo;
