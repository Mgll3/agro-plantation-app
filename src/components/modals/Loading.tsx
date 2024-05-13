import { CircularProgress } from "@mui/material";

function Loading() {
	/*shadow-[0_6px_16px_#94B447]*/
	return (
		<div className="fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col justify-between bg-brandingLightYellow w-[30vw] h-[58vh] text-center text-black font-sans rounded-xl p-[4rem_2rem]">

				<CircularProgress color="success" size={"100px"} className="drop-shadow-[0_1px_4px_rgba(0,0,0,.50)]"/>

				<h3 className="text-size2 font-medium pt-2 drop-shadow-[2px_4px_2px_rgba(0,0,0,.2)]">Esperando respuesta <br/> del servidor
				</h3>


				<p className="text-sm font-medium drop-shadow-[2px_4px_2px_rgba(0,0,0,.2)]">Un momento por favor...</p>

				

			</div>
	
		</div>
	);
}

export default Loading;