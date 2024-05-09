import { useRef, useState } from "react";
import Button from "../../components/button/Button";
import { ButtonColorType } from "../../components/button/buttonTypes";
import { LoginFormValuesType, RegiserFormFieldsToSendType } from "../../components/forms/formsTypes";
import Header from "../../components/header/Header";
import { registerUser } from "../../interfaces/registerUser";
import { logInUser } from "../../interfaces/logInUser";
import { UserDataType } from "../commonTypes";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { getStoredToken } from "../../utils/getStoredToken";
import { createPublication } from "../../interfaces/createPublication";
import { PlantationDemoType } from "./plantationsDemoData";
import { updateUserData } from "../../utils/updateUserData";

type RegisterUserStateType = "init" | "usersOk" | "usersKo";
type CreatePublicationsType = "init" | "publicationsOk" | "publicationsKo";
type loginUserType = "init" | "loginUser" | "loginProducer" | "loginAdmin" |"loginKo";

function Management() {
	const { setUserRole } = useUserRoleContext();
	const [registerUserState, setRegisterUserState] = useState<RegisterUserStateType>("init");
	const [createPublicationsState, setCreatePublicationsState] = useState<CreatePublicationsType>("init");
	const [loginUserState, setLoginUserState] = useState<loginUserType>("init");

	const buttonColorYellow: ButtonColorType = "yellow";
	const buttonColorGreen: ButtonColorType = "green";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-[250px]";
	const buttonWidthSmall = "w-[180px]";
	const buttonPaddingY = "py-3.5";
	const buttonPaddingYSmall = "py-1.5";

	const createUsersFuncionality = {
		actionText: "Crear Usuarios",
		handleClick: createUsers
	};

	const createPublicationsFuncionality = {
		actionText: "Crear Publicaciones",
		handleClick: createPublications
	};

	const loginAsUserFuncionality = {
		actionText: "Logar Usuario",
		handleClick: loginAsUser
	};

	const loginAsProducerFuncionality = {
		actionText: "Logar Productor",
		handleClick: loginAsProducer
	};

	const loginAsAdminFuncionality = {
		actionText: "Logar Admin",
		handleClick: loginAsAdmin
	};

	const axiosController1 = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();

	const userData: RegiserFormFieldsToSendType = {
		email: "pedritoaldas2@gmail.com",
		password: "oem$TP5",
		name: "Pedro",
		lastname: "Salas Díaz",
		address: "Soto del Real, Madrid"
	};

	const userDataJson = JSON.stringify(userData);

	const producerData: RegiserFormFieldsToSendType = {
		email: "lorenita16tat@gmail.com",
		password: "A%ldo1se",
		name: "Lorena",
		lastname: "Aldán López",
		address: "Soto del Real, Madrid"
	};

	const producerDataJson = JSON.stringify(producerData);

	const adminData: RegiserFormFieldsToSendType = {
		email: "antoniolopez12@gmail.com",
		password: "Tut$oms6",
		name: "Antonio",
		lastname: "Gómez Cedán",
		address: "Soto del Real, Madrid"
	};

	const adminDataJson = JSON.stringify(adminData);




	function createUsers () {
		axiosController1.current = new AbortController();

		registerUser(userDataJson, axiosController1.current!)
			.then(() => {

				registerUser(producerDataJson, axiosController1.current!)
					.then(() => {

						registerUser(adminDataJson, axiosController1.current!)
							.then(() => {
								setRegisterUserState("usersOk");
							})
							.catch((error: Error) => {
								console.log(error);
								setRegisterUserState("usersKo");
							});
				
					})
					.catch((error: Error) => {
						console.log(error);
						setRegisterUserState("usersKo");
					});

			})
			.catch((error: Error) => {
				console.log(error);
				setRegisterUserState("usersKo");
			});
	}


	function loginAsUser () {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: userData.email,
			password: userData.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				setLoginUserState("loginUser");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKo");
			});
	}


	function loginAsProducer () {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: producerData.email,
			password: producerData.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				setLoginUserState("loginProducer");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKo");
			});
	}


	function loginAsAdmin () {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: adminData.email,
			password: adminData.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				setLoginUserState("loginAdmin");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKo");
			});
	}


	function createPublications () {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: adminData.email,
			password: adminData.password
		};
		const loginDataJson = JSON.stringify(loginData);

		//Nos logamos como admin.
		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
			})
			.catch((error: Error) => {
				console.log(error);
				setCreatePublicationsState("publicationsKo");
			});
		
		//Creamos las publicaciones.
		const storedToken = getStoredToken();
		console.log(storedToken);
		const publicationData = {
			"title": "prueba",
			"plantation": {
				"id": 111,
				"plantType": "pepino",
				"seasson": "verano",
				"waterAmount": 1500,
				"details": "Siempre es verano, con el pepino en la mano"
			},
			"visibility": true,
			"score": 7
		};
		const publicationDataJson: Stringified<PlantationDemoType> = JSON.stringify(publicationData);
		
		createPublication(storedToken!, publicationDataJson, axiosController2.current)
			.then( () => {
				setCreatePublicationsState("publicationsOk");
			})
			.catch( (error) => {
				console.log(error);
				setCreatePublicationsState("publicationsKo");
			});


	}


	return (
		<div className="w-full pb-20 bg-brandingLightYellow">
			<div className="w-full" >
				<Header />
			</div>

			<div className="relative flex flex-col items-start w-full pl-28 mt-12 font-sans">
				<Button buttonColor={buttonColorYellow} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={createUsersFuncionality} />
				
				<div className="relative p-8">
					<div className="mb-4">
						<p className="text-brandingDarkGreen">Admin: </p>
						<p className="">Email:	<span className="font-bold">antoniolopez12@gmail.com</span></p>
						<p className="">Contraseña:   <span className="font-bold">Tut$oms6</span></p>
					</div>

					<div className="relative my-6">
						<Button buttonColor={buttonColorGreen} buttonFontSize={buttonFontSize} buttonWidth={buttonWidthSmall} buttonPaddingY={buttonPaddingYSmall} buttonFuncionality={loginAsAdminFuncionality} />
						<div className="absolute bottom-4 right-[110%] font-bold">
							{
								loginUserState === "loginAdmin" && <p className="">Logado como Administrador</p>
							}
						</div>
					</div>

					<div className="my-6">
						<p className="text-brandingDarkGreen">Productor: </p>
						<p className="">Email:	<span className="font-bold">lorenita16tat@gmail.com</span></p>
						<p className="">Contraseña:   <span className="font-bold">A%ldo1se</span></p>
					</div>

					<div className="relative my-6">
						<Button buttonColor={buttonColorGreen} buttonFontSize={buttonFontSize} buttonWidth={buttonWidthSmall} buttonPaddingY={buttonPaddingYSmall} buttonFuncionality={loginAsProducerFuncionality} />
						<div className="absolute bottom-4 right-[110%] font-bold">
							{
								loginUserState === "loginProducer" && <p className="">Logado como Productor</p>
							}

							{
								loginUserState === "loginKo" && <p className="">¡Error al logar!</p>
							}
						</div>
					</div>

					<div className="">
						<p className="text-brandingDarkGreen">Usuario: </p>
						<p className="">Email:	<span className="font-bold">pedritoaldas2@gmail.com</span></p>
						<p className="">Contraseña:   <span className="font-bold">oem$TP5</span></p>
					</div>

					<div className="relative my-6">
						<Button buttonColor={buttonColorGreen} buttonFontSize={buttonFontSize} buttonWidth={buttonWidthSmall} buttonPaddingY={buttonPaddingYSmall} buttonFuncionality={loginAsUserFuncionality} />
						<div className="absolute bottom-4 right-[110%] font-bold">
							{
								loginUserState === "loginUser" && <p className="">Logado como Usuario</p>
							}
						</div>
					</div>

					<div className="absolute top-[-17%] right-[-160%] w-[500px] p-4 border-2 border-solid border-brandingYellow rounded-xl">
						{
							registerUserState === "init" && <p className="font-bold">Primero crea a los usuarios, luego puedes logarlos y crear las publicaciones.</p>
						}

						{
							registerUserState === "usersOk" && (
								<>
									<p className="mb-4 font-bold underline">Script para asignar roles en MySql:</p>
									<p className="mb-1 font-montserrat">mysql -uroot -p</p>
									<p className="mb-2 font-montserrat">root</p>
									<p className="mb-1 font-montserrat">use agroplantationapp;</p>
									<p className="mb-1 font-montserrat">UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;USER&#39;) WHERE email = &#39;pedritoaldas2@gmail.com&#39;;</p>
									<p className="mb-1 font-montserrat">UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;PRODUCER&#39;) WHERE email = &#39;lorenita16tat@gmail.com&#39;;</p>
									<p className="mb-1 font-montserrat">UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;ADMIN&#39;) WHERE email = &#39;antoniolopez12@gmail.com&#39;;</p>
								</>
							)
						}

						{
							registerUserState === "usersKo" && <p className="">¡Error al registrar los usuarios!</p>
						}
					</div>
				</div>

				<Button buttonColor={buttonColorYellow} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={createPublicationsFuncionality} />
				<div className="absolute bottom-4 right-[40%] font-bold">
					{
						createPublicationsState === "publicationsOk" && <p className="">¡Publicaciones registradas correctamente!</p>
					}

					{
						createPublicationsState === "publicationsKo" && <p className="">¡Error al registrar las publicaciones!</p>
					}
				</div>
				
			</div>
		</div>
	);
}

export default Management;
