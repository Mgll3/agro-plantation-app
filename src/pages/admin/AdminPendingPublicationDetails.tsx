import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoadingSmall from "../../components/modals/LoadingSmall";
import NetworkError from "../../components/modals/NetworkError";
import useLoadingState from "../../hooks/useLoadingState";
import { useEffect, useRef, useState } from "react";
import { getPublicationById } from "../../interfaces/getPublicationById";
import { getStoredToken } from "../../utils/getStoredToken";
import { PublicationInfoType } from "../../components/admin/adminTypes";
import PublicationDetails from "../../components/admin/publicationDetails/PublicationDetails";
import { getAddressCoordinates } from "../../interfaces/geolocation/getAddressCoordinates";
import Button from "../../components/button/Button";
import Loading from "../../components/modals/Loading";
import PublicationStateModified from "../../components/modals/PublicationStateModified";
import { approvePublication } from "../../interfaces/approvePublication";
import { rejectPublication } from "../../interfaces/rejectPublication";
import { changePublicationToPending } from "../../interfaces/changePublicationToPending";

export type CoordinatesType = {
	lat: number;
	lon: number;
};

export type AddressCoordinatesType = CoordinatesType | null;

function AdminPendingPublicationDetails() {
	const [loadingState, changeLoadingState] = useLoadingState();
	const [publicationData, setPublicationData] = useState<PublicationInfoType | null>(null);

	// Este state del <Link> que nos ha traído a esta página lo usamos para saber qué filtro de publicaciones se estaba usando cuando pulsamos en la publicación, para poder devolver al usuario a ese mismo filtro (random, usuario, fecha...)
	const location = useLocation();
	const prevPageFilter: string = location.state;
	console.log(prevPageFilter);

	//Usamos parte de la URL para saber qué publicación tenemos que cargar
	const params = useParams();
	const id = Number(params.id);
	const publicationId = id ? id : null;

	const axiosController = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();
	const addressCoordinates = useRef<AddressCoordinatesType>(null);
	const redirectToPendingTimeout = useRef<number>(0);
	const navigate = useNavigate();

	//Usada después de cambiar el estado de una publicación, para volver a la pantalla de publications con el filtro "auth"
	function redirectToPreviousPageWithModal() {
		changeLoadingState("modalPublicationApproved", "modalLoading");
		redirectToPendingTimeout.current = window.setTimeout(() => {
			navigate("/admin/publications", { replace: true, state: prevPageFilter });
		}, 4000);
	}

	//Usada para volver a la pantalla de publications con el filtro "auth" cuando no se ha cambiado el estado de la publicación
	function redirectToPreviousPage() {
		navigate("/admin/publications", { replace: true, state: prevPageFilter });
	}

	function approveRejectPublication(action: "approve" | "reject") {
		changeLoadingState("modalLoading", "modalLoading");

		axiosController2.current = new AbortController();
		const storedToken = getStoredToken();

		if (storedToken && publicationData) {
			if (action === "approve") {
				approvePublication(storedToken, publicationData?.id, axiosController2.current)
					.then(() => {
						redirectToPreviousPageWithModal();
					})
					.catch(() => {
						changeLoadingState("errorServer", "modalLoading");
					});
			} else {
				rejectPublication(storedToken, publicationData?.id, axiosController2.current)
					.then(() => {
						redirectToPreviousPageWithModal();
					})
					.catch(() => {
						changeLoadingState("errorServer", "modalLoading");
					});
			}
		} else {
			changeLoadingState("errorCredentials");
		}
	}

	function setPublicationToPending() {
		changeLoadingState("modalLoading", "modalLoading");

		axiosController2.current = new AbortController();
		const storedToken = getStoredToken();

		if (storedToken && publicationData) {
			changePublicationToPending(storedToken, publicationData?.id, axiosController2.current)
				.then(() => {
					redirectToPreviousPageWithModal();
				})
				.catch(() => {
					changeLoadingState("errorServer", "modalLoading");
				});
		} else {
			changeLoadingState("errorCredentials");
		}
	}

	const buttonApproveFunctionality = {
		actionText: "Aprobar Publicación",
		handleClick: () => approveRejectPublication("approve")
	};

	const buttonRejectFunctionality = {
		actionText: "Rechazar Publicación",
		handleClick: () => approveRejectPublication("reject")
	};

	const buttonChangeToPendingFunctionality = {
		actionText: "Cambiar a Pendiente",
		handleClick: setPublicationToPending
	};

	const buttonBackToPendingFunctionality = {
		actionText: "Volver",
		handleClick: redirectToPreviousPage
	};

	function closeErrorModal() {
		changeLoadingState("loading");
	}

	function navToLogin() {
		<Navigate to="/login" />;
	}

	useEffect(() => {
		const storedToken = getStoredToken();

		if (loadingState === "loading" && publicationId && storedToken) {
			axiosController.current = new AbortController();

			getPublicationById(storedToken, axiosController.current, publicationId)
				.then((response: PublicationInfoType) => {
					getAddressCoordinates(axiosController.current!, response.author.address)
						.then((coordinates) => {
							addressCoordinates.current = coordinates as CoordinatesType;
							setPublicationData(response);
							changeLoadingState("loaded");
						})
						.catch(() => {
							addressCoordinates.current = null;
							setPublicationData(response);
							changeLoadingState("loaded");
						});
				})
				.catch((error) => {
					if (error === "401") {
						changeLoadingState("errorCredentials");
					} else {
						changeLoadingState("errorServer");
					}
				});
		} else if (publicationId === null) {
			changeLoadingState("errorServer");
		} else if (!storedToken) {
			changeLoadingState("errorCredentials");
		}
	}, []);

	return (
		<>
			<div className="w-full">
				<Header />
			</div>

			<main className="flex flex-col items-center w-[80%] min-h-[40vh] mt-[10vh] mx-auto">
				{loadingState === "loading" && (
					<div className="mt-24 text-brandingLightGreen">
						<LoadingSmall />
					</div>
				)}

				{(loadingState === "loaded" ||
					loadingState === "modalLoading" ||
					loadingState === "modalPublicationApproved") &&
					publicationData && (
						<>
							<div className="mb-[5rem] flex justify-center w-[100%]">
								<PublicationDetails publicationInfo={publicationData} addressCoordinates={addressCoordinates.current} />
							</div>

							<div className="flex justify-center gap-[5%] w-[100%] mb-[5rem]">
								{publicationData.authorizationStatus.state === "PENDING" && (
									<>
										<Button
											buttonColor="yellow"
											buttonFontSize="text-[20px]"
											buttonPaddingY="py-[0.5rem] px-[5rem]"
											buttonWidth="w-[30%]"
											buttonFuncionality={buttonApproveFunctionality}
										/>

										<Button
											buttonColor="red"
											buttonFontSize="text-[20px]"
											buttonPaddingY="py-[0.5rem] px-[5rem]"
											buttonWidth="w-[30%]"
											buttonFuncionality={buttonRejectFunctionality}
										/>
									</>
								)}

								{publicationData.authorizationStatus.state !== "PENDING" && (
									<Button
										buttonColor="yellow"
										buttonFontSize="text-[20px]"
										buttonPaddingY="py-[0.5rem] px-[5rem]"
										buttonWidth="w-[30%]"
										buttonFuncionality={buttonChangeToPendingFunctionality}
									/>
								)}

								<Button
									buttonColor="yellow"
									buttonFontSize="text-[20px]"
									buttonPaddingY="py-[0.5rem] px-[6.5rem]"
									buttonWidth="w-[30%]"
									buttonFuncionality={buttonBackToPendingFunctionality}
								/>
							</div>

							{loadingState === "modalLoading" && <Loading />}

							{loadingState === "modalPublicationApproved" && (
								<div className="mt-24 text-brandingLightGreen">
									<PublicationStateModified newState="approved" />
								</div>
							)}
						</>
					)}

				{loadingState === "errorServer" && (
					<NetworkError failedAction="cargar la publicación." buttonText="Reintentar" handleClose={closeErrorModal} />
				)}

				{loadingState === "errorCredentials" && (
					<NetworkError
						failedAction="validar credenciales del usuario."
						buttonText="Reintentar"
						handleClose={navToLogin}
					/>
				)}
			</main>

			<div className="mt-8">
				<Footer />
			</div>
		</>
	);
}

export default AdminPendingPublicationDetails;
