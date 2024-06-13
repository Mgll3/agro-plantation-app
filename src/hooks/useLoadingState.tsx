import { useEffect, useRef, useState } from "react";

export type LoadingStateType = "loading" | "loaded" | "errorServer" | "errorCredentials" | "errorUserExists";
export type UseLoadingStateReturnType = [LoadingStateType, (newState: LoadingStateType) => void];

export default function useLoadingState(): UseLoadingStateReturnType {
	const [loadingState, setLoadingState] = useState<LoadingStateType>("loading");
	const changeStateTiemout = useRef<number>(0);

	function changeLoadingState(newState: LoadingStateType) {
		clearTimeout(changeStateTiemout.current);
		setLoadingState("loading");
		changeStateTiemout.current = window.setTimeout(() => {
			setLoadingState(newState);
		}, 1600);
	}

	useEffect(() => {
		return () => {
			clearTimeout(changeStateTiemout.current);
		};
	}, []);

	return [loadingState, changeLoadingState];
}
