import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import CreatePublicationForm from "../../components/forms/CreatePublicationForm";
import { NewPublicationDataServerFormattedType, NewPublicationType } from "../../components/forms/formsTypes";
import useLoadingState from "../../hooks/useLoadingState";
import Loading from "../../components/modals/Loading";
import GenericModal from "../../components/modals/GenericModal";
import NetworkError from "../../components/modals/NetworkError";
import { useEffect, useRef } from "react";
import { getStoredToken } from "../../utils/getStoredToken";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { createPublication } from "../../interfaces/createPublication";
import { uploadPublicationsImages } from "../../interfaces/uploadPublicationsImages";
import { getPublicationsDemoIds } from "../management/getPublicationsDemoIds";
import { storePublicationsDemoIds } from "../management/storePublicationsDemoIds";

function CreatePublication() {
	const [createPublicationState, setCreatePublicationState] = useLoadingState("init");
	const publicationsIdsToStore = useRef<number[]>([]);
	const { userRole } = useUserRoleContext();
	const navigate = useNavigate();

	const axiosController1 = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();

	function acceptCredentialsErrorModal() {
		navigate("/login", { replace: true });
	}

	//Used for errors creating publication
	function acceptErrorServerModal() {
		setCreatePublicationState("init", undefined, 1);
	}

	// Used for errors uploading publication images
	function acceptErrorServer2Modal() {
		setCreatePublicationState("init", undefined, 1);
	}

	function acceptFormSentModal() {
		navigate("/");
	}

	function handleSubmit(formValues: NewPublicationType) {
		setCreatePublicationState("sending", "sending", 1);

		axiosController1.current = new AbortController();
		const storedToken = getStoredToken();

		if ((userRole === "PRODUCER" || userRole === "PRODUCER_VIP") && storedToken) {
			const publicationDataToSend: NewPublicationDataServerFormattedType = {
				title: formValues.title,
				plantation: {
					area: formValues.area,
					harvestType: formValues.harvestType,
					irrigationType: formValues.irrigationType,
					productionType: formValues.productionType,
					details: formValues.details,
					address: formValues.address
				}
			};

			const publicationDataToSendJSON: Stringified<NewPublicationDataServerFormattedType> =
				JSON.stringify(publicationDataToSend);

			createPublication(storedToken, publicationDataToSendJSON, axiosController1.current)
				.then((response) => {
					//This section saves the id of the created publication in the cache, so that it can be deleted from Management.tsx
					const storedPublicationsIdStringify = getPublicationsDemoIds();
					if (storedPublicationsIdStringify) {
						publicationsIdsToStore.current = JSON.parse(storedPublicationsIdStringify);
					}
					publicationsIdsToStore.current.push(response.id);
					const publicationsIdsToStoreJSON = JSON.stringify(publicationsIdsToStore.current);
					storePublicationsDemoIds(publicationsIdsToStoreJSON);
					//Section End ***

					const formData = new FormData();
					const publicationId = String(response.id);

					if (formValues.images.length >= 1) {
						for (let i = 0; i < formValues.images.length; i++) {
							const secondaryImg = formValues.images[i];
							formData.append("images", secondaryImg);
						}
					}

					if (formValues.mainImg.length >= 1) {
						const mainImg = formValues.mainImg[0];

						formData.append("publicationId", publicationId);
						formData.append("mainImage", mainImg);

						axiosController2.current = new AbortController();

						uploadPublicationsImages(storedToken, formData, axiosController2.current)
							.then(() => {
								setCreatePublicationState("sent", "sending");
							})
							.catch((error) => {
								console.log(`Error al subir las imágenes de la publicación ${publicationId}: ${error}`);
								setCreatePublicationState("errorServer2", "sending");
							});
					} else {
						setCreatePublicationState("errorServer2", "sending");
					}
				})
				.catch(() => {
					setCreatePublicationState("errorServer", "sending");
				});
		} else {
			setCreatePublicationState("errorCredentials", "sending");
		}
	}

	useEffect(() => {
		return () => {
			axiosController1.current?.abort();
			axiosController2.current?.abort();
		};
	}, []);

	return (
		<>
			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col w-full pt-[2.4rem] pb-[3.2rem] font-sans
				custom-500:pt-[3rem] custom-700:pt-[4rem] custom-900:pt-[6rem] custom-1200:pt-[7rem] custom-1400:pt-[8.8rem] custom-2500:pt-[12rem] custom-3500:pt-[15rem]
				custom-500:pb-[5rem] custom-700:pb-[8rem] custom-900:pb-[10rem] custom-1400:pb-[13.6rem] custom-2500:pb-[15rem] custom-3500:pb-[20rem]"
			>
				<div
					className="w-full ml-[1.6rem]
					custom-600:ml-[3rem] custom-700:ml-[5rem] custom-1200:ml-[7rem] custom-1400:ml-[8.8rem] custom-1900:ml-[12rem] custom-2500:ml-[22rem] custom-3500:ml-[35rem]"
				>
					<button
						type="button"
						onClick={() => navigate("/producer/publications")}
						className="flex items-center py-[0.8rem] pr-[1.6rem] pl-[2.1rem] mb-[4.7rem] text-[1.2rem] font-semibold border-2 border-brandingYellow rounded-xl text-brandingYellow
							custom-1200:py-[1rem] custom-1400:py-[1.1rem] custom-1900:py-[1.3rem] custom-2500:py-[1.4rem]
							custom-1000:mb-[3.5rem] custom-1400:mb-[3.2rem] custom-1900:mb-[4rem]
							custom-1900:text-[1.7rem] custom-2500:text-[2.5rem]"
					>
						<img
							alt=""
							src="/icons/Shape@2x.png"
							className="w-[7px] h-[10px] mr-[1rem]
							custom-1900:w-[10px] custom-2500:w-[18px]
							custom-1900:h-[14px] custom-2500:h-[24px]
							custom-1400:mr-[1.4rem]"
						/>
						Volver a mis publicaciones
					</button>

					<h1
						className="font-bold text-[1.4rem]
						custom-500:text-[2rem] custom-700:text-[2.5rem] custom-1000:text-[3rem] custom-1400:text-[3.5rem] custom-1900:text-[4.2rem] custom-2500:text-[5rem]"
					>
						Crea tu publicación
					</h1>

					<p
						className="w-[91.5%] mt-[2.4rem] text-[1.2rem]
						custom-500:mt-[1.5rem] custom-1000:mt-[1rem] custom-1400:mt-[0.8rem] custom-1900:mt-[1rem]
						custom-500:text-[1.4rem] custom-1000:text-[1.4rem] custom-1900:text-[2rem] custom-2500:text-[3rem]"
					>
						Agregá todos los detalles de tu publicación para que los lectores sepan qué esperar
					</p>
				</div>

				<div
					className="flex w-full px-[0.6rem] mt-[3.2rem]
					custom-1000:mt-[4rem] custom-1400:mt-[5rem] custom-1900:mt-[6rem]
					custom-400:px-[1.6rem] custom-600:px-[3rem] custom-700:px-[5rem] custom-1200:px-[14rem] custom-1400:px-[18.8rem] custom-1900:px-[22rem] custom-2500:px-[35rem] custom-3500:px-[50rem]"
				>
					<CreatePublicationForm handleSubmit={handleSubmit} />
				</div>
			</main>

			<Footer />

			{createPublicationState === "sending" && <Loading />}
			{createPublicationState === "sent" && (
				<GenericModal
					buttonText="Aceptar"
					mainText="Se envió con éxito tu publicación"
					secondaryText='Ahora puedes hacerla pública desde el apartado "Mis Publicaciones".'
					handleClick={acceptFormSentModal}
				/>
			)}
			{createPublicationState === "errorCredentials" && (
				<GenericModal
					buttonText="Aceptar"
					mainText="Error de autenticación"
					secondaryText="Sólo los productores pueden crear publicaciones. Por favor, lógese correctamente para poder continuar"
					handleClick={acceptCredentialsErrorModal}
				/>
			)}
			{/* Used for errors creating publication */}
			{createPublicationState === "errorServer" && (
				<NetworkError
					buttonText="Aceptar"
					failedAction="registrar tu publicación. Por favor, inténtalo de nuevo."
					handleClose={acceptErrorServerModal}
				/>
			)}
			{/* Used for errors uploading publication images */}
			{createPublicationState === "errorServer2" && (
				<NetworkError
					buttonText="Aceptar"
					failedAction="adjuntar las imágenes de tu publicación."
					handleClose={acceptErrorServer2Modal}
				/>
			)}
		</>
	);
}

export default CreatePublication;
