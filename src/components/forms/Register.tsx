import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterFormValuesType } from "./formsTypes";
import { RegisterStateType } from "../../pages/common/LoginRegisterPage";
import { Link } from "react-router-dom";
import RegisterOk from "./RegisterOk";
import Loading from "../modals/Loading";
import NetworkError from "../modals/NetworkError";
import RegisterKo from "./RegisterKo";
import { forwardRef } from "react";

type RegisterProps = {
	handleSubmit: (formValues: RegisterFormValuesType) => void;
	handleLoginClick: () => void;
	registerState: RegisterStateType;
	closeErrorMessages: () => void;
	focus: "login" | "register";
	registerContainerElement: React.RefObject<HTMLDivElement>;
};

const Register = forwardRef(function Register({
	handleSubmit,
	handleLoginClick,
	registerState,
	closeErrorMessages,
	focus,
	registerContainerElement
}: RegisterProps) {
	const lowerCaseRegex = /[a-z]/g;
	const upperCaseRegex = /[A-Z]/g;
	const noSpaceAtStartRegex = /^\S/g;
	const noSpaceEndingRegex = /\S$/g;
	const noSpacesRegex = /^\S*$/g;
	const numberRegex = /[0-9]/g;
	const noNumberRegex = /^\D*$/g;
	const specialCharacterRegex = /[!@#$%^&_*-]/g;
	const noSpecialCharacterRegex = /^[a-zA-ZáéíóúñÑ\s0-9]*$/g;

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
		<div
			ref={registerContainerElement}
			className={`relative flex flex-col-reverse justify-between ${focus === "login" ? "h-[100vh] overflow-hidden" : "h-[100%]"} text-[#eaefd4f2] font-loginFont bg-[#EAE3C0]
			custom-750:flex-row
			custom-750:w-[100vw]`}
		>
			<header
				className="relative w-[100vw] h-[25vh] mt-[-0.5rem]
				custom-750:w-[30vw]
				custom-390:h-[20vh] custom-420:h-[14.81vh] custom-500:h-[25vh] custom-750:h-full
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
							<small>&nbsp; Noviembre 2024</small>
						</Link>
					</div>
				</div>
			</header>

			<div
				className="w-full
				custom-750:w-[70vw]"
			>
				<div
					className="flex flex-col justify-center items-center mt-[3rem] rounded-2xl text-[2.5rem] text-black font-niramit
					custom-750:mt-[2rem] custom-1400:mt-[2.5rem] custom-2500:mt-[5rem] custom-3500:mt-[7rem]
					custom-1000:text-[3.2rem] custom-2500:text-[4rem] custom-3500:text-[5rem]"
				>
					<p className="max-[767px]:hidden mb-[1.6rem]">Bienvenido a</p>
					<Link to="/">
						<img
							src="images/logos/LogoVerde.png"
							alt="logo"
							className="w-[120px] aspect-[157/192]
							custom-400:w-[140px] custom-420:w-[157px] custom-750:w-[134px] custom-1900:w-[145px] custom-2500:w-[190px] custom-3500:w-[220px]"
						/>
					</Link>
					<h2 className="max-[767px]:hidden mt-[1.6rem] text-center">Por favor, completa el formulario</h2>
				</div>

				<form
					name="registerForm"
					action=""
					encType="multipart/form-data"
					onSubmit={formik.handleSubmit}
					className="md:w-[100%] w-[100vw] max-h-[100%] mx-auto px-[1.6rem] pt-[3rem] text-center text-black font-sans bg-[#EAE3C0]
						custom-1000:w-[93%] custom-1200:w-[80%] custom-1400:w-[70.34%]
						custom-2500:mt-[3rem] custom-3500:mt-[6rem]
						custom-1400:pt-[1.6rem]"
				>
					<div className="flex flex-col pb-2 w-full">
						<div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4 text-base md:width-[100%] w-full">
							<div className="relative">
								<label htmlFor="userName">
									<input
										type="text"
										id="userName"
										placeholder="Nombre"
										{...formik.getFieldProps("userName")}
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
								) : null}
							</div>

							<div className="relative ">
								<label htmlFor="userLastName">
									<input
										type="text"
										id="userLastName"
										placeholder="Apellido/s"
										{...formik.getFieldProps("userLastName")}
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
								) : null}
							</div>

							<div className="relative  md:col-span-2">
								<label htmlFor="userEmail">
									<input
										type="email"
										id="userEmail"
										placeholder="Correo Electrónico"
										{...formik.getFieldProps("userEmail")}
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
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
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
								) : null}
							</div>

							<div className="relative ">
								<label htmlFor="userAddressProvince">
									<input
										type="text"
										id="userAddressProvince"
										placeholder="Provincia"
										{...formik.getFieldProps("userAddressProvince")}
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
								) : null}
							</div>

							<div className="relative ">
								<label htmlFor="userPassword">
									<input
										type="password"
										id="userPassword"
										placeholder="Contraseña"
										{...formik.getFieldProps("userPassword")}
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
								) : null}
							</div>

							<div className="relative ">
								<label htmlFor="userPasswordConfirm">
									<input
										type="password"
										id="userPasswordConfirm"
										placeholder="Confirma contraseña"
										{...formik.getFieldProps("userPasswordConfirm")}
										className="w-full pt-[0.5rem] pb-[0.2rem] pl-[0.1rem] mb-[2.5rem] bg-brandingLightYellow border-b-[2px] border-b-grey700 text-[1.6rem] placeholder:text-[2rem] placeholder-grey600 outline-none
											custom-750:p-[19px_16px_8px]
											custom-500:text-[2rem] custom-1000:text-[2.2rem] custom-1900:text-[2.4rem] custom-2500:text-[3rem] custom-3500:text-[4rem]
											custom-1900:placeholder:text-[2.3rem] custom-2500:placeholder:text-[3rem] custom-3500:placeholder:text-[4rem]
											custom-750:rounded-md
											custom-750:bg-[#00000011]"
									/>
								</label>

								{formik.touched.userName && formik.errors.userName ? (
									<p
										className="absolute bottom-[-0.2rem] ml-4 text-[1.3rem] text-red-600
										custom-1000:text-[1.6rem] custom-2500:text-[1.9rem]"
									>
										{formik.errors.userName}
									</p>
								) : null}
							</div>
						</div>

						{formik.isValid && formik.dirty ? (
							<button
								type="submit"
								className="w-[96%] text-[1.5rem] py-2.5 m-[3rem_auto] shadow-md rounded-lg font-sans text-brandingYellow cursor-pointer font-bold bg-brandingDarkGreen hover:bg-opacity-80 transition-all
									custom-500:w-[80%] custom-900:w-[60%] custom-1200:w-[48.45%]
									custom-900:py-[0.7rem] custom-2500:py-[1rem] custom-3500:py-[1.5rem]
									custom-2500:mt-[4rem] custom-3500:mt-[6rem]
									custom-2500:rounded-2xl
									custom-500:text-[1.7rem] custom-750:text-[2rem] custom-2500:text-[3rem] custom-3500:text-[4rem]"
							>
								Regístrate
							</button>
						) : (
							<button
								type="submit"
								disabled
								className="w-[96%] text-[1.5rem] py-[0.58rem] m-[2rem_auto] shadow-md rounded-lg font-sans text-black cursor-pointer font-bold bg-brandingYellow hover:bg-opacity-80 transition-all
									custom-500:w-[80%] custom-900:w-[60%] custom-1200:w-[48.45%]
									custom-900:py-[0.7rem] custom-2500:py-[1rem] custom-3500:py-[1.5rem]
									custom-2500:mt-[4rem] custom-3500:mt-[6rem]
									custom-2500:rounded-2xl
									custom-500:text-[1.7rem] custom-750:text-[2rem] custom-2500:text-[3rem] custom-3500:text-[4rem]"
							>
								Regístrate
							</button>
						)}

						<div className="flex flex-wrap justify-center items-baseline w-full">
							<p
								className="text-[1.4rem] drop-shadow-smallText
								custom-500:text-[1.6rem] custom-2500:text-[2rem] custom-3500:text-[2.5rem]"
							>
								Si ya estás registrado, por favor
							</p>
							<p
								onClick={handleLoginClick}
								className="ml-[0.5rem] text-[2rem] text-brandingLightGreen font-loginFont hover:drop-shadow-smallText
									custom-2500:ml-[1rem]
									custom-500:text-[2.2rem] custom-2500:text-[2.5rem] custom-3500:text-[3.3rem]"
								role="button"
							>
								Inicia Sesión
							</p>
						</div>
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
	);
});

export default Register;
