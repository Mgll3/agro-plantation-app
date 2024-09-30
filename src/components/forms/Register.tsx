import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterFormValuesType } from "./formsTypes";
import { RegisterStateType } from "../../pages/common/LoginRegisterPage";
import { Link, useNavigate } from "react-router-dom";
import RegisterOk from "./RegisterOk";
import Loading from "../modals/Loading";
import NetworkError from "../modals/NetworkError";
import RegisterKo from "./RegisterKo";

type RegisterProps = {
	handleSubmit: (formValues: RegisterFormValuesType) => void;
	handleLoginClick: () => void;
	registerState: RegisterStateType;
	closeErrorMessages: () => void;
};

export default function Register({ handleSubmit, handleLoginClick, registerState, closeErrorMessages }: RegisterProps) {
	const lowerCaseRegex = /[a-z]/g;
	const upperCaseRegex = /[A-Z]/g;
	const noSpaceAtStartRegex = /^\S/g;
	const noSpaceEndingRegex = /\S$/g;
	const noSpacesRegex = /^\S*$/g;
	const numberRegex = /[0-9]/g;
	const noNumberRegex = /^\D*$/g;
	const specialCharacterRegex = /[!@#$%^&_*-]/g;
	const noSpecialCharacterRegex = /^[a-zA-ZáéíóúñÑ\s0-9]*$/g;

	const navigate = useNavigate();

	const initialValues = {
		userName: "",
		userLastName: "",
		userEmail: "",
		// userAddressStreet: "",
		userAddressCity: "",
		userAddressProvince: "",
		userPassword: "",
		userPasswordConfirm: ""
	};

	const validationSchema = Yup.object({
		userName: Yup.string()
			.required("Debes completar este campo")
			.max(30, "Máximo 30 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.matches(noNumberRegex, "No se admiten números")
			.min(2, "Al menos 2 caracteres"),

		userLastName: Yup.string()
			.required("Debes completar este campo")
			.max(30, "Máximo 30 caracteres")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.matches(noNumberRegex, "No se admiten números")
			.min(2, "Al menos 2 caracteres"),

		userEmail: Yup.string()
			.required("Debes completar este campo")
			.email("El formato no coincide con un email")
			.max(30, "Máximo 30 caracteres"),

		// userAddressStreet: Yup.string()
		// 	.required("Debes completar este campo")
		// 	.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
		// 	.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
		// 	.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
		// 	.max(30, "Máximo 30 caracteres"),

		userAddressCity: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.matches(noNumberRegex, "No se admiten números")
			.max(30, "Máximo 30 caracteres"),

		userAddressProvince: Yup.string()
			.required("Debes completar este campo")
			.matches(noSpaceAtStartRegex, "No puede comenzar con un espacio")
			.matches(noSpaceEndingRegex, "No puede terminar con un espacio")
			.matches(noSpecialCharacterRegex, "No se admiten caracteres especiales")
			.matches(noNumberRegex, "No se admiten números")
			.max(30, "Máximo 30 caracteres"),

		userPassword: Yup.string()
			.required("Debes completar este campo")
			.max(15, "Máximo 15 caracteres")
			.matches(noSpacesRegex, "No se admiten espacios")
			.matches(lowerCaseRegex, "Debe tener al menos una letra minúscula")
			.matches(upperCaseRegex, "Debe tener al menos una letra mayúscula")
			.matches(numberRegex, "Debe tener al menos un número")
			.matches(specialCharacterRegex, "Debe tener al menos una carácter especial")
			.min(8, "Al menos 8 caracteres"),

		userPasswordConfirm: Yup.string()
			.required("Debes confirmar tu contraseña")
			.oneOf([Yup.ref("userPassword")], "Las contraseñas no coinciden")
	});

	const formik = useFormik({
		initialValues: initialValues,
		onSubmit: handleSubmit,
		validationSchema
	});

	return (
		<>
			<div className="relative md:w-[100vw] md:flex-row font-loginFont flex flex-col-reverse h-[100%] text-[#eaefd4f2] bg-[#EAE3C0]">
				<aside className="w-[100vw] h-[30vh] relative md:w-[30vw] md:h-[100vh]">
					<div className="md:bg-login bg-loginMobile w-[100%] h-[100%] bg-center bg-cover bg-no-repeat flex justify-center md:justify-end items-center font-sans">
						{/* Capa sobre imagen Mobile */}
						<div className="max-[767px]:absolute max-[767px]:inset-0 max-[767px]:bg-gradient-to-b max-[767px]:from-[#4b9742] max-[767px]:to-[#0b7115] max-[767px]:opacity-55 max-[767px]:z-0"></div>
						<h2 className="bg-[#EAE3C0] text-black font-semibold text-2xl md:md:p-[1rem_4rem] rounded-2xl md:translate-x-[14px] md:translate-y-[30px] z-10 p-[.1rem_4rem]">
							Registro
						</h2>
						<Link
							to="/copyright"
							className="absolute bottom-0 p-[4px_4px] m-[1rem] bg-[#93b447b5] text-[#1B7E25] text-center md:text-[15px] text-[1.2rem] rounded-md z-10 max-[767px]:text-black"
						>
							Todos los derechos reservados para PLANT-IN <s className="max-[767px]:text-[#1B7E25]">&copy;</s>
							<small>Marzo 2024</small>
						</Link>
					</div>
				</aside>

				<div className="md:w-[70vw] max-[767px]:max-h-[70vh] md:overflow-x-hidden md:max-h-[100vh] max-[767px]:overflow-scroll ">
					<div className="flex flex-col justify-center items-center gap-1 rounded-2xl text-2xl text-black font-sans md:mt-[2rem] mt-[2rem]">
						<h1 className="max-[767px]:hidden">Bienvenido a</h1>
						<button type="button" onClick={() => navigate("/")}>
							<img src="images/logos/LogoVerde.png" alt="logo" className=" w-[120px] h-[150px] mb-5" />
						</button>
						<h2 className="max-[767px]:hidden">Por favor, completa el formulario</h2>
					</div>

					<form
						name="registerForm"
						action=""
						encType="multipart/form-data"
						onSubmit={formik.handleSubmit}
						className="md:w-[100%] w-[100vw] max-h-[100%] text-center justify-around items-center bg-[#EAE3C0] text-black md:p-[1rem_6rem_2rem] p-[1.5rem] font-sans"
					>
						<div className="flex flex-col pb-2 w-full">
							<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4 text-base md:width-[100%] w-full">
								<div className="relative">
									<label htmlFor="userName">
										<input
											type="text"
											id="userName"
											placeholder="Nombre/s"
											{...formik.getFieldProps("userName")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] p-[8px_8px_4px] w-full placeholder-[#666]"
										/>
									</label>

									{formik.touched.userName && formik.errors.userName ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userName}</p>
									) : null}
								</div>

								<div className="relative ">
									<label htmlFor="userLastName">
										<input
											type="text"
											id="userLastName"
											placeholder="Apellido/s"
											{...formik.getFieldProps("userLastName")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] w-full placeholder-[#666] p-[8px_8px_4px]"
										/>
									</label>

									{formik.touched.userLastName && formik.errors.userLastName ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userLastName}</p>
									) : null}
								</div>

								<div className="relative  md:col-span-2">
									<label htmlFor="userEmail">
										<input
											type="email"
											id="userEmail"
											placeholder="Correo Electrónico"
											{...formik.getFieldProps("userEmail")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] p-[8px_8px_4px] w-full placeholder-[#666]"
										/>
									</label>

									{formik.touched.userEmail && formik.errors.userEmail ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userEmail}</p>
									) : null}
								</div>

								{/* <div className="relative ">
										<label htmlFor="userAddressStreet">
											<input type="text" id="userAddressStreet" name="userAddressStreet" placeholder="Dirección" { ...formik.getFieldProps("userAddressStreet") }
												className="bg-[#00000011] outline-none  border-b-[2px] rounded-sm border-b-[#00000038] p-[0_12px] w-[300px]" />
										</label>
										<ErrorMessage name="userAddressStreet" >
											{errorMsg => <p className="absolute text-xs text-red-700 ml-4">{errorMsg}</p>}
										</ErrorMessage>
									</div> */}

								<div className="relative ">
									<label htmlFor="userAddressCity">
										<input
											type="text"
											id="userAddressCity"
											placeholder="Ciudad"
											{...formik.getFieldProps("userAddressCity")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] p-[8px_8px_4px] w-full placeholder-[#666]"
										/>
									</label>

									{formik.touched.userAddressCity && formik.errors.userAddressCity ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userAddressCity}</p>
									) : null}
								</div>

								<div className="relative ">
									<label htmlFor="userAddressProvince">
										<input
											type="text"
											id="userAddressProvince"
											placeholder="Provincia"
											{...formik.getFieldProps("userAddressProvince")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] p-[8px_8px_4px] w-full placeholder-[#666]"
										/>
									</label>

									{formik.touched.userAddressProvince && formik.errors.userAddressProvince ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userAddressProvince}</p>
									) : null}
								</div>

								<div className="relative ">
									<label htmlFor="userPassword">
										<input
											type="password"
											id="userPassword"
											placeholder="Contraseña"
											{...formik.getFieldProps("userPassword")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] p-[8px_8px_4px] w-full placeholder-[#666]"
										/>
									</label>

									{formik.touched.userPassword && formik.errors.userPassword ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userPassword}</p>
									) : null}
								</div>

								<div className="relative ">
									<label htmlFor="userPasswordConfirm">
										<input
											type="password"
											id="userPasswordConfirm"
											placeholder="Confirmar contraseña"
											{...formik.getFieldProps("userPasswordConfirm")}
											className="bg-[#00000011] outline-none  border-b-[2px] rounded-md border-b-[#00000052] p-[8px_8px_4px] w-full placeholder-[#666]"
										/>
									</label>

									{formik.touched.userPasswordConfirm && formik.errors.userPasswordConfirm ? (
										<p className="absolute text-xs text-red-600 ml-4">{formik.errors.userPasswordConfirm}</p>
									) : null}
								</div>
							</div>

							{formik.isValid && formik.dirty ? (
								<button
									type="submit"
									className="w-[100%] text-base py-2.5 m-[3rem_auto] shadow-md rounded-lg font-sans text-brandingYellow cursor-pointer font-bold bg-brandingDarkGreen hover:bg-opacity-80 transition-all"
								>
									Regístrate
								</button>
							) : (
								<button
									type="submit"
									disabled
									className="w-[94%] text-base py-2.5 m-[2rem_auto] shadow-md rounded-lg font-sans text-black cursor-pointer font-bold bg-brandingYellow hover:bg-opacity-80 transition-all"
								>
									Regístrate
								</button>
							)}

							<p className="text-[1.2rem]">
								Si ya estás registrado, por favor{" "}
								<span onClick={handleLoginClick} className="text-brandingLightGreen mt-2" role="button">
									INICIA SESIÓN
								</span>
							</p>
						</div>
					</form>
				</div>

				{registerState === "loading" && <Loading />}
				{registerState === "logged" && <RegisterOk />}
				{registerState === "registerErrorEmailExists" && (
					<RegisterKo errorText="El email introducido ya existe. Por favor, introduce otro." />
				)}
				{(registerState === "registerErrorServerError" || registerState === "networkError") && (
					<NetworkError failedAction="registrarte" buttonText="Volver a intentar" handleClose={closeErrorMessages} />
				)}
			</div>
		</>
	);
}
