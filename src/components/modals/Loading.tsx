import { CircularProgress } from "@mui/material";

function Loading() {
	/*shadow-[0_6px_16px_#94B447]*/
	return (
		<div className="fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center gap-[64px] flex-col justify-between bg-brandingLightYellow w-[550px] h-[531px] text-center text-black font-sans rounded-xl p-[64px_32px]">

				<CircularProgress color="success" size={"167px"} className="" />

				<div className="flex flex-col gap-[24px] ">
					<h4 className="text-[35px] ">Esperando respuesta <br /> del servidor
					</h4>


					<h5 className="text-[24px]">Un momento por favor...</h5>
				</div>



			</div>

		</div>
	);
}

export default Loading;