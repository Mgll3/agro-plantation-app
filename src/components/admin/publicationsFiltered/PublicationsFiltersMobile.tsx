import { useState } from "react";
import { FilterType } from "../adminTypes";
import { useUserRoleContext } from "../../../context/UserRoleContext";

type PublicationsFiltersMobileProps = {
	filter: FilterType;
	setFilter: (newFilter: FilterType) => void;
};

//Definimos un array con los filtros en español (los que se usan de cara al usuario) y otro con los filtros en inglés, tal como se reciben por props, en el mismo orden, para poder hacer fácilmente la equivalencia o traducción de uno en otro.
function PublicationsFiltersMobile({ filter, setFilter }: PublicationsFiltersMobileProps) {
	const { userRole } = useUserRoleContext();

	const englishFiltersArray = ["random", "user", "score", "date", "ammount", "auth"] as const;
	const spanishFiltersArray = [
		"Aleatorio",
		"Por Usuario",
		"Por Like",
		"Por Fecha de Publicación",
		"Por Cantidad de Publicaciones",
		"Por Pendientes"
	] as const;

	type spanishFilter = (typeof spanishFiltersArray)[number];
	type englishFilter = (typeof englishFiltersArray)[number];

	//Definimos el valor inicial que va a tener el estado "actualFilter", haciendo una conversión del filtro actual que llega por props en inglés al nombre en español
	const englishFilterIndex = englishFiltersArray.findIndex((element) => element === filter);
	const actualFilterInitValue: spanishFilter = spanishFiltersArray[englishFilterIndex];

	const [actualFilter, setActualFilter] = useState<spanishFilter>(actualFilterInitValue);

	function changeFilter(newEnglishFilter: englishFilter, newSpanishFilter: spanishFilter) {
		setActualFilter(newSpanishFilter);
		setFilter(newEnglishFilter);
	}

	function setPrevFilter() {
		const actualFilterIndex = spanishFiltersArray.findIndex((element) => element === actualFilter);
		if (actualFilterIndex === 0) {
			setActualFilter(spanishFiltersArray[spanishFiltersArray.length - 1]);
			setFilter(englishFiltersArray[englishFiltersArray.length - 1]);
		} else {
			setActualFilter(spanishFiltersArray[actualFilterIndex - 1]);
			setFilter(englishFiltersArray[actualFilterIndex - 1]);
		}
	}

	function setNextFilter() {
		const actualFilterIndex = spanishFiltersArray.findIndex((element) => element === actualFilter);
		if (actualFilterIndex === spanishFiltersArray.length - 1) {
			setActualFilter(spanishFiltersArray[0]);
			setFilter(englishFiltersArray[0]);
		} else {
			setActualFilter(spanishFiltersArray[actualFilterIndex + 1]);
			setFilter(englishFiltersArray[actualFilterIndex + 1]);
		}
	}

	return (
		<div className="w-full">
			<ul
				className="flex gap-[0.5rem] justify-center font-sans font-normal text-[0.6rem] text-grey500
				custom-390:gap-[0.5rem] custom-420:gap-[1rem] custom-600:gap-[1.5rem] custom-640:gap-[2rem] custom-900:gap-[2.5rem]
				custom-390:text-[0.7rem] custom-420:text-[0.8rem] custom-500:text-[1rem] custom-600:text-[1.1rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem]"
			>
				{spanishFiltersArray.map((element, index) => {
					if (element !== actualFilter && (element !== "Por Pendientes" || userRole === "ADMIN")) {
						return (
							<li key={index}>
								<button
									className="text-darkText"
									type="button"
									onClick={() => changeFilter(englishFiltersArray[index], element)}
								>
									{spanishFiltersArray[index]}
								</button>
							</li>
						);
					}
				})}
			</ul>

			<div
				className="flex items-center justify-between my-[1.1rem] px-[1.6rem]
				custom-500:mt-[2rem] custom-600:mt-[3rem] custom-700:mt-[4rem]"
			>
				<button onClick={setPrevFilter}>
					<svg
						viewBox="0 0 27 46"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="fill-current w-[15px] aspect-[27/46] rotate-180 text-black"
					>
						<path
							d="M1.24031 1.83911C-0.319687 3.39911 -0.319687 5.91911 1.24031 7.47911L16.7603 22.9991L1.24031 38.5191C-0.319687 40.0791 -0.319687 42.5991 1.24031 44.1591C2.80031 45.7191 5.32031 45.7191 6.88031 44.1591L25.2403 25.7991C26.8003 24.2391 26.8003 21.7191 25.2403 20.1591L6.88031 1.79911C5.36031 0.279111 2.80031 0.279112 1.24031 1.83911Z"
							fill="currentColor"
						/>
					</svg>
				</button>

				<p
					className="text-[1.4rem] font-semibold
						custom-400:text-[1.6rem]] custom-500:text-[2rem] custom-700:text-[2.5rem]"
				>
					{actualFilter}
				</p>

				<button onClick={setNextFilter}>
					<svg
						viewBox="0 0 27 46"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="fill-current w-[15px] aspect-[27/46] text-black"
					>
						<path
							d="M1.24031 1.83911C-0.319687 3.39911 -0.319687 5.91911 1.24031 7.47911L16.7603 22.9991L1.24031 38.5191C-0.319687 40.0791 -0.319687 42.5991 1.24031 44.1591C2.80031 45.7191 5.32031 45.7191 6.88031 44.1591L25.2403 25.7991C26.8003 24.2391 26.8003 21.7191 25.2403 20.1591L6.88031 1.79911C5.36031 0.279111 2.80031 0.279112 1.24031 1.83911Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default PublicationsFiltersMobile;
