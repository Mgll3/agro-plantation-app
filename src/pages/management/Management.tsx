import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { ButtonColorType } from "../../components/button/buttonTypes";
import Header from "../../components/header/Header";
import { registerUser } from "../../interfaces/users/registerUser";
import { LoginFormValuesType, RegiserFormFieldsToSendType } from "../../components/forms/formsTypes";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { logInUser } from "../../interfaces/users/logInUser";
import { UserDataType } from "../commonTypes";
import { updateUserData } from "../../utils/updateUserData";
import { getStoredToken } from "../../utils/getStoredToken";
import { PlantationDemoType, PlantationsDemoDataType, publicationsDemoData } from "./publicationsDemoData";
import { createPublication } from "../../interfaces/createPublication";
import { storePublicationsDemoIds } from "./storePublicationsDemoIds";
import { getPublicationsDemoIds } from "./getPublicationsDemoIds";
import { deletePublication } from "../../interfaces/deletePublication";
import { erasePublicationsDemoIds } from "./erasePublicationsDemoIds";
import { checkOpenSession } from "../../interfaces/users/checkOpenSession";
import { resetUserData } from "../../utils/resetUserData";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { uploadPublicationsImages } from "../../interfaces/uploadPublicationsImages";
import { mainImgMockArray, secondImgMockArray } from "./publicationsMockImages/publicationsImagesData";
import generateRandomNumber from "../../utils/generateRandomNumber";

type RegisterUserStateType = "init" | "usersOk" | "usersKo";
type loginUserType =
	| "init"
	| "loginUser"
	| "loginProducer"
	| "loginAdmin"
	| "loginKoUser"
	| "loginKoProducer"
	| "loginKoAdmin";
type CreatePublicationsType = "init" | "publicationsOk" | "publicationsKo" | "noToken";
type DeletePublicationsStateType = "init" | "noPublications" | "deletedOk" | "deletedKo" | "noToken";

export default function Management() {
	const { userRole, setUserRole } = useUserRoleContext();
	const [registerUserState, setRegisterUserState] = useState<RegisterUserStateType>("init");
	const [loginUserState, setLoginUserState] = useState<loginUserType>("init");
	const [createPublicationsState, setCreatePublicationsState] = useState<CreatePublicationsType>("init");
	const [deletePublicationsState, setDeletePublicationsState] = useState<DeletePublicationsStateType>("init");
	const [areTherePublicationsToDelete, setAreTherePublicationsToDelete] = useState(false);
	const [rerender, setRerender] = useState(false);

	function reRenderComponent() {
		setRerender(!rerender);
	}

	const publicationsIdsToStore = useRef<number[]>([]);
	const mainImgMockArrayPosition = useRef<number>(0); //Guarda la posición en el array de la última imagen principal utilizada, para usar la siguiente y no volver a usarla.

	const publicationsToPublish: PlantationsDemoDataType = publicationsDemoData;
	let resetUserCredentialsTimer: number = 0;

	const axiosController1 = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();
	const axiosController3 = useRef<AbortController>();
	const axiosController4 = useRef<AbortController>();
	const axiosController5 = useRef<AbortController>();

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

	function closeCodeAid() {
		setRegisterUserState("init");
	}

	const closeCreateUsersAidFuncionality = {
		actionText: "Cerrar",
		handleClick: closeCodeAid
	};

	function create5Publications() {
		createPublications(5);
	}

	const create5PublicationsFuncionality = {
		actionText: "Crear 5 Publicaciones",
		handleClick: create5Publications
	};

	function create10Publications() {
		createPublications(10);
	}

	const create10PublicationsFuncionality = {
		actionText: "Crear 10 Publicaciones",
		handleClick: create10Publications
	};

	function createAllPublications() {
		createPublications(publicationsToPublish.length);
	}

	const createAllPublicationsFuncionality = {
		actionText: `Crear Todas Las Publicaciones (${publicationsToPublish.length})`,
		handleClick: createAllPublications
	};

	const deletePublicationsFuncionality = {
		actionText: "Borrar Publicaciones",
		handleClick: deletePublications
	};

	const loginAsUser1Funcionality = {
		actionText: "Logar Usuario",
		handleClick: loginAsUser1
	};

	const loginAsUser2Funcionality = {
		actionText: "Logar Usuario",
		handleClick: loginAsUser2
	};

	const loginAsProducer1Funcionality = {
		actionText: "Logar Productor",
		handleClick: loginAsProducer1
	};

	const loginAsProducer2Funcionality = {
		actionText: "Logar Productor",
		handleClick: loginAsProducer2
	};

	const loginAsProducer3Funcionality = {
		actionText: "Logar Productor",
		handleClick: loginAsProducer3
	};

	const loginAsAdmin1Funcionality = {
		actionText: "Logar Admin",
		handleClick: loginAsAdmin1
	};

	////////////////////////////////////////////////////////////////////////////   DATOS DE LOS USUARIOS

	const user1Data: RegiserFormFieldsToSendType = {
		email: "pedritoaldas2@gmail.com",
		password: "oem$TP5",
		name: "Pedro",
		lastname: "Salas Díaz",
		address: "Soto del Real, Madrid"
	};

	const user1DataJson = JSON.stringify(user1Data);

	const user2Data: RegiserFormFieldsToSendType = {
		email: "velezmarcocontacto@gmail.com",
		password: "fito$TP6",
		name: "Marcos",
		lastname: "Vélez Sando",
		address: "Manzanares, Madrid"
	};

	const user2DataJson = JSON.stringify(user2Data);

	const producer1Data: RegiserFormFieldsToSendType = {
		email: "lorenita16tat@gmail.com",
		password: "A%ldo1se",
		name: "Lorena",
		lastname: "Aldán López",
		address: "Calle Marte 25, Soto del Real, Madrid"
	};

	const producer1DataJson = JSON.stringify(producer1Data);

	const producer2Data: RegiserFormFieldsToSendType = {
		email: "gabymoratrabajo@gmail.com",
		password: "A%lco6$e",
		name: "Gabriel",
		lastname: "Mora Ruiz",
		address: "Avenida Pedriza 6, Manzanares el Real, Madrid"
	};

	const producer2DataJson = JSON.stringify(producer2Data);

	const producer3Data: RegiserFormFieldsToSendType = {
		email: "sanchezangelbarraco@gmail.com",
		password: "A%lco6$e",
		name: "Angel",
		lastname: "Sánchez Márquez",
		address: "Calle Magallanes 5, Colmenar Viejo, Madrid"
	};

	const producer3DataJson = JSON.stringify(producer3Data);

	const admin1Data: RegiserFormFieldsToSendType = {
		email: "antoniolopez12@gmail.com",
		password: "Tut$oms6",
		name: "Antonio",
		lastname: "Gómez Cedán",
		address: "Avenida del Rosal 2, Navacerrada, Madrid"
	};

	const admin1DataJson = JSON.stringify(admin1Data);

	const usersArray = [
		user1DataJson,
		user2DataJson,
		producer1DataJson,
		producer2DataJson,
		producer3DataJson,
		admin1DataJson
	];

	////////////////////////////////////////////////////////////////////////////   DATOS DE LOS USUARIOS - FIN

	const textToCopy1 = "mysql -uroot -p";

	const textToCopy2 = `use agroplantationapp;

	UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = 'USER') WHERE email = 'pedritoaldas2@gmail.com';
	
	UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = 'USER') WHERE email = 'velezmarcocontacto@gmail.com';
	
	UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = 'PRODUCER') WHERE email = 'lorenita16tat@gmail.com';
	
	UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = 'PRODUCER') WHERE email = 'gabymoratrabajo@gmail.com';
	
	UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = 'PRODUCER') WHERE email = 'sanchezangelbarraco@gmail.com';
	
	UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = 'ADMIN') WHERE email = 'antoniolopez12@gmail.com';`;
	function copyToClipboard1() {
		navigator.clipboard.writeText(textToCopy1);
	}

	function copyToClipboard2() {
		navigator.clipboard.writeText(textToCopy2);
	}

	////////////////////////////////////////////////////////////////////////////   FUNCIONES PARA LOGAR A LOS DISTINTOS USUARIOS

	function loginAsUser1() {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: user1Data.email,
			password: user1Data.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				reRenderComponent();
				setLoginUserState("loginUser");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKoUser");
			});
	}

	function loginAsUser2() {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: user2Data.email,
			password: user2Data.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				reRenderComponent();
				setLoginUserState("loginUser");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKoUser");
			});
	}

	function loginAsProducer1() {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: producer1Data.email,
			password: producer1Data.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				reRenderComponent();
				setLoginUserState("loginProducer");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKoProducer");
			});
	}

	function loginAsProducer2() {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: producer2Data.email,
			password: producer2Data.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				reRenderComponent();
				setLoginUserState("loginProducer");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKoProducer");
			});
	}

	function loginAsProducer3() {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: producer3Data.email,
			password: producer3Data.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				reRenderComponent();
				setLoginUserState("loginProducer");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKoProducer");
			});
	}

	function loginAsAdmin1() {
		axiosController2.current = new AbortController();
		const loginData: LoginFormValuesType = {
			email: admin1Data.email,
			password: admin1Data.password
		};
		const loginDataJson = JSON.stringify(loginData);

		logInUser(loginDataJson, axiosController2.current!)
			.then((userDataResponse: UserDataType) => {
				updateUserData(userDataResponse, setUserRole);
				reRenderComponent();
				setLoginUserState("loginAdmin");
			})
			.catch((error: Error) => {
				console.log(error);
				setLoginUserState("loginKoAdmin");
			});
	}

	////////////////////////////////////////////////////////////////////////////   FUNCIONES PARA LOGAR A LOS DISTINTOS USUARIOS - FIN

	function createUsers() {
		axiosController1.current = new AbortController();
		const usersToCreateNumber = usersArray.length;
		let finishedAttemps = 0;
		let createdUsersNumber = 0;

		usersArray.map((user) => {
			registerUser(user, axiosController1.current!)
				.then(() => {
					finishedAttemps++;
					createdUsersNumber++;

					if (finishedAttemps === usersToCreateNumber && createdUsersNumber === usersToCreateNumber) {
						setRegisterUserState("usersOk");
					}
				})
				.catch((error: Error) => {
					console.log(error);
					finishedAttemps++;

					if (finishedAttemps === usersToCreateNumber && createdUsersNumber < usersToCreateNumber) {
						setRegisterUserState("usersKo");
					}
				});
		});
	}

	function createPublications(ammount: number) {
		axiosController2.current = new AbortController();
		const storedToken = getStoredToken();
		let finishedAttemps = 0;
		let createdPublicationsNumber = 0;
		const storedPublicationsIdStringify = getPublicationsDemoIds();

		if (storedPublicationsIdStringify) {
			publicationsIdsToStore.current = JSON.parse(storedPublicationsIdStringify);
		}

		if (userRole !== "visitor" && userRole !== "USER" && storedToken) {
			for (let i = 0; i < ammount; i++) {
				const publicationDataJson: Stringified<PlantationDemoType> = JSON.stringify(publicationsToPublish[i]);

				createPublication(storedToken!, publicationDataJson, axiosController2.current!)
					.then((response) => {
						finishedAttemps++;
						createdPublicationsNumber++;
						publicationsIdsToStore.current.push(response.id!);
						uploadImages(storedToken, response.id);

						if (finishedAttemps === ammount && createdPublicationsNumber === ammount) {
							const publicationsIdsToStoreJSON = JSON.stringify(publicationsIdsToStore.current);
							storePublicationsDemoIds(publicationsIdsToStoreJSON);
							setCreatePublicationsState("publicationsOk");
							setDeletePublicationsState("init");
							setAreTherePublicationsToDelete(true);
							publicationsIdsToStore.current = [];
						}
					})
					.catch((error) => {
						finishedAttemps++;
						console.log(error);

						if (finishedAttemps === ammount && createdPublicationsNumber < ammount) {
							const publicationsIdsToStoreJSON = JSON.stringify(publicationsIdsToStore.current);
							storePublicationsDemoIds(publicationsIdsToStoreJSON);
							setCreatePublicationsState("publicationsKo");
							setDeletePublicationsState("init");
							publicationsIdsToStore.current = [];
						}
					});
			}
		} else {
			setCreatePublicationsState("noToken");
		}
	}

	async function fetchImageAsBlob(url: string) {
		const response = await fetch(url);
		const blob = await response.blob();
		return blob;
	}

	async function uploadImages(token: string, publicationId: number) {
		axiosController5.current = new AbortController();
		const formData = new FormData();
		const publicationIdString = String(publicationId);

		if (mainImgMockArrayPosition.current >= mainImgMockArray.length - 1) {
			mainImgMockArrayPosition.current = 0;
		} else {
			mainImgMockArrayPosition.current++;
		}

		// Preparamos los datos de la imagen principal.
		const mainImgMockName = mainImgMockArray[mainImgMockArrayPosition.current].name;

		const mainImgMockUrl = mainImgMockArray[mainImgMockArrayPosition.current].url;

		const mainImgBlob = await fetchImageAsBlob(mainImgMockUrl);

		formData.append("mainImage", mainImgBlob, mainImgMockName);
		formData.append("publicationId", publicationIdString);

		//Preparamos los datos de las publicaciones secundarias
		//A cada publicación vamos a añadirle un número aleatorio de imágenes secundarias:
		const randomNumberOfImgs = generateRandomNumber(1, secondImgMockArray.length - 1);

		if (randomNumberOfImgs > 0) {
			for (let i = 0; i <= randomNumberOfImgs; i++) {
				const secondaryImgMockName = secondImgMockArray[i].name;
				const secondaryImgMockUrl = secondImgMockArray[i].url;
				const secondaryImgMockBlob = await fetchImageAsBlob(secondaryImgMockUrl);

				formData.append("images", secondaryImgMockBlob, secondaryImgMockName);
			}
		}

		uploadPublicationsImages(token, formData, axiosController5.current)
			.then(() => {
				return "OK";
			})
			.catch((error) => {
				console.log(`Error al subir las imágenes de la publicación ${publicationId}: ${error}`);
			});
	}

	function deletePublications() {
		axiosController3.current = new AbortController();
		const storedToken = getStoredToken();
		let deletingError = false;
		const publicationsToDeleteIdsStringify = getPublicationsDemoIds();
		let publicationsToDeleteIds: number[];

		if (publicationsToDeleteIdsStringify && storedToken) {
			publicationsToDeleteIds = JSON.parse(publicationsToDeleteIdsStringify);

			publicationsToDeleteIds.map((id) => {
				if (!deletingError) {
					deletePublication(storedToken, id, axiosController3.current!)
						.then(() => {})
						.catch((error) => {
							deletingError = true;
							console.log(error);
						});
				} else {
					setDeletePublicationsState("deletedKo");
				}
			});

			if (!deletingError) {
				erasePublicationsDemoIds();
				setDeletePublicationsState("deletedOk");
				setAreTherePublicationsToDelete(false);
			} else {
				setDeletePublicationsState("deletedKo");
			}
		} else {
			if (!publicationsToDeleteIdsStringify) setDeletePublicationsState("noPublications");
			if (!storedToken) setDeletePublicationsState("noToken");
		}
	}

	useEffect(() => {
		const publicationsToDeleteIdsStringify = getPublicationsDemoIds();

		if (publicationsToDeleteIdsStringify) {
			setAreTherePublicationsToDelete(true);
		} else {
			setAreTherePublicationsToDelete(false);
		}

		return () => {
			axiosController1.current?.abort;
			axiosController2.current?.abort;
			axiosController3.current?.abort;
		};
	}, []);

	useEffect(() => {
		axiosController4.current = new AbortController();

		const storedToken = getStoredToken();

		if (storedToken) {
			checkOpenSession(storedToken, axiosController4.current)
				.then((userData: UserDataType) => {
					clearTimeout(resetUserCredentialsTimer);
					updateUserData(userData, setUserRole);
				})
				.catch((error) => {
					if (error === "401") {
						resetUserData(setUserRole);
					} else {
						resetUserCredentialsTimer = window.setTimeout(() => {
							resetUserData(setUserRole);
						}, 1400);
					}
				});
		}

		return () => {
			axiosController4.current?.abort();
		};
	}, []);

	return (
		<div className="w-full pb-20 bg-brandingLightYellow">
			<div className="w-full">
				<Header />
			</div>

			<div className="flex flex-col items-center py-[5vh] px-[5vw] w-[100%] font-sans">
				<h1 className="text-[34px] font-bold">Administración</h1>

				<h2 className="font-semibold text-[24px] my-[5vh]">Crear Usuarios</h2>

				{/* ///////////////////////////////  CREAR USUARIOS  ////////////////////////////////// */}

				<div className="relative">
					<Button
						buttonColor={buttonColorYellow}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={createUsersFuncionality}
					/>

					<div className="z-50 absolute flex flex-col items-center top-[-55vh] right-[-12vw] w-[660px] p-4 border-2 border-solid border-brandingYellow rounded-xl bg-white">
						{registerUserState === "init" && (
							<p>Primero crea los Usuarios. Luego puedes logarlos y crear publicaciones</p>
						)}

						{registerUserState === "usersOk" && (
							<div className="relative flex flex-col items-center">
								<div
									onClick={copyToClipboard1}
									className="absolute top-[0px] right-[0px] text-[35px] cursor-pointer hover:scale-125 active:opacity-30"
								>
									<ContentCopyTwoToneIcon fontSize="inherit" color="inherit" />
								</div>
								<p className="mb-4 font-bold underline">Script para asignar roles en MySql:</p>
								<p className="mb-1 font-montserrat">mysql -uroot -p</p>
								<p className="mb-1 font-montserrat">root</p>
								<p className="mb-4 font-montserrat">-----------------</p>
								<div className="relative p-4 pt-8 border border-brandingLightGreen border-solid">
									<div
										onClick={copyToClipboard2}
										className="absolute top-[0px] right-[0px] text-[35px] cursor-pointer hover:scale-125 active:opacity-30"
									>
										<ContentCopyTwoToneIcon fontSize="inherit" color="inherit" />
									</div>
									<p className="mb-1 font-montserrat">use agroplantationapp;</p>
									<p className="mb-1 font-montserrat">
										UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;USER&#39;) WHERE email =
										&#39;pedritoaldas2@gmail.com&#39;;
									</p>
									<p className="mb-1 font-montserrat">
										UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;USER&#39;) WHERE email =
										&#39;velezmarcocontacto@gmail.com&#39;;
									</p>
									<p className="mb-1 font-montserrat">
										UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;PRODUCER&#39;) WHERE
										email = &#39;lorenita16tat@gmail.com&#39;;
									</p>
									<p className="mb-1 font-montserrat">
										UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;PRODUCER&#39;) WHERE
										email = &#39;gabymoratrabajo@gmail.com&#39;;
									</p>
									<p className="mb-1 font-montserrat">
										UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;PRODUCER&#39;) WHERE
										email = &#39;sanchezangelbarraco@gmail.com&#39;;
									</p>
									<p className="mb-6 font-montserrat">
										UPDATE user SET user_type_id = (SELECT id FROM user_type WHERE type = &#39;ADMIN&#39;) WHERE email =
										&#39;antoniolopez12@gmail.com&#39;;
									</p>
								</div>
								<Button
									buttonColor={buttonColorGreen}
									buttonFontSize={buttonFontSize}
									buttonWidth={buttonWidthSmall}
									buttonPaddingY={buttonPaddingYSmall}
									buttonFuncionality={closeCreateUsersAidFuncionality}
								/>
							</div>
						)}

						{registerUserState === "usersKo" && <p className="font-bold">Error al Crear Usuarios!!!</p>}
					</div>
				</div>

				{/* /////////////////  LOGAR USUARIOS  ////////////////////// */}

				<h2 className="font-semibold text-[24px] mt-[6.5vh] mb-[5vh]">Logar Usuarios</h2>

				{/* ///////////  USUARIOS NORMALES  /////////// */}

				<h3 className="mb-4 text-[18px] font-semibold text-brandingDarkGreen">Usuarios</h3>

				<div className="relative flex justify-center gap-16 width-[100%]">
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-start">
							<p className="">
								Email: <span className="font-bold">pedritoaldas2@gmail.com</span>
							</p>
							<p className="mb-4">
								Contraseña: <span className="font-bold">oem$TP5</span>
							</p>
						</div>
						<Button
							buttonColor={buttonColorGreen}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidthSmall}
							buttonPaddingY={buttonPaddingYSmall}
							buttonFuncionality={loginAsUser1Funcionality}
						/>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-col items-start">
							<p className="">
								Email: <span className="font-bold">velezmarcocontacto@gmail.com</span>
							</p>
							<p className="mb-4">
								Contraseña: <span className="font-bold">fito$TP6</span>
							</p>
						</div>
						<Button
							buttonColor={buttonColorGreen}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidthSmall}
							buttonPaddingY={buttonPaddingYSmall}
							buttonFuncionality={loginAsUser2Funcionality}
						/>
					</div>

					{loginUserState === "loginUser" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">Logado Correctamente!!</p>
					)}

					{loginUserState === "loginKoUser" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">Error al Logar Usuario!!</p>
					)}
				</div>

				{/* ///////////  PRODUCTORES  /////////// */}

				<h3 className="mb-4 mt-16 text-[18px] font-semibold text-brandingDarkGreen">Productores</h3>

				<div className="relative flex justify-center gap-16 width-[100%]">
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-start">
							<p className="">
								Email: <span className="font-bold">lorenita16tat@gmail.com</span>
							</p>
							<p className="mb-4">
								Contraseña: <span className="font-bold">A%ldo1se</span>
							</p>
						</div>
						<Button
							buttonColor={buttonColorGreen}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidthSmall}
							buttonPaddingY={buttonPaddingYSmall}
							buttonFuncionality={loginAsProducer1Funcionality}
						/>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-col items-start">
							<p className="">
								Email: <span className="font-bold">gabymoratrabajo@gmail.com</span>
							</p>
							<p className="mb-4">
								Contraseña: <span className="font-bold">A%lco6$e</span>
							</p>
						</div>
						<Button
							buttonColor={buttonColorGreen}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidthSmall}
							buttonPaddingY={buttonPaddingYSmall}
							buttonFuncionality={loginAsProducer2Funcionality}
						/>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex flex-col items-start">
							<p className="">
								Email: <span className="font-bold">sanchezangelbarraco@gmail.com</span>
							</p>
							<p className="mb-4">
								Contraseña: <span className="font-bold">A%lco6$e</span>
							</p>
						</div>
						<Button
							buttonColor={buttonColorGreen}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidthSmall}
							buttonPaddingY={buttonPaddingYSmall}
							buttonFuncionality={loginAsProducer3Funcionality}
						/>
					</div>

					{loginUserState === "loginProducer" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">Logado Correctamente!!</p>
					)}

					{loginUserState === "loginKoProducer" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">Error al Logar Productor!!</p>
					)}
				</div>

				{/* ///////////  ADMINISTRADOR  /////////// */}

				<h3 className="mb-4 mt-16 text-[18px] font-semibold text-brandingDarkGreen">Administrador</h3>

				<div className="relative flex justify-center gap-16 width-[100%]">
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-start">
							<p className="">
								Email: <span className="font-bold">antoniolopez12@gmail.com</span>
							</p>
							<p className="mb-4">
								Contraseña: <span className="font-bold">Tut$oms6</span>
							</p>
						</div>
						<Button
							buttonColor={buttonColorGreen}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidthSmall}
							buttonPaddingY={buttonPaddingYSmall}
							buttonFuncionality={loginAsAdmin1Funcionality}
						/>
					</div>

					{loginUserState === "loginAdmin" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">Logado Correctamente!!</p>
					)}

					{loginUserState === "loginKoAdmin" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">Error al Logar Administrador!!</p>
					)}
				</div>

				{/* /////////////////////////////////////////  CREAR PUBLICACIONES  ////////////////////////////////////// */}

				<h2 className="font-semibold text-[24px] mt-[6.5vh] mb-[5vh]">Crear Publicaciones</h2>

				<div className="relative flex justify-center gap-20">
					<Button
						buttonColor={buttonColorYellow}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={create5PublicationsFuncionality}
					/>
					<Button
						buttonColor={buttonColorYellow}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={create10PublicationsFuncionality}
					/>
					<Button
						buttonColor={buttonColorYellow}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={createAllPublicationsFuncionality}
					/>

					{createPublicationsState === "publicationsKo" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">
							Error al Crear las Publicaciones!!!
						</p>
					)}

					{createPublicationsState === "noToken" && (
						<p className="absolute bottom-[-40px] font-semibold text-reddishBrown">
							No Hay un Productor o Administrador Logado!!!
						</p>
					)}
				</div>

				{/* /////////////////////////////////////////  BORRAR PUBLICACIONES  ////////////////////////////////////// */}

				<h2 className="font-semibold text-[24px] mt-[6.5vh] mb-[5vh]">Borrar Publicaciones</h2>

				{areTherePublicationsToDelete === true ? (
					<div className="relative flex justify-center gap-20">
						<Button
							buttonColor={buttonColorYellow}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={deletePublicationsFuncionality}
						/>
						{deletePublicationsState === "noPublications" && <p className="">¡No hay publicaciones para borrar!</p>}

						{deletePublicationsState === "deletedOk" && <p className="">¡Publicaciones borradas correctamente!</p>}

						{deletePublicationsState === "deletedKo" && <p className="">¡Error al borrar las publicaciones!</p>}

						{deletePublicationsState === "noToken" && <p className="">¡No hay un usuario logado!</p>}
					</div>
				) : (
					<p className="font-bold">No hay publicaciones para eliminar!!!</p>
				)}
			</div>
		</div>
	);
}
