import { LoginStateType } from "../../pages/LoginRegisterPage.tsx";
import Button from "../button/Button.tsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import *  as  Yup from "yup";
import { LoginFormValuesType } from "./formsTypes.ts";
import Loading from "../modals/Loading.tsx";
import NetworkError from "../modals/NetworkError.tsx";

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
		<div className="w-[100%] flex h-[100vh] items-center justify-center bg-[#FFFFFF] text-[#eaefd4f2] overflow-x-hidden">
			<aside className="w-[32vw] h-[100vh] ">
				<div className="bg-login w-[100%] h-[100%]  bg-center bg-cover bg-no-repeat flex justify-end items-center rounded-r-xl">
					<h1 className="bg-[#EAE3C0] text-black font-medium text-2xl font-sans p-[.8rem_3rem] rounded-l-[25px]  translate-y-[5px] drop-shadow-[0_4px_2px_rgba(0,0,0,.2)]">Ingreso</h1>
					<Link to="/copyright" className=" absolute font-sans bottom-4 p-[4px_2px] m-[1rem] bg-[#94B447] text-[#000] text-center text-[13px] rounded-md max-w-[32vw] drop-shadow-[2px_4px_2px_rgba(0,0,0,.2)]">
						Todos los derechos reservados para PLANT-IN<span className="text-[#1B7E25]">&copy;</span> Marzo 2024
					</Link>
				</div>
			</aside>{/*absolute bottom-0 p-[4px_4px] m-[1rem_1.7rem] bg-[#94B447] text-[#1B7E25] text-center text-[15px] rounded-md*/}
			<div className="w-[max-content] h-[100vh] z-10">
				<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
					<Form
						name="loginForm"
						id="loginForm"
						encType="multipart/form-data"
						className="w-[68vw] h-[100vh] border-solid text-center flex flex-col items-center "
					>

						<div className="flex flex-col justify-center items-center w-full p-[64px_0] rounded-2xl text-2xl">
							<abbr title="Ir a la página principal">
								<button type="button" onClick={() => navigate("/")}>
									<img src="images/logos/LogoVerde.png" alt="logo"
										className=" bg-[transparent] w-[133.3px] h-[163.12px]"
									/>
								</button>
							</abbr>
						</div>

						<div className="flex flex-col justify-center items-center p-[1rem_0]">
							<div className="relative">
								<Field 
									type="email"
									id="loginEmail"
									name="email"
									placeholder="Correo Electrónico"
									className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] mb-[0rem] p-[0_12px] w-[300px] text-[#636363] shadow-[0_2px_0_rgba(0,0,0,.04)]"
								>
								</Field>

								<ErrorMessage name="email" >
									{errorMsg => <p className="absolute text-xs text-red-700 mt-2">{errorMsg}</p>}
								</ErrorMessage>
							</div>


							<div className="relative">
								<Field
									type="password"
									id="loginPassword"
									name="password"
									placeholder="Contraseña"
									className="bg-[transparent] outline-none  border-b-[1px] border-b-[#00000038] mt-[64px] p-[0_12px] w-[300px] text-black shadow-[0_2px_0_rgba(0,0,0,.04)]"
								>
								</Field>
								
								<ErrorMessage name="password" >
									{errorMsg => <p className="absolute text-xs text-red-700 mt-2">{errorMsg}</p>}
								</ErrorMessage>
							</div>
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
							buttonColor="yellow"
							buttonFontSize="text-base"
							buttonWidth="w-[300px]"
							buttonPaddingY="py-2.5 m-[64px_0] shadow-[0_3px_6px_rgba(100,100,100,.6)]"
							buttonFuncionality={{ submitText: "Iniciar Sesión" }}
						/>


						<p className="text-black font-sans font-light ">Si no tienes una cuenta, por favor <span onClick={handleRegisterClick} className="text-[#1B7E25]" role="button" >regístrate</span></p>
					</Form>
				</Formik>
			</div>
		</div>
	);
}


