import { CircularProgress } from "@mui/material";

function Loading() {
	return (
		<div className="z-[1000] fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col justify-between w-[550px] h-[531px] p-[64px_32px] bg-white text-center text-black font-sans font-normal rounded-2xl">
				<CircularProgress color="success" size={"150.82px"} />

				<h3 className="mt-[64px] text-[35px] leading-tight">
					Esperando respuesta <br />
					del servidor
				</h3>

				<p className="mt-[24px] text-[24px]">Un momento por favor</p>
			</div>
		</div>
	);
}

export default Loading;
