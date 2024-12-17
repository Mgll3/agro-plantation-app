import { CircularProgress } from "@mui/material";

function LoadingSmall() {
	return (
		<div
			className="flex justify-center items-center z-10 w-full select-none text-brandingDarkGreen"
			id="LoadingSmallModalMainContainer"
		>
			<CircularProgress color="inherit" size="5vw" />
		</div>
	);
}

export default LoadingSmall;
