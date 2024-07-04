import { useEffect, useRef, useState } from "react";

export type LoadingStateType =
	| "init"
	| "loading"
	| "loaded"
	| "sending"
	| "sent"
	| "errorServer"
	| "errorCredentials"
	| "errorUserExists"
	| "modalLoading"
	| "modalPublicationStateApproved"
	| "modalPublicationStateRejected"
	| "modalPublicationStatePending";

export type UseLoadingStateReturnType = [
	LoadingStateType,
	(newState: LoadingStateType, waitingState?: LoadingStateType, timer?: number) => void
];

export default function useLoadingState(initialState?: LoadingStateType): UseLoadingStateReturnType {
	const [loadingState, setLoadingState] = useState<LoadingStateType>(initialState ? initialState : "loading");
	const changeStateTiemout = useRef<number>(0);

	function changeLoadingState(newState: LoadingStateType, waitingState?: LoadingStateType, timer?: number) {
		// "waitingState" es opcional, y nos permite definir cuál es el estado al que pasamos mientras se llega al nuevo estado indicado en el 1º parámetro. Si no ponemos nada será "loading"
		// "timer" es opcional, y nos permite elegir cuánto tiempo se mantiene el estado "fallbackState" antes de cambiar al estado definitivo. NO usar el valor "0", ya que lo entenderá como undefined. Usar 1 para 1 milisegundo en lugar de 0.Si queremos usarlo sin tener que usar "waitingState" le asignamos a este "undefined"
		const fallbackState = waitingState ? waitingState : "loading";

		clearTimeout(changeStateTiemout.current);

		setLoadingState(fallbackState);

		changeStateTiemout.current = window.setTimeout(
			() => {
				setLoadingState(newState);
			},
			timer ? timer : 1600
		);
	}

	useEffect(() => {
		return () => {
			clearTimeout(changeStateTiemout.current);
		};
	}, []);

	return [loadingState, changeLoadingState];
}
