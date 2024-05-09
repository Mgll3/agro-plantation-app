import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Viewer from "../../components/admin/Viewer";
import { PublicationType } from "../../components/publicationsList/publicationsListTypes";
import NetworkError from "../../components/modals/NetworkError";
import LoadingSmall from "../../components/modals/LoadingSmall";
import Button from "../../components/button/Button";
import { ButtonColorType } from "../../components/button/buttonTypes";
import AdminPublicationsFilter from "../../components/admin/AdminPublicationsFilter";

type PublicationsLoadStateType = "loading" | "error" | "loaded";
export type FilterType = "random" | "user" | "score" | "date" | "ammount" | "auth";

function AdminPublications() {
	const [publicationsFiltered, setPublicationsFiltered] = useState<PublicationType[] | null>(null);
	const [publicationsLoadState, setPublicationsLoadState] = useState<PublicationsLoadStateType>("loading");
	const [filterComponentVisibility, setFilterComponentVisibility] = useState<boolean>(false);
	const [filter, setFilter] = useState<FilterType>("random");
	const axiosController = useRef<AbortController>();
	const axiosController2 = useRef<AbortController>();
	const filterUnderlinedStyles = "w-[40px] border-[3px] border-darkText border-solid";
	const dotStyle = "w-[6px] h-[6px] bg-brandingLightGreen rounded-full";


	//Estilos del Botón de Filtros
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-[19.78px]";
	const buttonWidth = "w-[160px]";
	const buttonPaddingY = "py-1";


	function switchFilterComponentVisibility () {
		setFilterComponentVisibility(!filterComponentVisibility);
	}


	useEffect( () => {
		axiosController.current = new AbortController();



		return () => {
			axiosController.current?.abort();
		};
	}, []);


	useEffect( () => {
		axiosController2.current = new AbortController();

		if (filter === "random") {
			
		}

		return () => {
			axiosController2.current?.abort();
		};
	}, [filter]);





	return (
		<>
			<div className="w-full" >
				<Header />
			</div>
			
			<main className="flex flex-col items-center w-[80%] h-[40vh] mt-[5vh] mx-auto">
				<ul className="flex gap-6 items-center font-montserrat font-semibold text-[16px]">
					<li>
						<div className="flex-col">
							<p className="text-darkText">Aleatorio</p>
							<div className={filter === "random" ? filterUnderlinedStyles : ""}></div>
						</div>
					</li>
					<li>
						<div className={dotStyle}></div>
					</li>
					<li>
						<div className="flex-col">
							<p className="text-darkText">Por Usuario</p>
							<div className={filter === "user" ? filterUnderlinedStyles : ""}></div>
						</div>
					</li>
					<li>
						<div className={dotStyle}></div>
					</li>
					<li>
						<div className="flex-col">
							<p className="text-darkText">Por Like</p>
							<div className={filter === "score" ? filterUnderlinedStyles : ""}></div>
						</div>
					</li>
					<li>
						<div className={dotStyle}></div>
					</li>
					<li>
						<div className="flex-col">
							<p className="text-darkText">Por Fecha de Publicación</p>
							<div className={filter === "date" ? filterUnderlinedStyles : ""}></div>
						</div>
					</li>
					<li>
						<div className={dotStyle}></div>
					</li>
					<li>
						<div className="flex-col">
							<p className="text-darkText">Por cantidad de publicaciones</p>
							<div className={filter === "ammount" ? filterUnderlinedStyles : ""}></div>
						</div>
					</li>
					<li>
						<div className={dotStyle}></div>
					</li>
					<li>
						<div className="flex-col">
							<p className="text-darkText">Por Pendientes</p>
							<div className={filter === "auth" ? filterUnderlinedStyles : ""}></div>
						</div>
					</li>
					<li>
						<div className="relative">
							<Button
								buttonColor={buttonColor}
								buttonFontSize={buttonFontSize}
								buttonWidth={buttonWidth}
								buttonPaddingY={buttonPaddingY}
								buttonFuncionality={{actionText: "Filtros", handleClick: switchFilterComponentVisibility}}
							>
							</Button>

							{
								filterComponentVisibility === true && 
									<AdminPublicationsFilter switchFilterComponentVisibility={switchFilterComponentVisibility} setFilter={setFilter} />
							}
						</div>
					</li>
				</ul>

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
					publicationsLoadState === "error" && <NetworkError failedAction="cargar las publicaciones." />
				}

			</main>

			<div className="mt-8">
				<Footer />
			</div>
		</>
	);
}

export default AdminPublications;