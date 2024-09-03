import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Viewer from "../../components/admin/publicationsFiltered/Viewer";
import NetworkError from "../../components/modals/NetworkError";
import LoadingSmall from "../../components/modals/LoadingSmall";
import PublicationsFilters from "../../components/admin/publicationsFiltered/PublicationsFilters";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getStoredToken } from "../../utils/getStoredToken";
import { getPublicationsByRandom } from "../../interfaces/publicationsFilters/getPublicationsByRandom";
import {
	AdminPublicationsFilteredType,
	FilterType,
	FormattedPublicationsInfoType,
	PublicationInfoType
} from "../../components/admin/adminTypes";
import { getPublicationsByUser } from "../../interfaces/publicationsFilters/getPublicationsByUser";
import { getPublicationsByScore } from "../../interfaces/publicationsFilters/getPublicationsByScore";
import { getPublicationsByDate } from "../../interfaces/publicationsFilters/getPublicationsByDate";
import { getPublicationsByPending } from "../../interfaces/publicationsFilters/getPublicationsByPending";
import { getPublicationsByAmmount } from "../../interfaces/publicationsFilters/getPublicationsByAmmount";
import useLoadingState from "../../hooks/useLoadingState";
import PublicationsPagination from "../../components/admin/publicationsFiltered/PublicationsPagination";

function AdminPublications() {
	const location = useLocation();
	const initFilter = location.state ? location.state : "random";
	const [publicationsFiltered, setPublicationsFiltered] = useState<FormattedPublicationsInfoType[] | null>(null);
	const [loadingState, changeLoadingState] = useLoadingState();
	const [filter, setFilter] = useState<FilterType>(initFilter);
	const pagesLeft = useRef<number>(0);
	const navigate = useNavigate();

	let { id } = useParams(); // Usado para mostrar una págína u otra del filtro seleccionado. Si no hay id se le da el valor "1" por defecto.
	if (id === undefined) id = "1";

	const axiosController = useRef<AbortController>();

	function closeErrorModal() {
		changeLoadingState("loading");
	}

	//Al componente PublicationFilters se le pasa esta función y no "setFilter" directamente para que además de cambiar de filtro nos mande a la página 1 de dicho filtro (la página 4 de un filtro puede no existir en otro y dar error). Las otras formas de hacer esto que he probado afectaban a la información del "state" de los <Link> que redirigen a esta página, haciendo que cuando pulsáramos "Volver" desde AdminPublicationDetails no se recordara la página del filtro en la que estábamos y nos mandase de nuevo a la 1º. Esto sólo afecta a los cambios manuales de filtro y nada más.
	function changeFilterWithNavigation(newFilter: FilterType) {
		setFilter(newFilter);
		navigate("/admin/publications/1", { state: newFilter });
	}

	//Estas funciones organizan la información recuperada del servidor y la adaptan al formato que entiende el componente "Viewer", el formato ()

	type FormattedBlockType = {
		title: string;
		content: PublicationInfoType[];
	};

	function formatByRandomPublications(publications: PublicationInfoType[]) {
		const result: FormattedPublicationsInfoType[] = [];

		const formattedBlock: FormattedBlockType = {
			title: "Aleatorio",
			content: publications
		};

		result.push(formattedBlock);

		return result;
	}

	function formatByUserPublications(publications: PublicationInfoType[]) {
		type UserType = {
			id: number;
			name: string;
		};
		const result: FormattedPublicationsInfoType[] = [];
		const users: UserType[] = [];

		// Guadamos en el array "users" todos los usuarios diferentes que aparecen en las publicaciones recuperadas.
		publications.map((publication) => {
			if (!users.find((element) => element.id === publication.author.id)) {
				const newUser: UserType = {
					id: publication.author.id,
					name: `${publication.author.lastname}, ${publication.author.name} `
				};

				users.push(newUser);
			}
		});

		//Generamos tantos objetos con la información en el formato que acepta "Viewer" como usuarios hay en el array "users"
		users.map((user) => {
			const formattedBlock: FormattedBlockType = {
				title: user.name,
				content: []
			};

			publications.map((publication) => {
				if (publication.author.id === user.id) {
					formattedBlock.content.push(publication);
				}
			});

			result.push(formattedBlock);
		});

		return result;
	}

	function formatByScorePublications(publications: PublicationInfoType[]) {
		const result: FormattedPublicationsInfoType[] = [];

		const formattedBlock: FormattedBlockType = {
			title: "Destacados",
			content: publications
		};

		result.push(formattedBlock);

		return result;
	}

	function formatByDatePublications(publications: PublicationInfoType[]) {
		const result: FormattedPublicationsInfoType[] = [];
		const dates: string[] = [];
		const dateOptions = {
			year: "numeric" as const,
			month: "long" as const,
			day: "numeric" as const
		};
		const formatter = new Intl.DateTimeFormat("es-ES", dateOptions);

		// Guadamos en el array "dates" todas las fechas diferentes que aparecen en las publicaciones recuperadas.
		publications.map((publication) => {
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

			publications.map((publication) => {
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

	function formatByAuthPublications(publications: PublicationInfoType[]) {
		const result: FormattedPublicationsInfoType[] = [];

		const formattedBlock: FormattedBlockType = {
			title: "Pendientes de publicación",
			content: publications
		};

		result.push(formattedBlock);

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

		if (filter === "auth" && storedToken) {
			getPublicationsByPending(storedToken, axiosController.current, id as string)
				.then((response: AdminPublicationsFilteredType) => {
					const formattedPublications = formatByAuthPublications(response.publications);
					pagesLeft.current = response.pagination;
					setPublicationsFiltered(formattedPublications);
					changeLoadingState("loaded");
				})
				.catch((error) => {
					if (error.message === "404") {
						setPublicationsFiltered(null);
						changeLoadingState("loaded");
					} else {
						changeLoadingState("errorServer");
					}
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
	}, [filter, id]);

	return (
		<>
			<div className="w-full">
				<Header />
			</div>

			<main className="flex flex-col items-center w-[80%] min-h-[40vh] mt-[10vh] mx-auto">
				<PublicationsFilters filter={filter} setFilter={changeFilterWithNavigation} />

				{loadingState === "loading" && (
					<>
						<div className="min-h-[50vh] mt-24 text-brandingLightGreen">
							<LoadingSmall />
						</div>

						<div className="py-[2rem]">
							<PublicationsPagination actualPage={Number(id)} pagesLeft={pagesLeft.current} pagesForBlock={3} />
						</div>
					</>
				)}

				{loadingState === "loaded" && (
					<>
						<div className="mb-[5vh] flex justify-center w-[100%]">
							<Viewer itemsList={publicationsFiltered} filter={filter} />
						</div>

						<div className="py-[2rem]">
							<PublicationsPagination actualPage={Number(id)} pagesLeft={pagesLeft.current} pagesForBlock={3} />
						</div>
					</>
				)}

				{loadingState === "errorServer" && (
					<NetworkError failedAction="cargar las publicaciones." buttonText="Entendido" handleClose={closeErrorModal} />
				)}
			</main>

			<div className="mt-8">
				<Footer />
			</div>
		</>
	);
}

export default AdminPublications;
