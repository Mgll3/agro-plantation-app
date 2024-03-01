import { useEffect, useRef, useState } from "react";
import Register from "../components/forms/Register";
//import Header from "../components/header/Header";
import { useUserRoleContext } from "../context/UserRoleContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../interfaces/registerUser";
import { user } from "../data/userData";
import { UserDataType } from "./Home";
import { RegisterFormValuesType } from "../components/forms/formsTypes";

export type RegisterStateType = "init" | "loading" | "error" | "logged";

function RegisterPage() {
	//const bgImageTailwind = "bg-headerBg";
	//const logoSrc = "images/logo-plant-in.png";

	const { setUserRole } = useUserRoleContext();
	const [registerState, setRegisterState] = useState<RegisterStateType>("init");

	const navigate = useNavigate();

	const errorMessage = useRef("");
	const axiosController = useRef<AbortController>();


	const submitForm = (formValues: RegisterFormValuesType) => {
		const formData = new FormData();
		const formValuesArray = Object.keys(formValues);							// Dado que en este caso no tenemos un formulario HTML que asignar directamente a FormData habría que añadir uno a uno los campos al FormData con "append(key, value)". Para automatizarlo obtenemos un array con todas las keys del objeto "formValues" e iteramos con un .map()

		formValuesArray.map((value) => {
			if (value !== "userPasswordConfirm") {
				formData.append(value, formValues[value as keyof typeof formValues]);
			}
		});


		setRegisterState("loading");

		registerUser(formData, axiosController.current!)
			.then((UserDataResponse: UserDataType) => {
				user.name = UserDataResponse.userName;
				setUserRole(UserDataResponse.userRole);
				setRegisterState("logged");
			})
			.catch((err: Error) => {
				console.log(err);
				errorMessage.current = err.message;
				setRegisterState("error");
			});
	};


	useEffect(() => {
		let loggedTimeout: number;

		if (registerState === "error") {
			loggedTimeout = window.setTimeout(() => {
				setRegisterState("init");
			}, 3500);
		}

		if (registerState === "logged") {
			navigate("/");
		}

		return () => {
			clearTimeout(loggedTimeout);
		};
	}, [registerState]);

	useEffect(() => {
		axiosController.current = new AbortController();

		return () => {
			axiosController.current?.abort();
		};
	}, []);


	return (
		<div className="overflow-hidden">
			{/*<div className="w-full" >
				<Header bgImageTailwind={bgImageTailwind} logoSrc={logoSrc} />
	</div>*/}

			<main className="w-[100%] h-[100%] flex justify-center items-center">
				<Register handleSubmit={submitForm} registerState={registerState} errorText={errorMessage.current} />
			</main>
		</div>
	);
}

export default RegisterPage;
