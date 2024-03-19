import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { logInUser } from "../interfaces/logInUser";
import { user } from "../data/userData";
import Login from "../components/forms/Login";
import { registerUser } from "../interfaces/registerUser";
import Register from "../components/forms/Register";
import { LoginFormValuesType, RegiserFormFieldsToSendType, RegisterFormValuesType } from "../components/forms/formsTypes";
import { UserDataType } from "./commonTypes";
import { useUserRoleContext } from "../context/UserRoleContext";
import { storeToken } from "../utils/storeToken";


export type LoginStateType = "init" | "loading" | "loginError" | "networkError" | "logged";
export type RegisterStateType = "init" | "loading" | "registerErrorEmailExists" | "registerErrorServerError" | "networkError" | "logged";

type LoginRegisterPageProps = {
	focus: "login" | "register"
}

function LoginRegisterPage({ focus }: LoginRegisterPageProps) {
	const { setUserRole } = useUserRoleContext();
	const [loginState, setLoginState] = useState<LoginStateType>("init");
	const [registerState, setRegisterState] = useState<RegisterStateType>("init");

	const axiosController = useRef<AbortController>();
	const mainContainerElement = useRef(null);

	let changeFormTimeout: number;
	let loggedTimeout: number;

	const url = useLocation();

	const navigate = useNavigate();

	function submitLoginForm(formValues: LoginFormValuesType) {
		setLoginState("loading");

		const loginData: LoginFormValuesType = {
			email: formValues.email,
			password: formValues.password
		};

		const loginDataJson = JSON.stringify(loginData);


		logInUser(loginDataJson, axiosController.current!)
			.then((UserDataResponse: UserDataType) => {
				storeToken(UserDataResponse.accessToken);

				user.name = `${UserDataResponse.name} ${UserDataResponse.lastname}`;
				setUserRole(UserDataResponse.userType);
				
				loggedTimeout = window.setTimeout( () => {
					setLoginState("logged");
				}, 800);
			})
			.catch((error: Error) => {
				if (error.message === "401"){
					setLoginState("loginError");
				} else {
					setLoginState("networkError");
				}
			});
	}

	const submitRegisterForm = (formValues: RegisterFormValuesType) => {
		setRegisterState("loading");
	
		const userFullAddress = `${formValues.userAddressCity}, ${formValues.userAddressProvince}`;			// Unimos en Front los campos de dirección del usuario.
	
		const resgisterDataToSend: RegiserFormFieldsToSendType = {
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
				if (error.message === "409"){
					setRegisterState("registerErrorEmailExists");
				} else if (error.message === "501") {
					setRegisterState("registerErrorServerError");
				} else {
					setRegisterState("networkError");
				}
			});
	};

	// Activa la animación de transición entre "Register" y "Login"
	function changeForm() {
		(mainContainerElement.current! as HTMLDivElement).classList.remove("duration-0");
		(mainContainerElement.current! as HTMLDivElement).classList.add("duration-1000");

		if ((mainContainerElement.current! as HTMLDivElement).classList.contains("-left-full")) {
			(mainContainerElement.current! as HTMLDivElement).classList.remove("-left-full");
			(mainContainerElement.current! as HTMLDivElement).classList.add("left-0");
		} else {
			(mainContainerElement.current! as HTMLDivElement).classList.add("-left-full");
			(mainContainerElement.current! as HTMLDivElement).classList.remove("left-0");
		}

		changeFormTimeout = window.setTimeout( () => {
			if (url.pathname === "/login") {
				navigate("/register");
			} else {
				navigate("/login");
			}
		}, 1001);
	}

	useLayoutEffect( () => {
		(mainContainerElement.current! as HTMLDivElement).classList.remove("duration-1000");
		(mainContainerElement.current! as HTMLDivElement).classList.add("duration-0");
		(mainContainerElement.current! as HTMLDivElement).classList.remove("-left-full");
		(mainContainerElement.current! as HTMLDivElement).classList.add("left-0");
	});


	useEffect(() => {
		let loginNetworkErrorTimeout: number;

		if (loginState === "logged") {
			navigate("/");
		}

		if (loginState === "networkError") {
			loginNetworkErrorTimeout = window.setTimeout( () => {
				setLoginState("init");
			}, 3500);
		}

		return () => {
			clearTimeout(loginNetworkErrorTimeout);
			// clearTimeout(changeFormTimeout);
			clearTimeout(loggedTimeout);
		};
	}, [loginState]);


	useEffect(() => {
		let registerErrorTimeout: number;
		let registeredTimeout: number;

		if (registerState === "networkError" || registerState === "registerErrorEmailExists" || registerState === "registerErrorServerError") {
			registerErrorTimeout = window.setTimeout(() => {
				setRegisterState("init");
			}, 3500);
		}

		if (registerState === "logged") {
			registeredTimeout = window.setTimeout( () => {
				setRegisterState("init");
				changeForm();
			}, 3000);
		}

		return () => {
			clearTimeout(registerErrorTimeout);
			clearTimeout(registeredTimeout);
		};
	}, [registerState]);


	useEffect(() => {
		axiosController.current = new AbortController();

		return () => {
			if (axiosController.current) axiosController.current.abort();
			clearTimeout(changeFormTimeout);
		};
	}, []);


	return (
		<>
			<main ref={mainContainerElement} className="flex absolute transition-all left-0 duration-1000">
				{
					focus === "login"
						? (
							<>
								<div className="w-screen">
									<Login handleSubmit={submitLoginForm} handleRegisterClick={changeForm} loginState={loginState} />
								</div>

								<div className="w-screen ">
									<Register handleSubmit={submitRegisterForm} handleLoginClick={changeForm} registerState={registerState} />
								</div>
							</>
						)
						: (
							<>
								<div className="w-screen">
									<Register handleSubmit={submitRegisterForm} handleLoginClick={changeForm} registerState={registerState} />
								</div>

								<div className="w-screen">
									<Login handleSubmit={submitLoginForm} handleRegisterClick={changeForm} loginState={loginState} />
								</div>
							</>
						)
				}
			</main>
		</>
	);
}

export default LoginRegisterPage;
