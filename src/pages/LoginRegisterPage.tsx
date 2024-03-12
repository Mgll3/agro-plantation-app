import { useNavigate } from "react-router-dom";
import { useUserRoleContext } from "../context/UserRoleContext";
import { useEffect, useRef, useState } from "react";
import { logInUser } from "../interfaces/logInUser";
import { UserDataType } from "./Home";
import { user } from "../data/userData";
import Login from "../components/forms/Login";
import { registerUser } from "../interfaces/registerUser";
import Register from "../components/forms/Register";
import { LoginFormValuesType, RegiserFormFieldsToSendType, RegisterFormValuesType } from "../components/forms/formsTypes";


export type LoginStateType = "init" | "loading" | "error" | "logged";
export type RegisterStateType = "init" | "loading" | "error" | "logged";

type LoginRegisterPageProps = {
	focus: "login" | "register"
}

function LoginRegisterPage({ focus }: LoginRegisterPageProps) {
	const { setUserRole } = useUserRoleContext();
	const [loginState, setLoginState] = useState<LoginStateType>("loading");
	const [registerState, setRegisterState] = useState<RegisterStateType>("init");

	const axiosController = useRef<AbortController>();
	const errorMessage = useRef("");
	const mainContainerElement = useRef(null);

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
				user.name = UserDataResponse.userName;
				setUserRole(UserDataResponse.userRole);
				setLoginState("logged");
			})
			.catch(() => {
				setLoginState("error");
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

	// Activa la animación de transición entre "Register" y "Login"
	function changeForm() {
		if ((mainContainerElement.current! as HTMLDivElement).classList.contains("-left-full")) {
			(mainContainerElement.current! as HTMLDivElement).classList.remove("-left-full");
			(mainContainerElement.current! as HTMLDivElement).classList.add("left-0");
		} else {
			(mainContainerElement.current! as HTMLDivElement).classList.add("-left-full");
			(mainContainerElement.current! as HTMLDivElement).classList.remove("left-0");
		}

	}


	useEffect(() => {

		if (loginState === "logged") {
			navigate("/");
		}


	}, [loginState]);

	useEffect(() => {
		let registerErrorTimeout: number;
		let registeredTimeout: number;

		if (registerState === "error") {
			registerErrorTimeout = window.setTimeout(() => {
				setRegisterState("init");
			}, 4000);
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
									<Register handleSubmit={submitRegisterForm} handleLoginClick={changeForm} registerState={registerState} errorText={errorMessage.current} />
								</div>
							</>
						)
						: (
							<>
								<div className="w-screen">
									<Register handleSubmit={submitRegisterForm} handleLoginClick={changeForm} registerState={registerState} errorText={errorMessage.current} />
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
