import { CircularProgress } from "@mui/material";

function Loading() {
	
	return (
		<div className="z-50 fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col justify-between bg-brandingLightYellow w-[30vw] h-[58vh] text-center text-black font-sans rounded-xl shadow-[0_6px_16px_#94B447] p-[2rem_2rem]">

				<h3 className="text-size2 font-light pt-2">ESPERANDO RESPUESTA <br/> DEL SERVIDOR
				</h3>

				<div className="w-[70px]">
					<img src="icons/modals/server-loading.png" />
				</div>

				<p className="text-sm">Un momento por favor...</p>

				<CircularProgress color="success" size={"80px"}/>

			</div>
	
		</div>
	);
}

export default Loading;