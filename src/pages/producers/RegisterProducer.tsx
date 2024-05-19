import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import RegisterProducerForm, { RegisterProducerFormValuesType } from "../../components/forms/RegisterProducerForm";
import Header from "../../components/header/Header";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { user } from "../../data/userData";
import { getStoredName } from "../../utils/getStoredName";
import { getStoredRole } from "../../utils/getStoredRole";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { getStoredToken } from "../../utils/getStoredToken";
import { checkOpenSession } from "../../interfaces/checkOpenSession";
import { UserDataType } from "../commonTypes";
import { updateUserData } from "../../utils/updateUserData";
import { resetUserData } from "../../utils/resetUserData";
import GenericModal from "../../components/modals/GenericModal";

type RegisterProducerStateType = "init" | "sending" | "sent" | "sendError"

function RegisterProducer() {
	const [registerProducerState, setRegisterProducerState] = useState<RegisterProducerStateType>("init");
	const { setUserRole } = useUserRoleContext();
	const navigate = useNavigate();
	const axiosController = useRef<AbortController>();

	function closeModals () {
		setRegisterProducerState("init");
	}

	function submitForm (formValues: RegisterProducerFormValuesType) {
		setRegisterProducerState("sent");
		console.log(formValues);
	}

	useLayoutEffect( () => {
		const userStoredName = getStoredName();
		const userStoredRole = getStoredRole();

		if (userStoredName) {
			user.name = userStoredName;
		}

		if (userStoredRole) {
			setUserRole(userStoredRole);
		}
	});


	useEffect(() => {
		axiosController.current = new AbortController();

		const storedToken = getStoredToken();

		if (storedToken) {
			checkOpenSession(storedToken, axiosController.current)
				.then((userData: UserDataType) => {
					updateUserData(userData, setUserRole);
				})
				.catch((error) => {
					if (error === "401") {
						resetUserData(setUserRole);
					}
				});
		}

		return () => {
			axiosController.current?.abort();
		};
	}, []);


	return (
		<>
			<div className="w-full" >
				<Header />
			</div>

			<main className="w-full p-[5vw] font-sans">
				<button type="button" onClick={() => navigate("/")}
					className="flex items-center py-[10px] px-[16px] mb-[64px] text-[16px] font-semibold border-2 border-brandingYellow"
				>
					<img alt="" src="/icons/Shape@2x.png" className="w-[17px] mr-8"/>
					Volver
				</button>

				<h1 className="font-bold mb-[24px] text-[32px]"
				>¡Te damos la bienvenida a nuestra comunidad de productores agrícolas!
				</h1>

				<h2 className="w-[65%] mb-20 text-[20px]">
					Completa este breve formulario para acceder a diversos beneficios como dar a conocer tu huerta, publicar artículos sobre tus sembrados, cosecha y mucho más.
				</h2>

				<RegisterProducerForm  handleSubmit={submitForm}/>
			</main>

			<Footer />

			{
				registerProducerState === "sent" && (
					<GenericModal
						mainText="Se envió con éxito la petición"
						secondaryText="El administrador en un plazo de 24 a 72 hs aprobará tu pedido para ser usuario productor."
						buttonText="Aceptar"
						handleClick={closeModals}
					/>
				)
			}

			
		</>
	);
}

export default RegisterProducer;
