import { CircularProgress } from "@mui/material";

type NetworkErrorProps = {
	failedAction: string
}
{/*bg-screenDarkening*/}

function NetworkError( {failedAction}: NetworkErrorProps) {
	
	return (
		<div className="absolute flex justify-center items-center w-screen  h-screen bg-screenDarkening">
			<div className="flex items-center flex-col justify-between bg-brandingLightYellow w-[30vw] h-[58vh] text-center text-black font-sans rounded-xl shadow-[0_6px_16px_#94B447] p-[.5rem_1rem]">

				<div className="">
					<img src="icons/modals/error-oops.png" className="w-[120px]"/>
				</div>
			
				<h3 className="text-size2 font-light">Ha habido un problema al intentar {failedAction}</h3>

				<p className="text-size3 font-light p-[2rem_0]">Revisa tu conexión e inténtalo nuevamente</p>

				<div className="p-[1rem_0]">
					<CircularProgress color="success" size="90px" />
				</div>

			</div>
	
		</div>
	);
}

export default NetworkError;