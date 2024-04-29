import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Viewer from "../../components/admin/Viewer";
import { PublicationType } from "../../components/publicationsList/publicationsListTypes";
import { sortByRandom } from "../../utils/filters/sortByRandom";
import { sortPublicationsByDate } from "../../utils/filters/sortPublicationsByDate";
import { sortPublicationsByUser } from "../../utils/filters/sortPublicationsByUser";
import { sortPublicationsByScore } from "../../utils/filters/sortPublicationsByScore";

type PublicationsLoadStateType = "loading" | "error" | "loaded";
type FilterType = "none" | "random" | "user" | "score" | "date" | "auth";

function AdminPublications() {
	const [publicationsFiltered, setPublicationsFiltered] = useState<PublicationType[]>([]);
	const [publicationsLoadState, setPublicationsLoadState] = useState<PublicationsLoadStateType>("loading");




	function filterPublications(filter: FilterType) {

		if (filter === "random") {
			setPublicationsFiltered( sortByRandom(publicationsFiltered) );
		}

		if (filter === "date") {
			setPublicationsFiltered( sortPublicationsByDate(publicationsFiltered) );
		}

		if (filter === "user") {
			setPublicationsFiltered( sortPublicationsByUser(publicationsFiltered) );
		}

		if (filter === "score") {
			setPublicationsFiltered( sortPublicationsByScore(publicationsFiltered) );
		}

		if (filter === "auth") {
			setPublicationsFiltered( sortPublicationsByDate(publicationsFiltered));
		}
	}

	useState( () => {
		//Aquí se recupera la lista de publicaciones y se usa el Axios controller, sólo una vez, cuando se carga el componente.
	}, []);



	return (
		<>
			<div className="w-full" >
				<Header />
			</div>
			
			<main className="">
				<div className="">
					TOOLS
				</div>

				<div className="">
					<Viewer itemsList={publicationsFiltered}/>
				</div>
			</main>

			<div className="">
				<Footer />
			</div>
		</>
	);
}

export default AdminPublications;