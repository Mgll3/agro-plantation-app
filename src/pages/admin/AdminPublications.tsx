import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Viewer from "../../components/admin/Viewer";
import NetworkError from "../../components/modals/NetworkError";
import LoadingSmall from "../../components/modals/LoadingSmall";
import PublicationsFilters from "../../components/admin/PublicationsFilters";
import { useParams } from "react-router-dom";
import { getStoredToken } from "../../utils/getStoredToken";
import { getPublicationsByRandom } from "../../interfaces/publicationsFilters/getPublicationsByRandom";
import { AdminPublicationsFilteredType, FilterType, FormattedPublicationsInfoType } from "../../components/admin/adminTypes";


type PublicationsLoadStateType = "loading" | "error" | "loaded";

function AdminPublications() {
	const [publicationsFiltered, setPublicationsFiltered] = useState<FormattedPublicationsInfoType[] | null>(null);
	const [publicationsLoadState, setPublicationsLoadState] = useState<PublicationsLoadStateType>("loading");
	const [filter, setFilter] = useState<FilterType>("random");
	
	let  { id } =  useParams();														// Usado para mostrar una págína u otra del filtro seleccionado. Si no hay id se le da el valor "1" por defecto.
	if (id === undefined) id = "1";
	
	const axiosController = useRef<AbortController>();





	function closeErrorModal () {
		setPublicationsLoadState("loading");
	}


	//Estas funciones organizan la información recuperada del servidor y la adaptan al formato que entiende el componente "Viewer", el formato ()

	function formatByRandomPublications (publications: AdminPublicationsFilteredType[]) {
		const result: FormattedPublicationsInfoType[] = [];
		
		const formattedBlock = {
			title: "Aleatorio",
			content: publications
		};

		result.push(formattedBlock);

		return result;
	}


	useEffect( () => {
		setPublicationsLoadState("loading");
		axiosController.current = new AbortController();
		const storedToken = getStoredToken();

		if (filter === "random" && storedToken) {
			getPublicationsByRandom(storedToken, axiosController.current, id)
				.then( (response: AdminPublicationsFilteredType[]) => {
					const formattedPublications = formatByRandomPublications(response);
					setPublicationsFiltered(formattedPublications);
					setPublicationsLoadState("loaded");

				})
				.catch( (error) => {
					setPublicationsLoadState("error");
					console.log(error);
				});

		}


		return () => {
			axiosController.current?.abort();
		};
	}, [filter]);








	return (
		<>
			<div className="w-full" >
				<Header />
			</div>
			
			<main className="flex flex-col items-center w-[80%] min-h-[40vh] mt-[10vh] mx-auto">
				<PublicationsFilters filter={filter} setFilter={setFilter} />

				{
					publicationsLoadState === "loading" && (
						<div className="mt-24 text-brandingLightGreen">
							<LoadingSmall/>
						</div>
					)
				}

				{
					publicationsLoadState === "loaded" && publicationsFiltered !== null && (
						<div className="flex justify-center w-[100%] mt-[8vh]">
							<Viewer itemsList={publicationsFiltered} />
						</div>
					)
				}


				{
					publicationsLoadState === "error" && <NetworkError failedAction="cargar las publicaciones." buttonText="Entendido" handleClose={closeErrorModal} />
				}

			</main>

			<div className="mt-8">
				<Footer />
			</div>
		</>
	);
}

export default AdminPublications;