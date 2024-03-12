import { CircularProgress } from "@mui/material";

type NetworkErrorProps = {
	failedAction: string
}

function NetworkError( {failedAction}: NetworkErrorProps) {
	
	return (
		<div className="absolute flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col bg-brandingLightYellow w-[30vw] h-[55vh] text-center text-black font-sans">

				<div className="">
					<img src="icons/error-oops.png" />
				</div>
			
				<h3 className="text-xl">Ha habido un problema al intentar {failedAction}</h3>

				<p className="text-sm">Revisa tu conexión e intentalo nuevamente</p>

				<div>
					<CircularProgress color="success" size="90px" />
				</div>

			</div>
	
		</div>
	);
}

export default NetworkError;