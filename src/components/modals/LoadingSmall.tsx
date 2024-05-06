import { CircularProgress } from "@mui/material";

function LoadingSmall() {
  return (
    <div className="flex justify-center items-center z-10  select-none text-colorYellowBg">
      <CircularProgress color="inherit" size="5vw" />
    </div>
  );
}

export default LoadingSmall;
