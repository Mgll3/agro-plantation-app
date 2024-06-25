import { useEffect, useRef, useState } from "react";

export type LoadingStateType =
	| "loading"
	| "loaded"
	| "errorServer"
	| "errorCredentials"
	| "errorUserExists"
	| "modalLoading"
	| "modalPublicationStateApproved"
	| "modalPublicationStateRejected"
	| "modalPublicationStatePending";
export type UseLoadingStateReturnType = [
	LoadingStateType,
	(newState: LoadingStateType, waitingState?: LoadingStateType) => void
];

export default function useLoadingState(): UseLoadingStateReturnType {
	const [loadingState, setLoadingState] = useState<LoadingStateType>("loading");
	const changeStateTiemout = useRef<number>(0);

	function changeLoadingState(newState: LoadingStateType, waitingState?: LoadingStateType) {
		// "waitingState" es opcional, y nos permite definir cuál es el estado al que pasamos mientras se llega al nuevo estado indicado en el 1º parámetro. Si no ponemos nada será "loading"
		const fallbackState = waitingState ? waitingState : "loading";

		clearTimeout(changeStateTiemout.current);

		setLoadingState(fallbackState);

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
