import { useEffect, useLayoutEffect, useRef, useState } from "react";
{
	/*useState*/
}
import Header from "../components/header/Header";
import { user } from "../data/userData";
import { useUserRoleContext } from "../context/UserRoleContext";
import { checkOpenSession } from "../interfaces/users/checkOpenSession";
import { getBestPublications } from "../interfaces/getBestPublications";
import PublicationsPreviewList from "../components/publicationsList/PublicationsPreviewList";
import { UserDataType } from "./commonTypes";
import { getStoredToken } from "../utils/getStoredToken";
import Footer from "../components/footer/Footer";
import VisitorBanner from "../components/homeElements/VisitorBanner";
import CallToAction from "../components/homeElements/CallToAction";
import SocialNetworks from "../components/homeElements/SocialNetworks";
import { getStoredName } from "../utils/getStoredName";
import { PublicationType } from "../components/publicationsList/publicationsListTypes";
import Testimonials from "../components/homeElements/Testimonials";
import UserBanner from "../components/homeElements/UserBanner";
import ProducerBanner from "../components/homeElements/ProducerBanner";
import { getStoredRole } from "../utils/getStoredRole";
import { updateUserData } from "../utils/updateUserData";
import { resetUserData } from "../utils/resetUserData";

type LoadingStateType = "loading" | "loaded" | "error";

// type ChartsDataType = {
// 	barChartData: BarChartDataType,
// 	lineChartData: LineChartDataType,
// 	mapChartData: MapChartDataType,
// }

export default function Home() {
	const { userRole, setUserRole } = useUserRoleContext();
	const [publicationsState, setPublicationsState] = useState<LoadingStateType>("loading");
	// const [dashboardState, setDashboardState] = useState<LoadingStateType>("loading");

	const bestPublicationsArray = useRef<PublicationType[]>([]);
	// const chartsData = useRef<ChartsDataType>();
	const axiosController = useRef<AbortController>();
	let resetUserCredentialsTimer: number = 0;

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
						}, 1400);
					}
				});
		} else {
			resetUserData(setUserRole);
		}

		getBestPublications(axiosController.current)
			.then((bestPublicationsList: PublicationType[]) => {
				bestPublicationsArray.current = bestPublicationsList;
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
		};
	}, []);

	return (
		<>
			<div className="w-full">
				<Header />
			</div>

			<main className="flex flex-col items-center w-full py-[20px]">
				{userRole === "visitor" && (
					<div className="px-[4vw]">
						<VisitorBanner />
					</div>
				)}

				{userRole === "USER" && (
					<div className="">
						<UserBanner />
					</div>
				)}

				{userRole === "PRODUCER" || userRole === "PRODUCER_VIP" ? (
					<div className="px-[7.8vw] pt-[3vh]">
						<ProducerBanner />
					</div>
				) : null}

				{publicationsState === "loading" && (
					<div className="px-[10vw] text-center">
						<img alt="Cargando..." src="icons/loading.gif" className="" />
					</div>
				)}

				{publicationsState === "error" && (
					<div className="px-[10vw] py-20 font-sans text-center text-3xl">
						<p className="">No se han podido cargar las publicaciones más votadas.</p>
						<p className="mt-2 text-2xl">Por favor, compruebe su conexión y refresque la página.</p>
					</div>
				)}

				{publicationsState === "loaded" && (
					<div className="w-full px-[12.15vw] py-[10vh]">
						<PublicationsPreviewList bestPublicationsArray={bestPublicationsArray.current} />
					</div>
				)}

				{userRole === "visitor" && (
					<div className="py-12">
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

				<div className={`px-[2rem] md:px-[8.4rem] pt-[2.4rem] pb-[4.4rem] ${userRole !== "visitor" && "bg-terciary300"}`}>
					<Testimonials />
				</div>

				<div className="my-[8.8rem]">
					<SocialNetworks />
				</div>
			</main>

			<Footer />
		</>
	);
}
