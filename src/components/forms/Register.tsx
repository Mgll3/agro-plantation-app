import { ErrorMessage, Field, Form, Formik } from "formik";
import *  as  Yup from "yup";
import { RegisterFormValuesType } from "./formsTypes";
import { CircularProgress } from "@mui/material";
import Button from "../button/Button";
import { RegisterStateType } from "../../pages/LoginRegisterPage";


type RegisterProps = {
	handleSubmit: (formValues: RegisterFormValuesType) => void,
	handleLoginClick: () => void,
	registerState: RegisterStateType,
	errorText: string
}

export default function Register({ handleSubmit, handleLoginClick, registerState, errorText }: RegisterProps) {
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
						<div className="flex justify-center items-center bg-huerta rounded-2xl p-6 w-screen h-[max-content]">

							<Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
								<Form name="registerForm" action="" encType="multipart/form-data" className="w-[350px] h-[max-content] text-center bg-[#86b155d6] p-4 rounded-2xl text-[#eaefd4f2] overflow-hidden">

									<div className="flex flex-col gap-6 pb-2">
										<div className="flex justify-center items-center">
											<img src="./images/huertas-logo.png" alt="ecohuertas" className="w-[70px] h-[70px] rounded-full shadow-[0_0_12px] shadow-[#7edb15d6]" />

											<h2 className=" text-3xl font-light p-[0_2rem]">Regístrate</h2>
										</div>

										<div className="flex flex-col gap-1 items-start text-base">
											<div className="">
												<label htmlFor="userName">Nombre: </label>
												<Field type="text" id="userName" name="userName" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userName" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>


											<div className="">
												<label htmlFor="userLastName">Apellidos: </label>
												<Field type="text" id="userLastName" name="userLastName" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userLastName" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>

											<div className="">
												<label htmlFor="userEmail">Email: </label>
												<Field type="email" id="userEmail" name="userEmail" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userEmail" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>

											<div className="">
												<label htmlFor="userAddressStreet">Calle / Vía: </label>
												<Field type="text" id="userAddressStreet" name="userAddressStreet" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userAddressStreet" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>

											<div className="">
												<label htmlFor="userAddressCity">Localidad: </label>
												<Field type="text" id="userAddressCity" name="userAddressCity" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userAddressCity" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>

											<div className="">
												<label htmlFor="userAddressCountry">País: </label>
												<Field type="text" id="userAddressCountry" name="userAddressCountry" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userAddressCountry" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>

											<div className="">
												<label htmlFor="userPassword">Contraseña: </label>
												<Field type="password" id="userPassword" name="userPassword" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userPassword" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>

											<div className="">
												<label htmlFor="userPasswordConfirm">Confirmar: </label>
												<Field type="password" id="userPasswordConfirm" name="userPasswordConfirm" placeholder=". . ." className="placeholder-[#b3e59ec3]" />
											</div>

											<ErrorMessage name="userPasswordConfirm" >
												{errorMsg => <p className=" text-xs text-red-700">{errorMsg}</p>}
											</ErrorMessage>
										</div>

										{registerState === "loading" && <CircularProgress color="success" />}

										<Button
											buttonColor="green"
											buttonFontSize="text-base"
											buttonWidth="w-full"
											buttonPaddingY="py-2.5"
											buttonFuncionality={{ submitText: "Regístrate" }}
										/>

										<p>Si ya estás registrado, por favor <span onClick={handleLoginClick} className="text-brandingLightGreen" role="button" >INICIA SESIÓN</span></p>

									</div>
								</Form>
							</Formik>

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