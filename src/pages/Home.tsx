import { useEffect, useLayoutEffect, useRef, useState } from "react"; {/*useState*/ }
import Header from "../components/header/Header";
import { user } from "../data/userData";
import { useUserRoleContext } from "../context/UserRoleContext";
import { checkOpenSession } from "../interfaces/checkOpenSession";
import { getBestPublications } from "../interfaces/getBestPublications";
import PublicationsPreviewList from "../components/publicationsList/PublicationsPreviewList";
import { UserDataType } from "./commonTypes";
import { getStoredToken } from "../utils/getStoredToken";
import Footer from "../components/footer/Footer";
import VisitorBanner from "../components/homeElements/VisitorBanner";
import CallToAction from "../components/homeElements/CallToAction";
import SocialNetworks from "../components/homeElements/SocialNetworks";
import { getStoredName } from "../utils/getStoredName";
import { storeName } from "../utils/storeName";
import { PublicationType } from "../components/publicationsList/publicationsListTypes";
import Testimonials from "../components/homeElements/Testimonials";
import UserBanner from "../components/homeElements/UserBanner";
import ProducerBanner from "../components/homeElements/ProducerBanner";



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




	useLayoutEffect( () => {
		const userName = getStoredName();
		const token = getStoredToken();

		if (userName) {
			user.name = userName;
		}

		if (token) {
			setUserRole("USER");
		}
	});


	useEffect(() => {
		axiosController.current = new AbortController();

		const storedToken = getStoredToken();

		if (storedToken) {
			checkOpenSession(storedToken, axiosController.current)
				.then((userData: UserDataType) => {
					storeName(`${userData.name} ${userData.lastname}`);
					user.name = `${userData.name} ${userData.lastname}`;
					setUserRole(userData.userType);
				})
				.catch(() => {
					user.name = "";
					setUserRole("visitor");
				});
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
			<div className="w-full" >
				<Header />
			</div>

			<main className="w-full py-8">

				{
					userRole === "visitor" && (
						<div className="px-[10vw] pt-[3vh]">
							<VisitorBanner />
						</div>
					)
				}

				{
					userRole === "USER" && (
						<div className="px-[6vw] pt-[3vh]">
							<UserBanner />
						</div>
					)
				}

				{
					userRole === "PRODUCER" || userRole === "PRODUCER_VIP"
						? (
							<div className="px-[6vw] pt-[3vh]">
								<ProducerBanner />
							</div>
						)
						: null
				}
			
				{
					publicationsState === "loading" && (
						<div className="px-[10vw] text-center">
							<img alt="Cargando..." src="icons/loading.gif" className="" />
						</div>
					)
				}

				{
					publicationsState === "error" && (
						<div className="px-[10vw] py-20 font-sans text-center text-2xl">
							<p className="">No se han podido cargar las publicaciones más votadas.</p>
							<p className="mt-2 text-xl">Por favor, compruebe su conexión y refresque la página.</p>
						</div>
					)
				}

				{
					publicationsState === "loaded" && (
						<div className="w-full px-[10vw] py-[10vh]">
							<PublicationsPreviewList bestPublicationsArray={bestPublicationsArray.current} />
						</div>
					)
				}

				{
					userRole === "visitor" && (
						<div className="py-12">
							<CallToAction />
						</div>
					)
				}


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

				<div className="px-[10vw] pt-[3vh]">
					<Testimonials />
				</div>

				<div className="px-[10vw] mt-20 mb-0">
					<SocialNetworks />
				</div>

			</main>

			<Footer />
		</>
	);
}
