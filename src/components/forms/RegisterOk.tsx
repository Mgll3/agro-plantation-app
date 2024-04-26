import CheckIcon from "@mui/icons-material/Check";

function RegisterOk() {
	
	return (
		<div className="absolute flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col bg-brandingLightYellow w-[30vw] h-[55vh] text-center">

				<h3 className="text-black font-sans text-xl">REGISTRO REALIZADO 
					<span className="block text-3xl">CORRECTAMENTE</span>
				</h3>

				<img src="images/LogoVerde.png" alt="logo" className=" w-[120px] h-[150px] mb-5" />
				
				<div className="flex justify-center items-center bg-brandingDarkGreen text-brandingLightYellow w-[80px] h-[80px] rounded-full text-5xl">
					<CheckIcon color="inherit" fontSize="inherit"/>
				</div>

			</div>
	
		</div>
	);
}

export default RegisterOk;
