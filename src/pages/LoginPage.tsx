import { useEffect, useRef, useState } from "react";
import Login from "../components/forms/Login";
import Header from "../components/header/Header";
import { useUserRoleContext } from "../context/UserRoleContext";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../interfaces/logInUser";
import { user } from "../data/userData";
import { UserDataType } from "./Home";

export type LoginStateType = "init" | "loading" | "error" | "logged";

function LoginPage() {
	const bgImageTailwind = "bg-headerBg";
	const logoSrc = "images/logo-plant-in.png";

	const { setUserRole } = useUserRoleContext();
	const [loginState, setLoginState] = useState<LoginStateType>("init");

	const axiosController = useRef<AbortController>();

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

	useEffect(() => {

		if (loginState === "logged") {
			navigate("/");
		}


	}, [loginState]);

	useEffect(() => {
		axiosController.current = new AbortController();

		return () => {
			if (axiosController.current) axiosController.current.abort();
		};
	}, []);


	return (
		<>
			<div className="w-full" >
				<Header bgImageTailwind={bgImageTailwind} logoSrc={logoSrc} />
			</div>

			<main className="flex items-center justify-center overflow-hidden">
				<Login handleSubmit={sendForm} loginState={loginState} />
			</main>
		</>
	);
}

export default LoginPage;
