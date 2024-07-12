import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import RegisterProducerForm from "../../components/forms/RegisterProducerForm";
import Header from "../../components/header/Header";
import GenericModal from "../../components/modals/GenericModal";
import useLoadingState from "../../hooks/useLoadingState";
import Loading from "../../components/modals/Loading";
import { useRef } from "react";
import { getStoredToken } from "../../utils/getStoredToken";
import { requestToBeProducer } from "../../interfaces/users/requestToBeProducer";
import NetworkError from "../../components/modals/NetworkError";
import { RegisterProducerFormValuesType } from "../../components/forms/formsTypes";

type ProducerRequestDataToSendType = {
	gardenName: string;
	gardenSize: string;
	gardenAddress: string;
	description: string;
};

function RegisterProducer() {
	const [registerProducerState, setRegisterProducerState] = useLoadingState("init");
	const navigate = useNavigate();
	const axiosController = useRef<AbortController>();

	function closeModalSuccess() {
		setRegisterProducerState("init");
		navigate("/");
	}

	function closeModalCredentialsError() {
		setRegisterProducerState("init");
		navigate("/login");
	}

	function closeModalServerError() {
		setRegisterProducerState("init");
	}

	function submitForm(formValues: RegisterProducerFormValuesType) {
		setRegisterProducerState("sending", undefined, 1);

		axiosController.current = new AbortController();
		const token = getStoredToken();

		const requestData: ProducerRequestDataToSendType = {
			gardenName: formValues.gardenName,
			gardenSize: formValues.gardenSize,
			gardenAddress: formValues.gardenAddress,
			description: formValues.description
		};

		const requestDataJson = JSON.stringify(requestData);

		if (token) {
			requestToBeProducer(requestDataJson, token, axiosController.current)
				.then(() => {
					setRegisterProducerState("sent", undefined, 1);
				})
				.catch(() => {
					setRegisterProducerState("errorServer", undefined, 1);
				});
		} else {
			setRegisterProducerState("errorCredentials");
		}
	}

	return (
		<>
			<div className="w-full">
				<Header />
			</div>

			<main className="w-full p-[5vw] font-sans">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex items-center py-[10px] px-[16px] mb-[64px] text-[16px] font-semibold border-2 border-brandingYellow rounded-md"
				>
					<img alt="" src="/icons/Shape@2x.png" className="w-[10px] h-[17px] mr-[20px]" />
					Volver
				</button>

				<h1 className="font-bold mb-[24px] text-[32px]">
					¡Te damos la bienvenida a nuestra comunidad de productores agrícolas!
				</h1>

				<p className="w-[65%] mb-20 text-[20px]">
					Completa este breve formulario para acceder a diversos beneficios como dar a conocer tu huerta, publicar
					artículos sobre tus sembrados, cosecha y mucho más.
				</p>

				<RegisterProducerForm handleSubmit={submitForm} />
			</main>

			<Footer />

			{registerProducerState === "sending" && <Loading />}

			{registerProducerState === "sent" && (
				<GenericModal
					mainText="Se envió con éxito la petición"
					secondaryText="El administrador en un plazo de 24 a 72 hs aprobará tu pedido para ser usuario productor."
					buttonText="Aceptar"
					handleClick={closeModalSuccess}
				/>
			)}

			{registerProducerState === "errorCredentials" && (
				<GenericModal
					mainText="No se pudo enviar tu petición"
					secondaryText="No se han detectado credenciales válidas. Debes estar logado para poder hacer esta petición."
					buttonText="Aceptar"
					handleClick={closeModalCredentialsError}
				/>
			)}

			{registerProducerState === "errorServer" && (
				<NetworkError buttonText="Aceptar" failedAction="registrar tu petición." handleClose={closeModalServerError} />
			)}
		</>
	);
}

export default RegisterProducer;
