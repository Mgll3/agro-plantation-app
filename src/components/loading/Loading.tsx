import { CircularProgress } from "@mui/material";

function Loading() {
	
	return (
		<div className="absolute flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col bg-brandingLightYellow w-[30vw] h-[55vh] text-center text-black font-sans">

				<h3 className="text-xl">ESPERANDO RESPUESTA
					<span className="block text-xl">DEL SERVIDOR</span>
				</h3>

				<div className="">
					<img src="icons/server-loading.png" />
				</div>

				<p className="text-sm">Un momento por favor...</p>

				<CircularProgress color="success" />

			</div>
	
		</div>
	);
}

export default Loading;