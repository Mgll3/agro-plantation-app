import { LoginStateType } from "../../pages/LoginRegisterPage.tsx";
import Button from "../button/Button.tsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import *  as  Yup from "yup";
import { LoginFormValuesType } from "./formsTypes.ts";
import Loading from "../loading/Loading.tsx";
import NetworkError from "../networkError/NetworkError.tsx";

type LoginProps = {
	handleSubmit: (formValues: LoginFormValuesType) => void,
	handleRegisterClick: () => void,
	loginState: LoginStateType
}

export default function Login({ handleSubmit, handleRegisterClick, loginState }: LoginProps) {

	const navigate = useNavigate();

	const initialValues = {
		email: "",
		password: ""
	};

	const registerSchema = Yup.object({
		email: Yup.string()
			.required("Debes completar este campo")
			.email("El formato no coincide con un email")
			.max(30, "Máximo 30 caracteres"),

		password: Yup.string()
			.required("Debes completar este campo")
	});

	return (
		<div className="w-[100%] font-sans flex h-[100vh] items-center justify-center text-[#eaefd4f2] overflow-x-hidden">
			<aside className="w-[35vw] h-[100vh] ">
				<div className="bg-[url('@/images/inicio_y_registro.jpg')] w-[100%] h-[100%] bg-center bg-cover bg-no-repeat flex justify-end items-center">
					<h1 className="bg-[#EAE3C0] text-black font-semibold text-2xl font-sans p-[1rem_5rem] rounded-2xl translate-x-[14px] translate-y-[-20px]">Ingreso</h1>
					<Link to="/copyright" className=" absolute bottom-0 p-[4px_4px] m-[1rem] bg-[#94B447] text-[#1B7E25] text-center text-[15px] rounded-md max-w-[32vw]">
						Todos los derechos reservados para Plant-In &copy; 
						<small>Marzo 2024</small>
					</Link>
				</div>
			</aside>{/*absolute bottom-0 p-[4px_4px] m-[1rem_1.7rem] bg-[#94B447] text-[#1B7E25] text-center text-[15px] rounded-md*/}
			<div className="w-[max-content] h-[100vh] ">
				<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
					<Form
						name="loginForm"
						id="loginForm"
						encType="multipart/form-data"
						className="w-[65vw] h-[100vh] border-solid text-center flex flex-col justify-around items-center bg-[#EAE3C0] p-4 "
					>

						<div className="flex justify-center items-center gap-4 rounded-2xl text-2xl">
							<abbr title="Ir a la página principal">
								<button type="button" onClick={() => navigate("/")}><img src="images/LogoVerde.png" alt="logo"
									className=" bg-[transparent] w-[120px] h-[160px]" />
								</button>
							</abbr>
						</div>

						<div className="flex flex-col justify-center items-center p-[1rem_0]">
							<label htmlFor="email">
								<Field 
									type="email"
									id="loginEmail"
									name="email"
									placeholder="Correo Electrónico"
									className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] mb-[5rem] p-[0_12px] w-[300px] text-black"
								>
								</Field>
							</label>
							<ErrorMessage name="email" >
								{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
							</ErrorMessage>


							<label htmlFor="password">
								<Field
									type="password"
									id="loginPassword"
									name="password"
									placeholder="Contraseña"
									className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] p-[0_12px] w-[300px] text-black"
								>
								</Field>
							</label>
							<ErrorMessage name="password" >
								{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
							</ErrorMessage>

						</div>

						{
							loginState === "loginError" && <p className=" text-red-500 p-2">Email / Clave Incorrectos</p>
						}

						{
							loginState === "networkError" && <NetworkError failedAction="realizar el login" />
						}

						{
							loginState === "loading" && <Loading />
						}

						<Button
							buttonColor="green"
							buttonFontSize="text-base"
							buttonWidth="w-[300px]"
							buttonPaddingY="py-2.5"
							buttonFuncionality={{ submitText: "Iniciar Sesión" }}
						/>


						<p className="text-black font-sans">Si no tienes una cuenta, por favor <span onClick={handleRegisterClick} className="text-brandingLightGreen" role="button" >REGÍSTRATE</span></p>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
