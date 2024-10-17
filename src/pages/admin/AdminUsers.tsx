// import { useEffect, useRef } from "react";
// import Footer from "../../components/footer/Footer";
// import Header from "../../components/header/Header";
// import LoadingSmall from "../../components/modals/LoadingSmall";
// import NetworkError from "../../components/modals/NetworkError";
// import useLoadingState from "../../hooks/useLoadingState";
// import { getStoredToken } from "../../utils/getStoredToken";
// import { getPendingProducerRequests } from "../../interfaces/users/getPendingProducerRequests";

// function AdminUsers() {
// 	const [loadingState, changeLoadingState] = useLoadingState();
// 	const axiosController = useRef<AbortController>();

// 	function closeErrorModal() {
// 		changeLoadingState("loading");
// 	}

// 	useEffect(() => {
// 		axiosController.current = new AbortController();
// 		const storedToken = getStoredToken();

// 		if (loadingState === "loading" && storedToken) {
// 			getPendingProducerRequests(storedToken, axiosController.current)
// 				.then((response: AdminPublicationsFilteredType) => {
// 					const formattedPublications = formatByRandomPublications(response.publications);
// 					pagesLeft.current = response.pagination;
// 					setPublicationsFiltered(formattedPublications);
// 					changeLoadingState("loaded");
// 				})
// 				.catch(() => {
// 					changeLoadingState("errorServer");
// 				});
// 		}

// 		return () => {
// 			axiosController.current?.abort();
// 		};
// 	}, []);

// 	return (
// 		<div className="flex flex-col min-h-[100vh]">
// 			<div className="w-full">
// 				<Header />
// 			</div>

// 			<main className="">
// 				{loadingState === "loading" && (
// 					<div className="min-h-[40vh] mt-24 text-brandingLightGreen">
// 						<LoadingSmall />
// 					</div>
// 				)}

// 				{loadingState === "loaded" && <></>}

// 				{loadingState === "errorServer" && (
// 					<NetworkError failedAction="cargar las peticiones." buttonText="Entendido" handleClose={closeErrorModal} />
// 				)}
// 			</main>

// 			<div className="mt-auto">
// 				<Footer />
// 			</div>
// 		</div>
// 	);
// }

// export default AdminUsers;
