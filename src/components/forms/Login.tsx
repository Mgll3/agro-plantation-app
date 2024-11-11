import { LoginStateType } from "../../pages/common/LoginRegisterPage.tsx";
import Button from "../button/Button.tsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { LoginFormValuesType } from "./formsTypes.ts";
import Loading from "../modals/Loading.tsx";
import NetworkError from "../modals/NetworkError.tsx";
import classNames from "classnames";

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
		// TAILWINDCSS => MOBILE FIRST
		<div
			className={classNames(
				"w-[100%] font-sans items-center text-[#eaefd4f2]",
				"max-[767px]:flex max-[767px]:flex-col-reverse",
				"md:flex md:h-[100vh]  md:justify-center"
			)}
		>
			<header
				className="w-full h-[30vh] 
			md:w-[35vw] md:h-[100vh]"
			>
				{/*First line, Mobile First */}
				<div
					className={classNames(
						"w-[100%] bg-loginMobile bg-cover bg-no-repeat",
						"max-[767px]:relative max-[767px]:bg-center max-[767px]:justify-end max-[767px]:items-center max-[767px]:flex max-[767px]:flex-col max-[767px]:h-full max-[767px]:gap-2",
						"md:bg-login md:h-[100vh] md:bg-center md:flex md:justify-end md:items-center "
					)}
				>
					{/* Capa sobre imagen Mobile */}
					<div className="max-[767px]:absolute max-[767px]:inset-0 max-[767px]:bg-gradient-to-b max-[767px]:from-[#4b9742] max-[767px]:to-[#0b7115] max-[767px]:opacity-55 max-[767px]:z-0"></div>

					<h1
						className="bg-[#EAE3C0] text-black font-semibold rounded-2xl font-sans 
					max-[767px]:p-[.1rem_4rem] max-[767px]:z-20 
					md:text-2xl  md:p-[1rem_5rem]  md:translate-x-[14px] md:translate-y-[-20px] "
					>
						Ingreso
					</h1>

					<Link
						to="/copyright"
						className="bg-[#93b447b5] text-[#1B7E25] text-center text-[15px] rounded-md
						md:absolute md:bottom-0 md:p-[4px_4px] md:m-[1rem]  md:max-w-[32vw] 
						max-[767px]:z-20 max-[767px]:w-[80%] mb-4 max-[767px]:text-[1.15rem] max-[767px]:text-black"
					>
						Todos los derechos reservados para PLANT-IN <s className="max-[767px]:text-[#1B7E25]">&copy;</s>
						<small>Marzo 2024</small>
					</Link>
				</div>
			</header>
			{/*absolute bottom-0 p-[4px_4px] m-[1rem_1.7rem] bg-[#94B447] text-[#1B7E25] text-center text-[15px] rounded-md* *NO ME ACUERDO SI SERVÍA*/}
			<div
				className="w-full h-[70vh] 
				md:w-[max-content] md:h-[100vh]  "
			>
				<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
					<Form
						name="loginForm"
						id="loginForm"
						encType="multipart/form-data"
						className="border-solid text-center flex flex-col  justify-around items-center bg-[#EAE3C0] p-4 
						h-full max-[767px]:gap-4 md:w-[65vw] md:h-[100vh]"
					>
						<div className="flex justify-center items-center gap-4 rounded-2xl text-2xl">
							<abbr title="Ir a la página principal">
								<Link to="/">
									<img
										src="images/logos/LogoVerde.png"
										alt="logo"
										data-testid="Login_to_Home_Link"
										className=" bg-[transparent] w-[120px] h-[160px]"
									/>
								</Link>
							</abbr>
						</div>

						<div className="flex flex-col justify-center items-center p-[1rem_0]">
							<div className="relative">
								<Field
									type="email"
									id="loginEmail"
									name="email"
									placeholder="Correo Electrónico"
									className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] mb-[0rem] p-[0_12px] w-[300px] text-black"
								></Field>

								<ErrorMessage name="email">
									{(errorMsg) => <p className="absolute text-xs text-red-700 mt-2">{errorMsg}</p>}
								</ErrorMessage>
							</div>

							<div className="relative">
								<Field
									type="password"
									id="loginPassword"
									name="password"
									placeholder="Contraseña"
									className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] mt-[5rem] p-[0_12px] w-[300px] text-black"
								></Field>

								<ErrorMessage name="password">
									{(errorMsg) => <p className="absolute text-xs text-red-700 mt-2">{errorMsg}</p>}
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

						<Button
							buttonColor="green"
							buttonFontSize="text-base"
							buttonWidth="w-[300px]"
							buttonPaddingY="py-2.5"
							buttonFuncionality={{ submitText: "Iniciar Sesión" }}
						/>

						<p className="text-black font-sans">
							Si no tienes una cuenta, por favor{" "}
							<span onClick={handleRegisterClick} className="text-brandingLightGreen cursor-pointer" role="link">
								REGÍSTRATE
							</span>
						</p>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
