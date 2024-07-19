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
						for (let i = 1; i < formValues.images.length; i++) {
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

			<main className="w-full p-[5vw] font-sans">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex items-center py-[10px] px-[16px] mb-[25px] text-[12px] font-semibold border-2 border-brandingYellow rounded-md text-brandingYellow"
				>
					<img alt="" src="/icons/Shape@2x.png" className="w-[5px] h-[8px] mr-[20px]" />
					Volver a Home
				</button>

				<h1 className="font-bold mb-[14px] text-[35px]">Crea tu publicación</h1>

				<p className="w-[65%] mb-20 text-[16px]">
					Agregá todos los detalles de tu publicación para que los lectores sepan qué esperar
				</p>

				<div className="flex flex-col px-[109px] py-[20px]">
					<CreatePublicationForm handleSubmit={handleSubmit} />
				</div>
			</main>

			<Footer />

			{createPublicationState === "sending" && <Loading />}
			{createPublicationState === "sent" && (
				<GenericModal
					buttonText="Aceptar"
					mainText="Se guardó con éxito tu publicación"
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
