import { useNavigate } from "react-router-dom";
import { useUserRoleContext } from "../context/UserRoleContext";
import { useEffect, useRef, useState } from "react";
import { logInUser } from "../interfaces/logInUser";
import { UserDataType } from "./Home";
import { user } from "../data/userData";
import Login from "../components/forms/Login";
import { registerUser } from "../interfaces/registerUser";
import Register from "../components/forms/Register";
import { RegisterFormValuesType } from "../components/forms/formsTypes";


export type LoginStateType = "init" | "loading" | "error" | "logged";
export type RegisterStateType = "init" | "loading" | "error" | "logged";

type LoginRegisterPageProps = {
	focus: "login" | "register"
}

function LoginRegisterPage({ focus }: LoginRegisterPageProps) {
	const { setUserRole } = useUserRoleContext();
	const [loginState, setLoginState] = useState<LoginStateType>("init");
	const [registerState, setRegisterState] = useState<RegisterStateType>("init");

	const axiosController = useRef<AbortController>();
	const errorMessage = useRef("");
	const mainContainerElement = useRef(null);

	const navigate = useNavigate();


	function sendForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoginState("loading");

		const loginForm = document.getElementById("login") as HTMLFormElement;
		const formData = new FormData((loginForm));

		logInUser(formData, axiosController.current!)
			.then((UserDataResponse: UserDataType) => {
				user.name = UserDataResponse.userName;
				setUserRole(UserDataResponse.userRole);
				setLoginState("logged");
			})
			.catch(() => {
				setLoginState("error");
			});
	}

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
									<Login handleSubmit={sendForm} handleRegisterClick={changeForm} loginState={loginState} />
								</div>

								<div className="w-screen ">
									<Register handleSubmit={submitForm} handleLoginClick={changeForm} registerState={registerState} errorText={errorMessage.current} />
								</div>
							</>
						)
						: (
							<>
								<div className="w-screen">
									<Register handleSubmit={submitForm} handleLoginClick={changeForm} registerState={registerState} errorText={errorMessage.current} />
								</div>

								<div className="w-screen">
									<Login handleSubmit={sendForm} handleRegisterClick={changeForm} loginState={loginState} />
								</div>
							</>
						)
				}
			</main>
		</>
	);
}

export default LoginRegisterPage;
