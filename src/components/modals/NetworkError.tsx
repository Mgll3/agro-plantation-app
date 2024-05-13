// import { CircularProgress } from "@mui/material";

type NetworkErrorProps = {
	failedAction: string
}
{/*bg-screenDarkening*/}

function NetworkError( {failedAction}: NetworkErrorProps) {
	/*shadow-[0_6px_16px_#94B447] 
	<div className="p-[1rem_0]">
					<CircularProgress color="success" size="90px" />
				</div>
	*/
	return (
		<div className="absolute flex justify-center items-center w-screen top-0 left-0 h-screen bg-screenDarkening">
			<div className="flex items-center flex-col justify-between bg-brandingLightYellow w-[30vw] h-[58vh] text-center text-black font-sans rounded-xl p-[3rem_1rem]">

				<div className="">
					<img src="icons/modals/error-oops.png" className="w-[120px] drop-shadow-[2px_4px_2px_rgba(0,0,0,.2)]"/>
				</div>
			
				<h3 className="text-size2 font-medium drop-shadow-[2px_4px_2px_rgba(0,0,0,.2)]">Ha habido un problema al intentar {failedAction}</h3>

				<p className="text-size3 font-medium p-[2rem_0] drop-shadow-[2px_4px_2px_rgba(0,0,0,.2)]">Revisa tu conexión e inténtalo nuevamente</p>

				

			</div>
	
		</div>
	);
}

export default NetworkError;