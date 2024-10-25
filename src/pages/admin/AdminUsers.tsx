import { useEffect, useRef } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoadingSmall from "../../components/modals/LoadingSmall";
import NetworkError from "../../components/modals/NetworkError";
import useLoadingState from "../../hooks/useLoadingState";
import { getStoredToken } from "../../utils/getStoredToken";
import { getPendingProducerRequests } from "../../interfaces/users/getPendingProducerRequests";
import ProducerRequestsList from "../../components/admin/authProducers/ProducerRequestsList";
import { ProducerRequestsListType } from "../../components/admin/adminTypes";

function AdminUsers() {
	const [loadingState, changeLoadingState] = useLoadingState();
	const requestsList = useRef<ProducerRequestsListType>([]);
	const axiosController = useRef<AbortController>();

	function closeErrorModal() {
		changeLoadingState("loading");
	}

	function handleClickShowDetails() {
		changeLoadingState("requestDetails");
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

	return (
		<div className="flex flex-col min-h-[100vh]">
			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center flex-grow w-[100%] min-h-[40vh] mt-[4rem] mb-[5rem] px-[1.6rem]
				custom-1400:mt-[3.5rem] custom-1900:mt-[5rem] custom-2500:mt-[6rem] custom-3500:mt-[10rem]
				custom-1400:mb-[7.8rem]"
			>
				{loadingState === "loading" && (
					<div className="min-h-[40vh] mt-24 text-brandingLightGreen">
						<LoadingSmall />
					</div>
				)}

				{loadingState === "loaded" && (
					<ProducerRequestsList requestsList={requestsList.current} onClickShowDetails={handleClickShowDetails} />
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
