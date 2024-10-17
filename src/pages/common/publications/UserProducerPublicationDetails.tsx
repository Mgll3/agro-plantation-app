import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import LoadingSmall from "../../../components/modals/LoadingSmall";
import NetworkError from "../../../components/modals/NetworkError";
import useLoadingState from "../../../hooks/useLoadingState";
import { useEffect, useRef, useState } from "react";
import { getPublicationById } from "../../../interfaces/getPublicationById";
import { getStoredToken } from "../../../utils/getStoredToken";
import { MainImageType, PublicationInfoType } from "../../../components/admin/adminTypes";
import PublicationDetails from "../../../components/common/publications/PublicationDetails";
import { getAddressCoordinates } from "../../../interfaces/geolocation/getAddressCoordinates";
import Button from "../../../components/button/Button";
import Loading from "../../../components/modals/Loading";
import PublicationStateModified from "../../../components/modals/PublicationStateModified";
import PictureSlider, { SliderInfoType } from "../../../components/common/PictureSlider";
import { useUserRoleContext } from "../../../context/UserRoleContext";
import { alternatePublicationVote } from "../../../interfaces/alternatePublicationVote";

export type CoordinatesType = {
	lat: number;
	lon: number;
};

export type AddressCoordinatesType = CoordinatesType | null;

function UserProducerPublicationDetails() {
	const [loadingState, changeLoadingState] = useLoadingState();
	const [sliderVisibility, setSliderVisibility] = useState(false);
	const [publicationData, setPublicationData] = useState<PublicationInfoType | null>(null);

	const buttonFontSize =
		"text-[1.3rem] custom-700:text-[1.6rem] custom-900:text-[1.978rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem]";
	const buttonPaddingY = "py-[0.5rem] custom-900:py-[1rem] custom-1200:py-[2.017rem]";
	const buttonWidth = "w-[27%] custom-1400:w-[28.81%]";

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
	const prevPageFilter: string = location?.state?.filter ? location.state.filter : "";
	const prevPagePagination: string = location?.state?.pagination ? location.state.pagination : "";

	//Usamos parte de la URL para saber qué publicación tenemos que cargar
	const params = useParams();
	const id = Number(params.id);
	const publicationId = id ? id : null;

	const axiosController = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();
	const addressCoordinates = useRef<AddressCoordinatesType>(null);
	const redirectToPendingTimeout = useRef<number>(0);
	const loadingTimeout = useRef<number>(0);
	const navigate = useNavigate();
	const { userRole } = useUserRoleContext();

	const buttonBackToPreviousPageFunctionality = {
		actionText: "Volver",
		handleClick: redirectToPreviousPage
	};

	let subRoute = "";
	if (userRole === "ADMIN") {
		subRoute = "admin";
	} else if (userRole === "USER") {
		subRoute = "user";
	} else {
		subRoute = "producer";
	}

	//Usada para volver a la pantalla de publications con el filtro "auth" cuando no se ha cambiado el estado de la publicación
	function redirectToPreviousPage() {
		if (location.state?.pagination) {
			navigate(`/${subRoute}/publications/${prevPagePagination}`, { replace: true, state: prevPageFilter });
		} else {
			navigate("/", { replace: true });
		}
	}

	function closeErrorModal() {
		changeLoadingState("loading");
	}

	function navToLogin() {
		<Navigate to="/login" />;
	}

	function votePublication() {
		const storedToken = getStoredToken();
		changeLoadingState("loading2", "loading2");
		axiosController2.current = new AbortController();

		if (storedToken && publicationData?.id) {
			alternatePublicationVote(storedToken, publicationData.id, axiosController2.current)
				.then(() => {
					loadingTimeout.current = window.setTimeout(() => {
						changeLoadingState("loaded", "loaded");
					}, 1500);
				})
				.catch();
		} else if (publicationId === null) {
			loadingTimeout.current = window.setTimeout(() => {
				changeLoadingState("errorServer", "errorServer");
			}, 1500);
		} else if (!storedToken) {
			loadingTimeout.current = window.setTimeout(() => {
				changeLoadingState("errorCredentials", "errorCredentials");
			}, 1500);
		}
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
			clearTimeout(loadingTimeout.current);
			axiosController.current?.abort();
			axiosController2.current?.abort();
		};
	}, []);

	return (
		<div className="flex flex-col min-h-[100vh]">
			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center grow w-[97%] min-h-[40vh] my-[2.4rem] mx-auto
				custom-390:w-[92.52%] custom-700:w-[85%] custom-1000:w-[83%] custom-1400:w-[75%]
				custom-500:my-[3.5rem] custom-700:my-[4.5rem] custom-900:my-[6rem] custom-1000:my-[7rem] custom-1400:my-[8.8rem] custom-1900:my-[10rem] custom-3500:my-[15rem]"
			>
				{loadingState === "loading" && (
					<div className="min-h-[40vh] mt-24 text-brandingLightGreen">
						<LoadingSmall />
					</div>
				)}

				{(loadingState === "loaded" ||
					loadingState === "loading2" ||
					loadingState === "modalLoading" ||
					loadingState === "modalPublicationStateApproved" ||
					loadingState === "modalPublicationStateRejected" ||
					loadingState === "modalPublicationStatePending") &&
					publicationData && (
						<>
							<div
								className="mb-[4rem] flex justify-center w-[100%]
								custom-1900:mb-[7rem] custom-3500:mb-[12rem]"
							>
								<PublicationDetails
									publicationInfo={publicationData}
									addressCoordinates={addressCoordinates.current}
									handleImageOnClick={showSlider}
									handleVotePublication={votePublication}
								/>
							</div>

							<div className="flex justify-center gap-[5%] w-[100%]">
								<Button
									buttonColor="yellow"
									buttonFontSize={buttonFontSize}
									buttonPaddingY={buttonPaddingY}
									buttonWidth={buttonWidth}
									buttonFuncionality={buttonBackToPreviousPageFunctionality}
								/>
							</div>

							{loadingState === "modalLoading" && <Loading />}

							{loadingState === "loading2" && <Loading />}

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

			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default UserProducerPublicationDetails;
