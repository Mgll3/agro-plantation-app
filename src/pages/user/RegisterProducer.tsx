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
import { Helmet } from "react-helmet";

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
		<div className="flex flex-col min-h-[100vh]">
			<Helmet>
				<title>Plant-In Registro de Productor</title>
			</Helmet>

			<div className="w-full">
				<Header />
			</div>

			<main
				className="w-full px-[1.6rem] py-[3.2rem] font-sans
					custom-600:px-[4rem] custom-900:px-[6rem] custom-1200:px-[7.5rem] custom-1400:px-[8.15rem] custom-1900:px-[10vw] custom-2500:px-[14vw]
					custom-900:py-[6rem] custom-1400:py-[8.8rem] custom-2500:py-[14rem] custom-3500:py-[18rem]"
			>
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex items-center py-[0.7rem] px-[1rem] mb-[3rem] text-[1.3rem] font-semibold border-2 border-brandingYellow rounded-md
						custom-1400:mb-[6.4rem]
						custom-640:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.5rem] custom-3500:text-[3rem]
						custom-1400:px-[1.6rem] custom-1900:px-[2rem]
						custom-1400:py-[1rem] custom-1900:py-[1.1rem]"
				>
					<img
						alt=""
						src="/icons/Shape@2x.png"
						className="w-[10px] h-[17px] mr-[20px]
						custom-1900:w-[17px]
						custom-1900:h-[24px]"
					/>
					Volver
				</button>

				<h1
					className="font-bold mb-[2.4rem] text-[1.6rem] tracking-[0rem]
					custom-600:text-[2rem] custom-1000:text-[2.5rem] custom-1400:text-[3.2rem] custom-1900:text-[3.8rem] custom-2500:text-[5rem] custom-3500:text-[6.5rem]
					custom-1400:tracking-[-1.5%]"
				>
					¡Te damos la bienvenida a nuestra comunidad de productores agrícolas!
				</h1>

				<p
					className="w-[100%] mb-[3.5rem] text-[1.2rem] tracking-[0.04rem]
					custom-1400:w-[80%]
					custom-1400:mb-[6.4rem] custom-2500:mb-[8.5rem] custom-3500:mb-[10rem]
					custom-600:text-[1.5rem] custom-1000:text-[1.8rem] custom-1400:text-[2rem] custom-1900:text-[2.5rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
					custom-1400:tracking-[0rem]"
				>
					Completa este breve formulario para acceder a diversos beneficios como dar a conocer tu huerta, publicar
					artículos sobre tus sembrados, cosecha y mucho más.
				</p>

				<RegisterProducerForm handleSubmit={submitForm} />
			</main>

			<div className="mt-auto">
				<Footer />
			</div>

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
		</div>
	);
}

export default RegisterProducer;
