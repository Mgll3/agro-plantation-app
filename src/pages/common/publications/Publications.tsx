import { useEffect, useRef, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import Viewer from "../../../components/common/publications/Viewer";
import NetworkError from "../../../components/modals/NetworkError";
import LoadingSmall from "../../../components/modals/LoadingSmall";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getStoredToken } from "../../../utils/getStoredToken";
import { getPublicationsByRandom } from "../../../interfaces/publicationsFilters/getPublicationsByRandom";
import {
	AdminPublicationsFilteredType,
	FilterType,
	FormattedPublicationsInfoType,
	PublicationInfoType
} from "../../../components/admin/adminTypes";
import { getPublicationsByUser } from "../../../interfaces/publicationsFilters/getPublicationsByUser";
import { getPublicationsByScore } from "../../../interfaces/publicationsFilters/getPublicationsByScore";
import { getPublicationsByDate } from "../../../interfaces/publicationsFilters/getPublicationsByDate";
import { getPublicationsByAmmount } from "../../../interfaces/publicationsFilters/getPublicationsByAmmount";
import useLoadingState from "../../../hooks/useLoadingState";
import PublicationsPagination from "../../../components/common/publications/PublicationsPagination";
import PublicationsFiltersMobile from "../../../components/common/publications/PublicationsFiltersMobile";
import { useUserRoleContext } from "../../../context/UserRoleContext";
import PublicationsFilters from "../../../components/common/publications/PublicationsFilters";
import { Helmet } from "react-helmet";

type DeviceUsedType = "pc" | "mobile";

function Publications() {
	const location = useLocation();
	const initFilter = location.state ? location.state : "random";
	const [publicationsFiltered, setPublicationsFiltered] = useState<FormattedPublicationsInfoType[] | null>(null);
	const [loadingState, changeLoadingState] = useLoadingState();
	const [filter, setFilter] = useState<FilterType>(initFilter);
	//Este estado se usa para lanzar una nueva petición http al servidor cuando el usuario acepta un mensaje de error del servidor (nuevo intento).
	const [reloadPublicationsTrigger, setReloadPublicationsTrigger] = useState<boolean>(true);

	//Used to render the correct filter component based on window width
	const deviceUsedInitValue: DeviceUsedType = window.innerWidth <= 900 ? "mobile" : "pc";
	const [deviceUsed, setDeviceUsed] = useState<DeviceUsedType>(deviceUsedInitValue);

	const { userRole } = useUserRoleContext();
	const pagesLeft = useRef<number>(0);
	const navigate = useNavigate();

	let { id } = useParams(); // Usado para mostrar una págína u otra del filtro seleccionado. Si no hay id se le da el valor "1" por defecto.
	if (id === undefined) id = "1";

	const axiosController = useRef<AbortController>();

	function closeErrorModal() {
		setReloadPublicationsTrigger(!reloadPublicationsTrigger);
	}

	//Al componente PublicationFilters se le pasa esta función y no "setFilter" directamente para que además de cambiar de filtro nos mande a la página 1 de dicho filtro (la página 4 de un filtro puede no existir en otro y dar error). Las otras formas de hacer esto que he probado afectaban a la información del "state" de los <Link> que redirigen a esta página, haciendo que cuando pulsáramos "Volver" desde AdminPublicationDetails no se recordara la página del filtro en la que estábamos y nos mandase de nuevo a la 1º. Esto sólo afecta a los cambios manuales de filtro y nada más.
	function changeFilterWithNavigation(newFilter: FilterType) {
		setFilter(newFilter);

		let route = "";
		if (userRole === "USER") route = "/user/publications/1";
		if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") route = "/producer/publications/1";
		navigate(route, { state: newFilter });
	}

	//Esta función filtra las publicaciones obtenidas. Devolviendo sólo las aprobadas por un admin.
	function removePublicationsByAuth(publications: PublicationInfoType[]) {
		const approvedPublications: PublicationInfoType[] = [];

		publications.map((element) => {
			if (element.authorizationStatus.state === "ACCEPTED") {
				approvedPublications.push(element);
			}
		});

		return approvedPublications;
	}

	//Estas funciones organizan la información recuperada del servidor y la adaptan al formato que entiende el componente "Viewer", el formato ()

	type FormattedBlockType = {
		title: string;
		content: PublicationInfoType[];
	};

	function formatByRandomPublications(publications: PublicationInfoType[]) {
		const filteredPublications = removePublicationsByAuth(publications);

		const result: FormattedPublicationsInfoType[] = [];

		const formattedBlock: FormattedBlockType = {
			title: "Aleatorio",
			content: filteredPublications
		};

		result.push(formattedBlock);

		return result;
	}

	function formatByUserPublications(publications: PublicationInfoType[]) {
		const filteredPublications = removePublicationsByAuth(publications);

		type UserType = {
			id: number;
			name: string;
		};
		const result: FormattedPublicationsInfoType[] = [];
		const users: UserType[] = [];

		// Guadamos en el array "users" todos los usuarios diferentes que aparecen en las publicaciones recuperadas.
		filteredPublications.map((publication) => {
			if (!users.find((element) => element.id === publication.author.id)) {
				const newUser: UserType = {
					id: publication.author.id,
					name: `${publication.author.lastname}, ${publication.author.name} `
				};

				users.push(newUser);
			}
		});

		//Generamos tantos objetos (con la información en el formato que acepta "Viewer") como usuarios hay en el array "users"
		users.map((user) => {
			const formattedBlock: FormattedBlockType = {
				title: user.name,
				content: []
			};

			filteredPublications.map((publication) => {
				if (publication.author.id === user.id) {
					formattedBlock.content.push(publication);
				}
			});

			result.push(formattedBlock);
		});

		return result;
	}

	function formatByScorePublications(publications: PublicationInfoType[]) {
		const filteredPublications = removePublicationsByAuth(publications);

		const result: FormattedPublicationsInfoType[] = [];

		const formattedBlock: FormattedBlockType = {
			title: "Destacados",
			content: filteredPublications
		};

		result.push(formattedBlock);

		return result;
	}

	function formatByDatePublications(publications: PublicationInfoType[]) {
		const filteredPublications = removePublicationsByAuth(publications);

		const result: FormattedPublicationsInfoType[] = [];
		const dates: string[] = [];
		const dateOptions = {
			year: "numeric" as const,
			month: "long" as const,
			day: "numeric" as const
		};
		const formatter = new Intl.DateTimeFormat("es-ES", dateOptions);

		// Guadamos en el array "dates" todas las fechas diferentes que aparecen en las publicaciones recuperadas.
		filteredPublications.map((publication) => {
			if (
				!dates.find((date) => {
					const dateToFormat = new Date(date);
					const formattedDate = formatter.format(dateToFormat);

					const publicationDateToFormat = new Date(publication.publicationDate);
					const formattedPublicationDate = formatter.format(publicationDateToFormat);
					return formattedDate === formattedPublicationDate;
				})
			) {
				dates.push(publication.publicationDate);
			}
		});

		//Generamos tantos objetos con la información en el formato que acepta "Viewer" como fechas hay en el array "dates"
		dates.map((date) => {
			//Convertimos el string en "date" para poder darle formato:
			const dateToFormat = new Date(date);
			const formattedDate = formatter.format(dateToFormat);

			const formattedBlock: FormattedBlockType = {
				title: formattedDate,
				content: []
			};

			filteredPublications.map((publication) => {
				const publicationDateToFormat = new Date(publication.publicationDate);
				const formattedPublicationDate = formatter.format(publicationDateToFormat);

				if (formattedPublicationDate === formattedDate) {
					formattedBlock.content.push(publication);
				}
			});

			result.push(formattedBlock);
		});

		return result;
	}

	useEffect(() => {
		changeLoadingState("loading");
		axiosController.current = new AbortController();
		const storedToken = getStoredToken();

		if (filter === "random" && storedToken) {
			getPublicationsByRandom(storedToken, axiosController.current, id as string)
				.then((response: AdminPublicationsFilteredType) => {
					const formattedPublications = formatByRandomPublications(response.publications);
					pagesLeft.current = response.pagination;
					setPublicationsFiltered(formattedPublications);
					changeLoadingState("loaded");
				})
				.catch(() => {
					changeLoadingState("errorServer");
				});
		}

		if (filter === "user" && storedToken) {
			getPublicationsByUser(storedToken, axiosController.current, id as string)
				.then((response: AdminPublicationsFilteredType) => {
					const formattedPublications = formatByUserPublications(response.publications);
					pagesLeft.current = response.pagination;
					setPublicationsFiltered(formattedPublications);
					changeLoadingState("loaded");
				})
				.catch(() => {
					changeLoadingState("errorServer");
				});
		}

		if (filter === "score" && storedToken) {
			getPublicationsByScore(storedToken, axiosController.current, id as string)
				.then((response: AdminPublicationsFilteredType) => {
					const formattedPublications = formatByScorePublications(response.publications);
					pagesLeft.current = response.pagination;
					setPublicationsFiltered(formattedPublications);
					changeLoadingState("loaded");
				})
				.catch(() => {
					changeLoadingState("errorServer");
				});
		}

		if (filter === "date" && storedToken) {
			getPublicationsByDate(storedToken, axiosController.current, id as string)
				.then((response: AdminPublicationsFilteredType) => {
					const formattedPublications = formatByDatePublications(response.publications);
					pagesLeft.current = response.pagination;
					setPublicationsFiltered(formattedPublications);
					changeLoadingState("loaded");
				})
				.catch(() => {
					changeLoadingState("errorServer");
				});
		}

		if (filter === "ammount" && storedToken) {
			getPublicationsByAmmount(storedToken, axiosController.current, id as string)
				.then((response: AdminPublicationsFilteredType) => {
					const formattedPublications = formatByUserPublications(response.publications);
					pagesLeft.current = response.pagination;
					setPublicationsFiltered(formattedPublications);
					changeLoadingState("loaded");
				})
				.catch(() => {
					changeLoadingState("errorServer");
				});
		}

		return () => {
			axiosController.current?.abort();
		};
	}, [filter, id, reloadPublicationsTrigger]);

	useEffect(() => {
		function changeDeviceType() {
			if (window.innerWidth <= 900 && deviceUsed === "pc") {
				setDeviceUsed("mobile");
			} else if (window.innerWidth > 900 && deviceUsed === "mobile") {
				setDeviceUsed("pc");
			}
		}
		window.addEventListener("resize", changeDeviceType);
		return () => {
			window.removeEventListener("resize", changeDeviceType);
		};
	});

	return (
		<div className="flex flex-col min-h-[100vh]">
			<Helmet>
				<title>Plant-In Publicaciones de Usuarios</title>
				<meta
					name="description"
					content="Explora todas las publicaciones de nuestra comunidad. Descubre las plantaciones ecológicas de otros usuarios en Plant-in."
				></meta>
				{/* Se indica a "robots" que sólo indexen la página 1 de la paginación, no el resto */}
				{id === "1" ? (
					<meta name="robots" content="index, follow"></meta>
				) : (
					<meta name="robots" content="noindex, nofollow"></meta>
				)}
			</Helmet>

			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center flex-grow w-[100%] min-h-[40vh] mt-[0.5rem] mx-auto
				custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-900:mt-[3.5rem] custom-1400:mt-[8.8rem]"
			>
				{deviceUsed === "pc" ? (
					<PublicationsFilters filter={filter} setFilter={changeFilterWithNavigation} />
				) : (
					<PublicationsFiltersMobile filter={filter} setFilter={changeFilterWithNavigation} />
				)}

				{loadingState === "loading" && (
					<>
						<div className="min-h-[40vh] mt-24 text-brandingLightGreen">
							<LoadingSmall />
						</div>

						<div
							className="mt-auto mb-[2.4rem]
							custom-600:mb-[3rem] custom-1400:mb-[8.8rem] custom-2500:mb-[12rem]"
						>
							<PublicationsPagination actualPage={Number(id)} pagesLeft={pagesLeft.current} pagesForBlock={3} />
						</div>
					</>
				)}

				{loadingState === "loaded" && (
					<>
						<div
							className="flex justify-center w-[100%] mb-[3.5rem]
							custom-900:w-[90%] custom-1200:w-[80%] custom-2500:w-[75%] custom-3500:w-[86%]
							custom-500:mb-[5rem] custom-1400:mb-[8.8rem] custom-2500:mb-[12rem]"
						>
							<Viewer itemsList={publicationsFiltered} filter={filter} />
						</div>

						<div
							className="mt-auto mb-[2.4rem]
							custom-600:mb-[3rem] custom-1400:mb-[8.8rem] custom-2500:mb-[12rem]"
						>
							<PublicationsPagination actualPage={Number(id)} pagesLeft={pagesLeft.current} pagesForBlock={3} />
						</div>
					</>
				)}

				{loadingState === "errorServer" && (
					<NetworkError failedAction="cargar las publicaciones." buttonText="Entendido" handleClose={closeErrorModal} />
				)}
			</main>

			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default Publications;
