import { useRef, useState } from "react";
import Button from "../../components/button/Button";
import { ButtonColorType } from "../../components/button/buttonTypes";
import { LoginFormValuesType, RegiserFormFieldsToSendType } from "../../components/forms/formsTypes";
import Header from "../../components/header/Header";
import { registerUser } from "../../interfaces/registerUser";
import { logInUser } from "../../interfaces/logInUser";
import { UserDataType } from "../commonTypes";
import { storeToken } from "../../utils/storeToken";
import { storeName } from "../../utils/storeName";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { user } from "../../data/userData";
import { getStoredToken } from "../../utils/getStoredToken";
import { createPublication } from "../../interfaces/createPublication";
import { PlantationDemoType } from "./plantationsDemoData";

type RegisterUserStateType = "init" | "usersOk" | "usersKo";
type CreatePublicationsType = "init" | "publicationsOk" | "publicationsKo";

function Management() {
	const { setUserRole } = useUserRoleContext();
	const [registerUserState, setRegisterUserState] = useState<RegisterUserStateType>("init");
	const [createPublicationsState, setCreatePublicationsState] = useState<CreatePublicationsType>("init");

	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-[250px]";
	const buttonPaddingY = "py-3.5";

	const buttonFuncionality1 = {
		actionText: "Crear Usuarios",
		handleClick: createUsers
	};

	const buttonFuncionality2 = {
		actionText: "Crear Publicaciones",
		handleClick: createPublications
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


	function createPublications () {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: adminData.email,
			password: adminData.password
		};
		const loginDataJson = JSON.stringify(loginData);

		//Nos logamos como admin.
		logInUser(loginDataJson, axiosController2.current!)
			.then((UserDataResponse: UserDataType) => {
				storeToken(UserDataResponse.accessToken);
				storeName(`${UserDataResponse.name} ${UserDataResponse.lastname}`);
				user.name = `${UserDataResponse.name} ${UserDataResponse.lastname}`;
				setUserRole(UserDataResponse.userType);
			})
			.catch((error: Error) => {
				console.log(error);
				setCreatePublicationsState("publicationsKo");
			});
		
		//Creamos las publicaciones.
		const storedToken = getStoredToken();
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
		<div className="w-full h-[100vh] bg-brandingLightYellow">
			<div className="w-full" >
				<Header />
			</div>

			<div className="relative flex flex-col items-start w-full pl-28 mt-12 font-sans">
				<Button buttonColor={buttonColor} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={buttonFuncionality1} />
				
				<div className="relative p-8">
					<div className="mb-4">
						<p className="text-brandingDarkGreen">Admin: </p>
						<p className="">Email:	<span className="font-bold">antoniolopez12@gmail.com</span></p>
						<p className="">Contraseña:   <span className="font-bold">Tut$oms6</span></p>
					</div>

					<div className="mb-4">
						<p className="text-brandingDarkGreen">Productor: </p>
						<p className="">Email:	<span className="font-bold">lorenita16tat@gmail.com</span></p>
						<p className="">Contraseña:   <span className="font-bold">A%ldo1se</span></p>
					</div>

					<div className="">
						<p className="text-brandingDarkGreen">Usuario: </p>
						<p className="">Email:	<span className="font-bold">pedritoaldas2@gmail.com</span></p>
						<p className="">Contraseña:   <span className="font-bold">oem$TP5</span></p>
					</div>

					<div className="absolute top-[-17%] right-[-160%] w-[500px] p-4 border-2 border-solid border-brandingYellow rounded-xl">
						{
							registerUserState === "init" && <p className="font-bold">Primero registra a los usuarios, luego crea las publicaciones.</p>
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

				<Button buttonColor={buttonColor} buttonFontSize={buttonFontSize} buttonWidth={buttonWidth} buttonPaddingY={buttonPaddingY} buttonFuncionality={buttonFuncionality2} />
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
