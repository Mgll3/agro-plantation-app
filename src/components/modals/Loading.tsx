import { CircularProgress } from "@mui/material";

function Loading() {
	return (
		<div
			className="z-[1000] fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen"
			id="LoadingModalMainContainer"
		>
			<div
				id="LoadingModalSecondaryContainer"
				className="flex items-center flex-col justify-between w-[95vw] aspect-[550/531] p-[64px_32px] bg-white text-center text-black font-sans font-normal rounded-2xl
				custom-600:w-[80vw] custom-700:w-[60vw] custom-1000:w-[50vw] custom-1200:w-[40vw] custom-1900:w-[30vw] custom-2500:w-[25vw] custom-3500:w-[15vw]"
			>
				<CircularProgress color="success" size={"150.82px"} />

				<h3
					className="mt-[64px] text-[2.8rem] leading-tight
					custom-900:text-[3.5rem]"
				>
					Esperando respuesta <br />
					del servidor
				</h3>

				<p
					id="LoadingModalParagraph"
					className="mt-[24px] text-[2rem]
					custom-900:text-[2.4rem]"
				>
					Un momento por favor
				</p>
			</div>
		</div>
	);
}

export default Loading;
