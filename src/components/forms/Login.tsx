import { LoginStateType } from "../../pages/common/LoginRegisterPage.tsx";
import Button from "../button/Button.tsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { LoginFormValuesType } from "./formsTypes.ts";
import Loading from "../modals/Loading.tsx";
import NetworkError from "../modals/NetworkError.tsx";

type LoginProps = {
	handleSubmit: (formValues: LoginFormValuesType) => void;
	handleRegisterClick: () => void;
	loginState: LoginStateType;
	closeErrorMessages: () => void;
};

export default function Login({ handleSubmit, handleRegisterClick, loginState, closeErrorMessages }: LoginProps) {
	const initialValues = {
		email: "",
		password: ""
	};

	const registerSchema = Yup.object({
		email: Yup.string()
			.required("Debes completar este campo")
			.email("El formato no coincide con un email")
			.max(30, "Máximo 30 caracteres"),

		password: Yup.string().required("Debes completar este campo")
	});

	return (
		<div
			className="relative flex flex-col-reverse min-h-screen bg-[#EAE3C0]
			custom-750:flex-row
			custom-750:w-[100vw]"
		>
			<header
				className="relative w-[100vw] h-[30vh] min-h-[200px]
				custom-750:w-[30vw]
				custom-750:h-[100vh]
				custom-750:mt-[0rem]"
			>
				<div
					className="flex flex-col justify-end items-center w-[100%] h-[100%] bg-loginMobile bg-[30%_48%] bg-cover bg-no-repeat font-sans
					custom-750:justify-center
					custom-750:items-end
					custom-750:bg-login
					custom-400:bg-[30%_38%] custom-750:bg-center"
				>
					{/* Capa sobre imagen Mobile */}
					<div
						className="absolute inset-0 bg-gradient-to-b from-[#4b9742] to-[#0b7115] opacity-55 z-0
						custom-750:hidden"
					></div>
					<h1
						className="z-10 px-[4rem] mb-[0.8rem] text-black font-normal font-sora text-[2.2rem] rounded-2xl bg-brandingLightYellow
						custom-1000:px-[4.22rem] custom-2500:px-[6.5rem] custom-3500:px-[10rem]
						custom-750:py-[0.7rem]
						custom-750:font-niramit
						custom-750:text-[2.8rem] custom-1000:text-[3.2rem] custom-2500:text-[5rem] custom-3500:text-[7rem]
						custom-2500:rounded-3xl
						custom-750:rounded-tr-none custom-750:rounded-br-none custom-2500:rounded-tr-none custom-2500:rounded-br-none
						"
					>
						Registro
					</h1>
					<div
						className="w-full flex justify-center
						custom-750:absolute
						custom-750:bottom-[5vh]"
					>
						<Link
							to="/copyright"
							className="py-[0.3rem] px-[0.5rem] text-center text-[1.2rem] text-black bg-brandingLightGreen rounded-lg
							custom-1400:px-[0.8rem]
							custom-750:mx-[1.5rem] custom-1000:mx-[2rem] custom-1200:mx-[3rem]
							custom-2500:text-[1.8rem] custom-3500:text-[2.5rem]"
						>
							Todos los derechos reservados para PLANT-IN{" "}
							<s className="relative left-[-2px] top-[-3px] text-brandingDarkGreen">&copy;</s>
							<small>&nbsp; Marzo 2024</small>
						</Link>
					</div>
				</div>
			</header>

			<div
				className="flex flex-col w-full h-[70vh]
				custom-750:w-[70vw]
				custom-750:h-[100vh]"
			>
				<div className="mx-auto pt-[4.8rem]">
					<abbr title="Ir a la página principal">
						<Link to="/">
							<img
								src="images/logos/LogoVerde.png"
								alt="logo"
								data-testid="Login_to_Home_Link"
								className="w-[120px] aspect-[157/192]
									custom-400:w-[140px] custom-420:w-[157px] custom-750:w-[134px] custom-1900:w-[145px] custom-2500:w-[190px] custom-3500:w-[220px]"
							/>
						</Link>
					</abbr>
				</div>

				<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
					<Form
						name="loginForm"
						id="loginForm"
						encType="multipart/form-data"
						className="flex flex-col items-center w-[100%] mt-[5.6rem] font-sans text-center text-black border-solid bg-[#EAE3C0] 
							custom-750:w-[65vw]"
					>
						<div
							className="flex flex-col justify-center items-center w-[90%]
							custom-750:w-[80%]"
						>
							<div className="relative w-full">
								<Field
									type="email"
									id="loginEmail"
									name="email"
									placeholder="Correo Electrónico"
									className="w-full pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
										custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
										custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]"
								></Field>

								<ErrorMessage name="email">
									{(errorMsg) => <p className="absolute bottom-[0.5rem] ml-4 text-[1.2rem] text-red-600">{errorMsg}</p>}
								</ErrorMessage>
							</div>

							<div className="relative w-full">
								<Field
									type="password"
									id="loginPassword"
									name="password"
									placeholder="Contraseña"
									className="w-full pt-[2.4rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
										custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
										custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]"
								></Field>

								<ErrorMessage name="password">
									{(errorMsg) => <p className="absolute bottom-[0.5rem] ml-4 text-[1.2rem] text-red-600">{errorMsg}</p>}
								</ErrorMessage>
							</div>
						</div>

						{loginState === "loginError" && <p className=" text-red-500 p-2">Email / Clave Incorrectos</p>}

						{loginState === "networkError" && (
							<NetworkError
								failedAction="realizar el login"
								buttonText="Volver a intentar"
								handleClose={closeErrorMessages}
							/>
						)}

						{loginState === "loading" && <Loading />}

						<div
							className="w-full mt-[4rem]
							custom-390:mt-[8rem]"
						>
							<Button
								buttonColor="yellow"
								buttonFontSize="text-[1.5rem] custom-500:text-[1.7rem] custom-750:text-[2rem] custom-2500:text-[3rem] custom-3500:text-[4rem]"
								buttonWidth="w-[90%] custom-500:w-[80%] custom-900:w-[60%] custom-1200:w-[48.45%]"
								buttonPaddingY="py-[0.58rem] py-[0.7rem] custom-2500:py-[1rem] custom-3500:py-[1.5rem]"
								buttonFuncionality={{ submitText: "Iniciar Sesión" }}
							/>

							<div className="flex flex-wrap justify-center items-baseline w-full mt-[1rem]">
								<p
									className="text-[1.4rem] text-black font-sans drop-shadow-smallText
								custom-500:text-[1.6rem] custom-2500:text-[2rem] custom-3500:text-[2.5rem]"
								>
									Si no tienes una cuenta, por favor
								</p>
								<p
									onClick={handleRegisterClick}
									className="ml-[0.5rem] text-[2rem] text-brandingLightGreen font-loginFont hover:drop-shadow-smallText
									custom-2500:ml-[1rem]
									custom-500:text-[2.2rem] custom-2500:text-[2.5rem] custom-3500:text-[3.3rem]"
									role="button"
								>
									Regístrate
								</p>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
