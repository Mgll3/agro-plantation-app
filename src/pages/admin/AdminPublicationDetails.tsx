import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LoadingSmall from "../../components/modals/LoadingSmall";
import NetworkError from "../../components/modals/NetworkError";
import useLoadingState from "../../hooks/useLoadingState";
import { useEffect, useRef, useState } from "react";
import { getPublicationById } from "../../interfaces/getPublicationById";
import { getStoredToken } from "../../utils/getStoredToken";
import { MainImageType, PublicationInfoType } from "../../components/admin/adminTypes";
import PublicationDetails from "../../components/admin/publicationDetails/PublicationDetails";
import { getAddressCoordinates } from "../../interfaces/geolocation/getAddressCoordinates";
import Button from "../../components/button/Button";
import Loading from "../../components/modals/Loading";
import PublicationStateModified from "../../components/modals/PublicationStateModified";
import { approvePublication } from "../../interfaces/approvePublication";
import { rejectPublication } from "../../interfaces/rejectPublication";
import { changePublicationToPending } from "../../interfaces/changePublicationToPending";
import PictureSlider, { SliderInfoType } from "../../components/common/PictureSlider";

export type CoordinatesType = {
	lat: number;
	lon: number;
};

export type AddressCoordinatesType = CoordinatesType | null;

function AdminPublicationDetails() {
	const [loadingState, changeLoadingState] = useLoadingState();
	const [sliderVisibility, setSliderVisibility] = useState(false);
	const [publicationData, setPublicationData] = useState<PublicationInfoType | null>(null);

	const buttonFontSize = "text-[1.978rem]";
	const buttonPaddingY = "py-[2.017rem]";
	const buttonWidth = "w-[28.81%]";

	//A "PictureSlider" le pasamos un objeto con todas las imágenes (no necesita diferenciar entre la principal y el resto) y el id de la imagen pulsada (la que debe mostrarse en primer lugar)

	const sliderInfo = useRef<SliderInfoType>({
		pictures: [],
		selectedImg: "0"
	});

	//Esta función hace aparecer el componente PictureSlider. También actualiza la imagen seleccionada que deberá mostrar el slider en primer lugar. Se pasa por props hasta el componente PublicationImagesViewer
	function showSlider(pictureId: string) {
		let mainImg: MainImageType | null;
		let secondaryImages: MainImageType[] | null = null;

		if (publicationData?.mainImage) {
			mainImg = structuredClone(publicationData.mainImage);
		} else {
			mainImg = null;
		}

		if (publicationData?.images) {
			secondaryImages = structuredClone(publicationData?.images);
		}

		let allPictures: MainImageType[] = [];

		if (mainImg && secondaryImages) {
			allPictures = secondaryImages;
			allPictures.push(mainImg);
		} else if (mainImg && !secondaryImages) {
			allPictures.push(mainImg);
		} else if (!mainImg && secondaryImages) {
			allPictures = secondaryImages;
		} else if (!mainImg && !secondaryImages) {
			allPictures = [];
		}

		sliderInfo.current.selectedImg = pictureId;
		sliderInfo.current.pictures = allPictures;

		setSliderVisibility(true);
	}

	//Esta función hace desaparecer el componente PictureSlider. Se pasa por props y se utiliza desde dicho componente.
	function hideSlider() {
		setSliderVisibility(false);
	}

	// Este state del <Link> que nos ha traído a esta página lo usamos para saber qué filtro de publicaciones y qué página dentro de ese filtro se estaban usando cuando pulsamos en la publicación, para poder devolver al usuario a ese mismo filtro (random, usuario, fecha...) y página.
	const location = useLocation();
	const prevPageFilter: string = location.state.filter;
	const prevPagePagination: string = location.state.pagination;

	//Usamos parte de la URL para saber qué publicación tenemos que cargar
	const params = useParams();
	const id = Number(params.id);
	const publicationId = id ? id : null;

	const axiosController = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();
	const addressCoordinates = useRef<AddressCoordinatesType>(null);
	const redirectToPendingTimeout = useRef<number>(0);
	const navigate = useNavigate();

	//Usada después de cambiar el estado de una publicación, para volver a la pantalla de publications con el filtro desde el que venimos
	function redirectToPreviousPageWithModal(modalState: "approved" | "rejected" | "pending") {
		switch (modalState) {
			case "approved":
				changeLoadingState("modalPublicationStateApproved", "modalLoading");
				break;

			case "rejected":
				changeLoadingState("modalPublicationStateRejected", "modalLoading");
				break;

			case "pending":
				changeLoadingState("modalPublicationStatePending", "modalLoading");
				break;

			default:
				break;
		}

		redirectToPendingTimeout.current = window.setTimeout(() => {
			navigate(`/admin/publications/${prevPagePagination}`, { replace: true, state: prevPageFilter });
		}, 4000);
	}

	//Usada para volver a la pantalla de publications con el filtro "auth" cuando no se ha cambiado el estado de la publicación
	function redirectToPreviousPage() {
		navigate(`/admin/publications/${prevPagePagination}`, { replace: true, state: prevPageFilter });
	}

	function approveRejectPublication(action: "approve" | "reject") {
		changeLoadingState("modalLoading", "modalLoading");

		axiosController2.current = new AbortController();
		const storedToken = getStoredToken();

		if (storedToken && publicationData) {
			if (action === "approve") {
				approvePublication(storedToken, publicationData?.id, axiosController2.current)
					.then(() => {
						redirectToPreviousPageWithModal("approved");
					})
					.catch(() => {
						changeLoadingState("errorServer", "modalLoading");
					});
			} else {
				rejectPublication(storedToken, publicationData?.id, axiosController2.current)
					.then(() => {
						redirectToPreviousPageWithModal("rejected");
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
					redirectToPreviousPageWithModal("pending");
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

	const buttonBackToPreviousPageFunctionality = {
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

		return () => {
			clearTimeout(redirectToPendingTimeout.current);
			axiosController.current?.abort();
			axiosController2.current?.abort();
		};
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
					loadingState === "modalPublicationStateApproved" ||
					loadingState === "modalPublicationStateRejected" ||
					loadingState === "modalPublicationStatePending") &&
					publicationData && (
						<>
							<div className="mb-[5rem] flex justify-center w-[100%]">
								<PublicationDetails
									publicationInfo={publicationData}
									addressCoordinates={addressCoordinates.current}
									handleImageOnClick={showSlider}
								/>
							</div>

							<div className="flex justify-center gap-[5%] w-[100%] mb-[5rem]">
								<Button
									buttonColor="yellow"
									buttonFontSize={buttonFontSize}
									buttonPaddingY={buttonPaddingY}
									buttonWidth={buttonWidth}
									buttonFuncionality={buttonBackToPreviousPageFunctionality}
								/>

								{publicationData.authorizationStatus.state === "PENDING" && (
									<>
										<Button
											buttonColor="red"
											buttonFontSize={buttonFontSize}
											buttonPaddingY={buttonPaddingY}
											buttonWidth={buttonWidth}
											buttonFuncionality={buttonRejectFunctionality}
										/>

										<Button
											buttonColor="yellow"
											buttonFontSize={buttonFontSize}
											buttonPaddingY={buttonPaddingY}
											buttonWidth={buttonWidth}
											buttonFuncionality={buttonApproveFunctionality}
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
							</div>

							{loadingState === "modalLoading" && <Loading />}

							{loadingState === "modalPublicationStateApproved" && <PublicationStateModified newState="approved" />}

							{loadingState === "modalPublicationStateRejected" && <PublicationStateModified newState="rejected" />}

							{loadingState === "modalPublicationStatePending" && <PublicationStateModified newState="pending" />}

							{sliderVisibility === true && (
								<PictureSlider sliderInfo={sliderInfo.current} handleImageOnClick={hideSlider} />
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

export default AdminPublicationDetails;
