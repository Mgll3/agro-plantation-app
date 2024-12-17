import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { logInUser } from "../../interfaces/users/logInUser";
import Login from "../../components/forms/Login";
import { registerUser } from "../../interfaces/users/registerUser";
import Register from "../../components/forms/Register";
import {
	LoginFormValuesType,
	RegisterFormFieldsToSendType,
	RegisterFormValuesType
} from "../../components/forms/formsTypes";
import { UserDataType } from "./commonTypes";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { updateUserData } from "../../utils/updateUserData";
import { resetUserData } from "../../utils/resetUserData";
import { Helmet } from "react-helmet";

export type LoginStateType = "init" | "loading" | "loginError" | "networkError" | "logged";
export type RegisterStateType =
	| "init"
	| "loading"
	| "registerErrorEmailExists"
	| "registerErrorServerError"
	| "networkError"
	| "logged";

type LoginRegisterPageProps = {
	focus: "login" | "register";
};

function LoginRegisterPage({ focus }: LoginRegisterPageProps) {
	const { userRole, setUserRole } = useUserRoleContext();
	const [loginState, setLoginState] = useState<LoginStateType>("init");
	const [registerState, setRegisterState] = useState<RegisterStateType>("init");
	// const [selectedPage, setSelectedPage] = useState<"login" | "register">(focus);

	const axiosController = useRef<AbortController>();
	const mainContainerElement = useRef(null);
	const loginContainerElement = useRef<HTMLDivElement>(null);
	const registerContainerElement = useRef<HTMLDivElement>(null);

	let changeFormTimeout: number;
	let changeFormTimeout2: number;
	let changeFormTimeout3: number;
	let changeFormTimeout4: number;
	let loggedTimeout: number;

	const url = useLocation();
	const navigate = useNavigate();

	function closeErrorMessage() {
		setRegisterState("init");
		setLoginState("init");
	}

	function submitLoginForm(formValues: LoginFormValuesType) {
		setLoginState("loading");

		const loginData: LoginFormValuesType = {
			email: formValues.email,
			password: formValues.password
		};

		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController.current!)
			.then((UserDataResponse: UserDataType) => {
				updateUserData(UserDataResponse, setUserRole);

				loggedTimeout = window.setTimeout(() => {
					setLoginState("logged");
				}, 800);
			})
			.catch((error: Error) => {
				resetUserData(setUserRole);
				if (error.message === "401") {
					setLoginState("loginError");
				} else {
					setLoginState("networkError");
				}
			});
	}

	const submitRegisterForm = (formValues: RegisterFormValuesType) => {
		setRegisterState("loading");

		const userFullAddress = `${formValues.userAddressCity}, ${formValues.userAddressProvince}`; // Unimos en Front los campos de dirección del usuario.

		const resgisterDataToSend: RegisterFormFieldsToSendType = {
			email: formValues.userEmail,
			password: formValues.userPassword,
			name: formValues.userName,
			lastname: formValues.userLastName,
			address: userFullAddress
		};

		const resgisterDataToSendJson = JSON.stringify(resgisterDataToSend);

		registerUser(resgisterDataToSendJson, axiosController.current!)
			.then(() => {
				setRegisterState("logged");
			})
			.catch((error: Error) => {
				if (error.message === "409") {
					setRegisterState("registerErrorEmailExists");
				} else if (error.message === "501") {
					setRegisterState("registerErrorServerError");
				} else {
					setRegisterState("networkError");
				}
			});
	};

	//Hace scroll hacia la parte superior de la pantalla. Utilizado por "changeForm()" antes de cambiar al otro formulario, para evitar problemas de maquetación si un formulario es más alto que otro.
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

	// Activa la animación de transición entre "Register" y "Login"
	function changeForm() {
		scrollToTop();

		//Este bloque cambia de el formulario actual al nuevo, mediante una animación de slide. El formulario al que cambiamos es invisible inicialmente.
		changeFormTimeout = window.setTimeout(() => {
			(mainContainerElement.current! as HTMLDivElement).classList.remove("duration-0");
			(mainContainerElement.current! as HTMLDivElement).classList.add("duration-1000");

			if ((mainContainerElement.current! as HTMLDivElement).classList.contains("-left-full")) {
				(mainContainerElement.current! as HTMLDivElement).classList.remove("-left-full");
				(mainContainerElement.current! as HTMLDivElement).classList.add("left-0");
			} else {
				(mainContainerElement.current! as HTMLDivElement).classList.add("-left-full");
				(mainContainerElement.current! as HTMLDivElement).classList.remove("left-0");
			}
		}, 300);

		changeFormTimeout2 = window.setTimeout(() => {
			// Este bloque if hace que, antes de hacer visible el nuevo formulario, este adopte su altura normal y aquél del que venimos adopte una altura de 100vh para no afectar a la altura del nuevo formulario (por defecto, cuando el focus está en un formulario, el otro es limitado a una altura de 100vh para que no afecte a la altura del que estamos viendo, produciendo un hueco en blanco por debajo del contenido. Con este if reestablecemos su altura normal antes de pasar a él).
			if (focus === "login") {
				(loginContainerElement.current! as HTMLDivElement).classList.remove("h-[100%]");
				(loginContainerElement.current! as HTMLDivElement).classList.add("h-[100vh]");

				(registerContainerElement.current! as HTMLDivElement).classList.remove("h-[100vh]");
				(registerContainerElement.current! as HTMLDivElement).classList.add("h-[100%]");
			} else {
				(registerContainerElement.current! as HTMLDivElement).classList.remove("h-[100%]");
				(registerContainerElement.current! as HTMLDivElement).classList.add("h-[100vh]");

				(loginContainerElement.current! as HTMLDivElement).classList.remove("h-[100vh]");
				(loginContainerElement.current! as HTMLDivElement).classList.add("h-[100%]");
			}

			//Este bloque hace visible el nuevo formulario cuando su altura ya es correcta
			changeFormTimeout4 = window.setTimeout(() => {
				if (focus === "login") {
					(registerContainerElement.current! as HTMLDivElement).classList.remove("duration-0");
					(registerContainerElement.current! as HTMLDivElement).classList.add("duration-1000");
					(registerContainerElement.current! as HTMLDivElement).classList.remove("opacity-0");
					(registerContainerElement.current! as HTMLDivElement).classList.add("opacity-100");
				} else {
					(loginContainerElement.current! as HTMLDivElement).classList.remove("duration-0");
					(loginContainerElement.current! as HTMLDivElement).classList.add("duration-1000");
					(loginContainerElement.current! as HTMLDivElement).classList.remove("opacity-0");
					(loginContainerElement.current! as HTMLDivElement).classList.add("opacity-100");
				}
			}, 20);
		}, 1301);

		//Este bloque nos remite a la nueva url sin que el usuario vea ningún cambio.
		changeFormTimeout3 = window.setTimeout(() => {
			if (url.pathname === "/login") {
				navigate("/register");
			} else {
				navigate("/login");
			}
		}, 2321);
	}

	useLayoutEffect(() => {
		(mainContainerElement.current! as HTMLDivElement).classList.remove("duration-1000");
		(mainContainerElement.current! as HTMLDivElement).classList.add("duration-0");
		(mainContainerElement.current! as HTMLDivElement).classList.remove("-left-full");
		(mainContainerElement.current! as HTMLDivElement).classList.add("left-0");
	});

	useEffect(() => {
		if (loginState === "logged") {
			userRole !== "ADMIN" ? navigate("/", { replace: true }) : navigate("/admin/publications", { replace: true });
		}

		return () => {
			// clearTimeout(changeFormTimeout);
			clearTimeout(loggedTimeout);
		};
	}, [loginState]);

	useEffect(() => {
		let registerErrorTimeout: number;
		let registeredTimeout: number;
		let registeredTimeout2: number;

		if (registerState === "registerErrorEmailExists" || registerState === "registerErrorServerError") {
			registerErrorTimeout = window.setTimeout(() => {
				setRegisterState("init");
			}, 3500);
		}

		if (registerState === "logged") {
			registeredTimeout = window.setTimeout(() => {
				changeForm();
			}, 2500);

			registeredTimeout2 = window.setTimeout(() => {
				setRegisterState("init");
			}, 3500);
		}

		return () => {
			clearTimeout(registerErrorTimeout);
			clearTimeout(registeredTimeout);
			clearTimeout(registeredTimeout2);
		};
	}, [registerState]);

	useEffect(() => {
		axiosController.current = new AbortController();

		return () => {
			if (axiosController.current) axiosController.current.abort();
			clearTimeout(changeFormTimeout);
			clearTimeout(changeFormTimeout2);
			clearTimeout(changeFormTimeout3);
			clearTimeout(changeFormTimeout4);
		};
	}, []);

	return (
		<>
			<main
				ref={mainContainerElement}
				id="mainContainer"
				className="flex absolute transition-all left-0 duration-1000 bg-[#EAE3C0]"
			>
				{focus === "login" ? (
					<>
						<Helmet>
							<title>Plant-In Login</title>
							<meta
								name="description"
								content="Accede a Plant-in para explorar huertas ecológicas, votar tus plantaciones favoritas y convertirte en productor. Regístrate o inicia sesión para unirte a nuestra comunidad verde."
							></meta>
							<meta name="robots" content="index, follow"></meta>
						</Helmet>

						<div className="w-screen" id="loginPositioner">
							<Login
								handleSubmit={submitLoginForm}
								handleRegisterClick={changeForm}
								loginState={loginState}
								closeErrorMessages={closeErrorMessage}
								focus={focus}
								loginContainerElement={loginContainerElement}
							/>
						</div>

						<div className="w-screen" id="registerPositioner">
							<Register
								handleSubmit={submitRegisterForm}
								handleLoginClick={changeForm}
								registerState={registerState}
								closeErrorMessages={closeErrorMessage}
								focus={focus}
								registerContainerElement={registerContainerElement}
							/>
						</div>
					</>
				) : (
					<>
						<Helmet>
							<title>Plant-In Registro</title>
						</Helmet>

						<div className="w-screen" id="registerPositioner">
							<Register
								handleSubmit={submitRegisterForm}
								handleLoginClick={changeForm}
								registerState={registerState}
								closeErrorMessages={closeErrorMessage}
								focus={focus}
								registerContainerElement={registerContainerElement}
							/>
						</div>

						<div className="w-screen" id="loginPositioner">
							<Login
								handleSubmit={submitLoginForm}
								handleRegisterClick={changeForm}
								loginState={loginState}
								closeErrorMessages={closeErrorMessage}
								focus={focus}
								loginContainerElement={loginContainerElement}
							/>
						</div>
					</>
				)}
			</main>
		</>
	);
}

export default LoginRegisterPage;
