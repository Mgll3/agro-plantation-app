import { ErrorMessage, Field, Form, Formik } from "formik";
import *  as  Yup from "yup";
import { RegisterFormValuesType } from "./formsTypes";
import { CircularProgress } from "@mui/material";
import { RegisterStateType } from "../../pages/RegisterPage";
import Button from "../button/Button";
import { Link } from "react-router-dom";

type RegisterProps = {
	handleSubmit: (formValues: RegisterFormValuesType) => void,
	registerState: RegisterStateType,
	errorText: string
}

export default function Register({ handleSubmit, registerState, errorText }: RegisterProps) {
	const lowerCaseRegex = /[a-z]/g;
	const upperCaseRegex = /[A-Z]/g;
	const numberRegex = /[0-9]/g;
	const specialCharacterRegex = /[!@#$%^&_*-]/g;

	const initialValues = {
		userName: "",
		userLastName: "",
		userEmail: "",
		userAddressStreet: "",
		userAddressCity: "",
		userAddressCountry: "",
		userPassword: "",
		userPasswordConfirm: ""
	};

	const registerSchema = Yup.object({
		userName: Yup.string().required("Debes completar este campo").max(30, "Máximo 30 caracteres"),
		userLastName: Yup.string().required("Debes completar este campo").max(30, "Máximo 30 caracteres"),
		userEmail: Yup.string().required("Debes completar este campo").email("El formato no coincide con un email").max(30, "Máximo 30 caracteres"),
		userAddressStreet: Yup.string().required("Debes completar este campo"),
		userAddressCity: Yup.string().required("Debes completar este campo"),
		userAddressCountry: Yup.string().required("Debes completar este campo"),

		userPassword: Yup.string()
			.required("Debes completar este campo")
			.min(8, "Al menos 8 caracteres")
			.max(12, "Máximo 12 caracteres")
			.matches(lowerCaseRegex, "Debe tener al menos una letra minúscula")
			.matches(upperCaseRegex, "Debe tener al menos una letra mayúscula")
			.matches(numberRegex, "Debe tener al menos un número")
			.matches(specialCharacterRegex, "Debe tener al menos una carácter especial"),

		userPasswordConfirm: Yup.string()
			.required("Debes confirmar tu contraseña")
			.oneOf([Yup.ref("userPassword")], "Las contraseñas no coinciden")
	});


	return (
		<>
			{
				registerState === "init" || registerState === "loading"
					? (
						<div className="w-[100vw] font-loginFont flex h-[100%] rounded-2xl text-[#eaefd4f2] bg-[#EAE3C0]">

							<aside className="w-[35vw] h-[100vh] ">

								<div className="bg-[url('./public/images/inicio_y_registro.jpg')] w-[100%] h-[100%] bg-center bg-cover bg-no-repeat flex justify-end items-center">
									<h2 className="bg-[#EAE3C0] text-black font-semibold text-2xl font-loginFont p-[1rem_4rem] rounded-2xl translate-x-[14px] translate-y-[30px]">Registro</h2>
								</div>

							</aside>

							<div>
								<div className="flex flex-col justify-center items-center gap-1 rounded-2xl text-2xl text-black font-sans mt-[4rem]">
									<h1>Bienvenido a</h1>
									<img src="images/logo-plant-in.png" alt="logo"
										className=" bg-[transparent] w-[100px] h-[140px]" />
									<h2>Por favor, completa el formulario</h2>
								</div>
								<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>


									<Form name="registerForm" action="" encType="multipart/form-data" className="w-[65vw] h-[100%] border-solid text-center justify-around items-center bg-[#EAE3C0] text-black p-[1rem_6rem_2rem] font-loginFont">

										<div className="flex flex-col pb-2">


											<div className="grid grid-cols-form auto-cols-[repeat] gap-5 items-start text-base text-left">
												<div className="">
													<label htmlFor="userName"><Field type="text" id="userName" name="userName" placeholder="Nombres" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userName" >
														{errorMsg => <p className=" text-xs text-red-600 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>




												<div className="">
													<label htmlFor="userLastName"><Field type="text" id="userLastName" name="userLastName" placeholder="Apellido" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userLastName" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>



												<div className="grid-span-2">
													<label htmlFor="userEmail"><Field type="email" id="userEmail" name="userEmail" placeholder="Correo Electrónico" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userEmail" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>

												</div>



												<div className="">
													<label htmlFor="userAddressStreet"><Field type="text" id="userAddressStreet" name="userAddressStreet" placeholder="Dirección" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userAddressStreet" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>



												<div className="">
													<label htmlFor="userAddressCity"><Field type="text" id="userAddressCity" name="userAddressCity" placeholder="Ciudad" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userAddressCity" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>



												<div className="">
													<label htmlFor="userAddressCountry"><Field type="text" id="userAddressCountry" name="userAddressCountry" placeholder="Provincia" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userAddressCountry" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>



												<div className="">
													<label htmlFor="userPassword"><Field type="password" id="userPassword" name="userPassword" placeholder="Contraseña" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userPassword" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>



												<div className="">
													<label htmlFor="userPasswordConfirm"><Field type="password" id="userPasswordConfirm" name="userPasswordConfirm" placeholder="Confirmar contraseña" className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" /></label>
													<ErrorMessage name="userPasswordConfirm" >
														{errorMsg => <p className=" text-xs text-red-700 mt-2">{errorMsg}</p>}
													</ErrorMessage>
												</div>


											</div>

											{registerState === "loading" && <CircularProgress color="success" />}

											<Button
												buttonColor="green"
												buttonFontSize="text-base"
												buttonWidth="w-[94%] m-[3rem_auto_3rem_0]"
												buttonPaddingY="py-2.5"
												buttonFuncionality={{ submitText: "Regístrate" }}
											/>

											<p>Si ya estás registrado, por favor <Link to="/login" className="text-brandingLightGreen mt-2" >INICIA SESIÓN</Link></p>

										</div>
									</Form>
								</Formik>
							</div>

						</div>
					)
					: registerState === "error" && (
						<div className="">
							<h1 className="">Ups! Ha habido algún problema al intentar hacer el registro: <span>{errorText}</span> Por favor, revisa tu conexión e inténtalo de nuevo.</h1>
						</div>
					)
			}
		</>
	);
}