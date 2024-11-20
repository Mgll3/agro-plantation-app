import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { user } from "../../data/userData";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { checkOpenSession } from "../../interfaces/users/checkOpenSession";
import { getBestPublications } from "../../interfaces/getBestPublications";
import PublicationsPreviewList from "../../components/homeElements/publicationsList/PublicationsPreviewList";
import { UserDataType } from "./commonTypes";
import { getStoredToken } from "../../utils/getStoredToken";
import Footer from "../../components/footer/Footer";
import VisitorBanner from "../../components/homeElements/VisitorBanner";
import CallToAction from "../../components/homeElements/CallToAction";
import SocialNetworks from "../../components/homeElements/SocialNetworks";
import { getStoredName } from "../../utils/getStoredName";
import { PublicationType } from "../../components/homeElements/publicationsList/publicationsListTypes";
import Testimonials from "../../components/homeElements/Testimonials";
import UserBanner from "../../components/homeElements/UserBanner";
import ProducerBanner from "../../components/homeElements/ProducerBanner";
import { getStoredRole } from "../../utils/getStoredRole";
import { updateUserData } from "../../utils/updateUserData";
import { resetUserData } from "../../utils/resetUserData";
import styles from "./Home.module.scss";
import PublicationsPreviewMobile from "../../components/homeElements/publicationsList/PublicationsPreviewMobile";
import LoadingSmall from "../../components/modals/LoadingSmall";
import { Helmet } from "react-helmet";

type LoadingStateType = "loading" | "loaded" | "error";

// type ChartsDataType = {
// 	barChartData: BarChartDataType,
// 	lineChartData: LineChartDataType,
// 	mapChartData: MapChartDataType,
// }

type PublicationPreviewVersionType = "desktop" | "mobile";

export default function Home() {
	const publicationPreviewVersionInitValue = window.innerWidth > 500 ? "desktop" : "mobile";
	const { userRole, setUserRole } = useUserRoleContext();
	const [publicationsState, setPublicationsState] = useState<LoadingStateType>("loading");
	const [publicationPreviewVersion, setPublicationPreviewVersion] = useState<PublicationPreviewVersionType>(
		publicationPreviewVersionInitValue
	);
	// const [dashboardState, setDashboardState] = useState<LoadingStateType>("loading");

	const bestPublicationsArray = useRef<PublicationType[]>([]);
	// const chartsData = useRef<ChartsDataType>();
	const axiosController = useRef<AbortController>();
	let resetUserCredentialsTimer: number = 0;

	//Comprueba el ancho de pantalla actual y decide si debe mostrarse la versión "desktop" (list) o "mobile" (slider) de PublicationPreview
	function decidePublicationPreviewVersion() {
		if (window.innerWidth > 500) setPublicationPreviewVersion("desktop");
		else setPublicationPreviewVersion("mobile");
	}

	window.addEventListener("resize", decidePublicationPreviewVersion);

	// Se utiliza este Layout Effect para que se carguen por defecto el nombre y el rol del usuario del Local Storage, si existen.
	// Esto evita que la página "parpadee" cuando esta información se obtiene del servidor.
	// No obstante, si no coinciden la información almacenada y la del servidor, tiene prevalencia esta última y habrá un parpadeo cuando ésta se "imponga".
	useLayoutEffect(() => {
		const userStoredName = getStoredName();
		const userStoredRole = getStoredRole();

		if (userStoredName) {
			user.name = userStoredName;
		}

		if (userStoredRole) {
			setUserRole(userStoredRole);
		}
	});

	useEffect(() => {
		axiosController.current = new AbortController();

		const storedToken = getStoredToken();

		if (storedToken) {
			checkOpenSession(storedToken, axiosController.current)
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
						}, 3000);
					}
				});
		} else {
			resetUserData(setUserRole);
		}

		getBestPublications(axiosController.current)
			.then((bestPublicationsList: PublicationType[]) => {
				//filtramos la respuesta para eliminar las publicaciones que no están autorizadas por un admin.
				const approvedPublications: PublicationType[] = [];
				bestPublicationsList.map((element) => {
					if (element.authorizationStatus.state === "ACCEPTED") {
						approvedPublications.push(element);
					}
				});
				bestPublicationsArray.current = approvedPublications;
				setPublicationsState("loaded");
			})
			.catch(() => {
				setPublicationsState("error");
			});

		// getChartsData(axiosController.current)
		// 	.then((chartsDataResponse: ChartsDataType) => {
		// 		chartsData.current = chartsDataResponse;
		// 		setDashboardState("loaded");
		// 	})
		// 	.catch(() => {
		// 		setDashboardState("error");
		// 	});

		return () => {
			axiosController.current?.abort();
			window.removeEventListener("resize", decidePublicationPreviewVersion);
		};
	}, []);

	return (
		<>
			<Helmet>
				<title>Plant-In Home</title>
				<meta
					name="description"
					content="Descubre publicaciones de huertas ecológicas familiares, comunitarias y comerciales. Únete a Plant-in, vota por tus plantaciones favoritas y solicita ser parte de nuestra comunidad de productores."
				></meta>
				<meta name="robots" content="index, follow"></meta>
			</Helmet>

			<div className="w-full">
				<Header />
			</div>

			<main className={`${styles.main} flex flex-col items-center w-full`}>
				{userRole === "visitor" && (
					<div className="px-[7px] custom-420:px-[17px] custom-800:px-[40px] custom-1200:px-[80px] custom-1400:px-[159px] custom-1600:px-[14vw]">
						<VisitorBanner />
					</div>
				)}

				{userRole === "USER" && (
					<div className="w-full px-[7px] custom-420:px-[17px] custom-800:px-[40px] custom-1200:px-[80px] custom-1400:px-[103px] custom-1600:px-[17vw]">
						<UserBanner />
					</div>
				)}

				{userRole === "PRODUCER" || userRole === "PRODUCER_VIP" ? (
					<div className="w-full px-[7px] custom-420:px-[17px] custom-800:px-[40px] custom-1200:px-[80px] custom-1400:px-[120px] custom-1600:px-[17vw]">
						<ProducerBanner />
					</div>
				) : null}

				{publicationsState === "loading" && (
					<div className="my-[10vh] px-[10vw] text-center">
						<LoadingSmall />
					</div>
				)}

				{publicationsState === "error" && (
					<div
						className="mx-[7vw] mt-[7vh] mb-[5vh] p-[1rem] font-sans text-center bg-terciary150 rounded-xl border-[2px] border-black border-solid shadow-below-light
						custom-1400:mt-[12vh]
						custom-1400:mb-[2vh]
						custom-1400:p-[1.5rem]
						custom-1400:rounded-3xl"
					>
						<p
							className="text-[1.6rem] font-semibold
							custom-1400:text-[2rem] custom-1900:text-[2.5rem] custom-2500:text-[3.7rem]"
						>
							No se han podido cargar las publicaciones más votadas.
						</p>
						<p
							className="mt-2 text-[1.4rem] font-semibold
							custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3.2rem]"
						>
							Tenga en cuenta que el Servidor de Pruebas puede tardar un par de minutos en iniciarse.
						</p>
						<p
							className="mt-2 text-[1.4rem]
							custom-1400:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3.2rem]"
						>
							Por favor, compruebe su conexión y refresque la página.
						</p>
					</div>
				)}

				{publicationsState === "loaded" && publicationPreviewVersion === "desktop" && (
					<div
						className="w-full px-[3vw] py-[10vh]
						custom-1400:px-[10.15vw] custom-2500:px-[15vw]
						custom-1400:py-[9.8vh]"
					>
						<PublicationsPreviewList bestPublicationsArray={bestPublicationsArray.current} />
					</div>
				)}

				{publicationsState === "loaded" && publicationPreviewVersion === "mobile" && (
					<div className="w-full py-[3.2rem]">
						<PublicationsPreviewMobile bestPublicationsArray={bestPublicationsArray.current} />
					</div>
				)}

				{userRole === "visitor" && (
					<div className="w-full pt-[2rem] custom-1000:pt-[4.8rem] custom-1400:pt-[8.8rem]">
						<CallToAction />
					</div>
				)}

				{/* <div className={styles.dashboardContainer}>
					{
						dashboardState === "loading" && (
							<div className={styles.dashboardLoadingContainer}>
								<img alt="Cargando..." src="icons/loading.gif" className={styles.loadingIcon} />
							</div>
						)
					}

					{
						dashboardState === "error" && (
							<div className={styles.dashboardErrorContainer}>
								<p className={styles.dashboardErrorFirstParagraph}>No se ha podido cargar el dashboard.</p>
								<p className={styles.dashboardErrorSecondParagraph}>Por favor, compruebe su conexión y refresque la página.</p>
							</div>
						)
					}

					{
						dashboardState === "loaded" && (
							<>
								<div className={styles.barChartDataCompContainer}>
									<ChartBar barChartData={chartsData.current?.barChartData!} />
								</div>

								<div className={styles.lineChartDataCompContainer}>
									<ChartLine lineChartData={chartsData.current?.lineChartData!} />
								</div>

								<div className={styles.mapChartDataCompContainer}>
									<ChartMap mapChartData={chartsData.current?.mapChartData!} />
								</div>
							</>
						)
					}
				</div> */}

				<div
					className={`px-[1.434rem] mt-[3.2rem] ${userRole !== "visitor" && "pt-[0.8rem] pb-[1.6rem] bg-terciary300"}
					custom-900:px-[4rem] custom-1000:px-[8rem] custom-1200:px-[10rem] custom-1400:px-[13.156rem] custom-1600:px-[15vw]
					custom-1400:mt-[8.8rem]
					${userRole !== "visitor" && "custom-600:pt-[1.4rem] custom-600:pb-[2.6rem] custom-1200:pt-[2rem] custom-1200:pb-[4rem] custom-1400:pt-[2.4rem] custom-1400:pb-[4.4rem]"}`}
				>
					<Testimonials />
				</div>

				<div
					className="w-full px-[10px] mt-[3.2rem]
					custom-600:mt-[6rem] custom-1000:mt-[8rem] custom-1400:mt-[10.5rem] custom-1900:mt-[15rem] custom-2500:mt-[22rem] custom-3000:mt-[27rem]"
				>
					<SocialNetworks />
				</div>
			</main>

			<Footer />
		</>
	);
}
