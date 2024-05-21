import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Viewer from "../../components/admin/Viewer";
import { PublicationType } from "../../components/publicationsList/publicationsListTypes";
import NetworkError from "../../components/modals/NetworkError";
import LoadingSmall from "../../components/modals/LoadingSmall";
import PublicationsFilters, { FilterType } from "../../components/admin/PublicationsFilters";


type PublicationsLoadStateType = "loading" | "error" | "loaded";

function AdminPublications() {
	const [publicationsFiltered, setPublicationsFiltered] = useState<PublicationType[] | null>(null);
	const [publicationsLoadState, setPublicationsLoadState] = useState<PublicationsLoadStateType>("loading");
	const [filter, setFilter] = useState<FilterType>("random");
	const axiosController = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();


	function closeErrorModal () {
		setPublicationsLoadState("loading");
	}


	useEffect( () => {
		axiosController.current = new AbortController();



		return () => {
			axiosController.current?.abort();
		};
	}, []);


	// useEffect( () => {
	// 	axiosController2.current = new AbortController();

	// 	if (filter === "random") {
			
	// 	}

	// 	return () => {
	// 		axiosController2.current?.abort();
	// 	};
	// }, [filter]);





	return (
		<>
			<div className="w-full" >
				<Header />
			</div>
			
			<main className="flex flex-col items-center w-[80%] h-[40vh] mt-[5vh] mx-auto">
				<PublicationsFilters filter={filter} setFilter={setFilter} />

				{
					publicationsFiltered === null 
						?	(
							<div className="mt-24 text-brandingLightGreen">
								<LoadingSmall/>
							</div>
						)
						: (
							<div className="">
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