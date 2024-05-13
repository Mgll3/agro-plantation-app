import CheckIcon from "@mui/icons-material/Check";

function RegisterOk() {

	return (
		<div className="absolute flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col justify-between bg-brandingLightYellow w-[30vw] h-[50vh] text-center rounded-xl p-[64px_32px] ">


				<div className="flex justify-center items-center bg-brandingDarkGreen text-brandingLightYellow w-[120px] h-[120px] rounded-full text-6xl drop-shadow-[2px_4px_2px_rgba(0,0,0,.35)]">
					<CheckIcon color="inherit" fontSize="inherit" />
				</div>

				<h3 className="text-black font-sans text-4xl drop-shadow-[2px_4px_2px_rgba(0,0,0,.35)]">Listo! <br /> <span className=" text-lg">Tu registro se completó correctamente</span></h3>

			</div>

		</div>
	);
}

export default RegisterOk;
