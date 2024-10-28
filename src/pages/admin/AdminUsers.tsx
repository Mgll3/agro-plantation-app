import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoadingSmall from "../../components/modals/LoadingSmall";
import NetworkError from "../../components/modals/NetworkError";
import useLoadingState from "../../hooks/useLoadingState";
import { getStoredToken } from "../../utils/getStoredToken";
import { getPendingProducerRequests } from "../../interfaces/users/getPendingProducerRequests";
import ProducerRequestsList from "../../components/admin/authProducers/ProducerRequestsList";
import { ProducerRequestsListType, ProducerRequestsType } from "../../components/admin/adminTypes";
import ProducerRequestDetails from "../../components/admin/authProducers/ProducerRequestDetails";

export type windowWidthType = "xs" | "s" | "m" | "lg" | "xl";

function AdminUsers() {
	// El siguiente estado se utiliza para que ProducerRequestCard sepa qué cantidad de texto de la propiedad "request.descriptions" puede renderizar en pantalla sin que haya un salto de línea.
	const [windowWidth, setWindowWidth] = useState<windowWidthType>(returnWindowWidthValue());

	const [loadingState, changeLoadingState] = useLoadingState();
	const requestsList = useRef<ProducerRequestsListType>([]);
	const selectedRequest = useRef<ProducerRequestsType | null>(null);
	const axiosController = useRef<AbortController>();

	//Usada para comprobar el ancho de la ventana y, si es necesario, modificar el valor de windowWidth y provocar un nuevo renderizado.
	function returnWindowWidthValue() {
		switch (true) {
			case window.innerWidth < 380:
				return "xs";
				break;

			case window.innerWidth < 430:
				return "s";
				break;

			case window.innerWidth < 900:
				return "m";
				break;

			case window.innerWidth < 1900:
				return "lg";
				break;

			case window.innerWidth < 2500:
				return "xl";
				break;

			default:
				return "xl";
				break;
		}
	}

	function updateWindowWidth() {
		setWindowWidth(returnWindowWidthValue());
	}

	//Listener a la escucha de redimensionamientos de la pantalla.
	window.addEventListener("resize", updateWindowWidth);

	function closeErrorModal() {
		changeLoadingState("loading");
	}

	function handleClickShowDetails(requestData: ProducerRequestsType) {
		selectedRequest.current = requestData;
		changeLoadingState("requestDetails", undefined, 700);
	}

	function handleClickGoBack() {
		changeLoadingState("loaded", undefined, 1);
	}

	useEffect(() => {
		axiosController.current = new AbortController();
		const storedToken = getStoredToken();

		if (loadingState === "loading" && storedToken) {
			getPendingProducerRequests(storedToken, axiosController.current)
				.then((response: ProducerRequestsListType) => {
					requestsList.current = response;
					changeLoadingState("loaded");
				})
				.catch(() => {
					changeLoadingState("errorServer");
				});
		}

		return () => {
			axiosController.current?.abort();
		};
	}, []);

	useEffect(() => {
		return () => {
			window.removeEventListener("resize", updateWindowWidth);
		};
	});

	return (
		<div className="flex flex-col min-h-[100vh]">
			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center flex-grow w-[100%] min-h-[40vh] mt-[4rem] mb-[5rem] px-[1.6rem]
				custom-1400:mt-[3.5rem] custom-1900:mt-[5rem] custom-2500:mt-[6rem] custom-3500:mt-[10rem]
				custom-1400:mb-[7.8rem] custom-1900:mb-[12rem] custom-2500:mb-[15rem] custom-3500:mb-[20rem]
				custom-500:px-[2.5rem]
				custom-700:pl-[4rem] custom-1000:pl-[6rem] custom-1400:pl-[8.2rem]
				custom-700:pr-[7rem] custom-1000:pr-[10rem] custom-1400:pr-[13.7rem]"
			>
				{loadingState === "loading" && (
					<div className="min-h-[40vh] mt-24 text-brandingLightGreen">
						<LoadingSmall />
					</div>
				)}

				{loadingState === "loaded" && (
					<ProducerRequestsList
						requestsList={requestsList.current}
						onClickShowDetails={handleClickShowDetails}
						windowWidth={windowWidth}
					/>
				)}

				{loadingState === "requestDetails" && (
					<ProducerRequestDetails selectedRequest={selectedRequest.current} onClickGoBack={handleClickGoBack} />
				)}

				{loadingState === "errorServer" && (
					<NetworkError failedAction="cargar las peticiones." buttonText="Entendido" handleClose={closeErrorModal} />
				)}
			</main>

			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default AdminUsers;
