import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Link } from "react-router-dom";

type PublicationsPaginationProps = {
	actualPage: number; //Página en la que nos encontramos
	pagesLeft: number; //Cuántas páginas indica el servidor que quedan por ver en la BBDD
	pagesForBlock: number; //Cuántas páginas deben estar disponibles en cada bloque de paginación
};

function PublicationsPagination({ actualPage, pagesLeft, pagesForBlock }: PublicationsPaginationProps) {
	// Calculamos en qué franja de paginación estamos (1-8, 9-16...)
	const paginationGroup = Math.ceil(actualPage / pagesForBlock) * pagesForBlock; // Nos va a dar el máximo de la franja actual. Si da "8" sabremos que estamos en la franja 1-8, si da "16" en la de 9-16, etc

	// Calculamos el número de página mínimo y el máximo que tenemos que renderizar
	const minPage = paginationGroup - (pagesForBlock - 1);
	const maxPage = actualPage + pagesLeft <= paginationGroup ? actualPage + pagesLeft : minPage + (pagesForBlock - 1);

	// Calculamos si debe hay un bloque anterior / posterior al que saltar con los iconos de flecha
	const isTherePrevBlock: boolean = minPage > 1 ? true : false;
	const isThereNextBlock: boolean = actualPage + pagesLeft > maxPage ? true : false;

	function renderPagination() {
		const paginationElements: React.ReactNode[] = [];
		for (let i = minPage; i <= maxPage; i++) {
			if (i === actualPage) {
				paginationElements.push(
					<p
						key={i}
						className="flex justify-center items-center w-[2rem] h-[2rem] text-brandingLightYellow bg-brandingDarkGreen rounded-full
						custom-700:w-[2.4rem] custom-1400:w-[2.8rem] custom-1900:w-[3.4rem] custom-2500:w-[4.7rem]
						custom-700:h-[2.4rem] custom-1400:h-[2.8rem] custom-1900:h-[3.4rem] custom-2500:h-[4.7rem]"
					>
						{i}
					</p>
				);
			} else {
				paginationElements.push(
					<Link key={i} to={`/admin/publications/${i}`} className="">
						{i}
					</Link>
				);
			}
		}

		return paginationElements;
	}

	return (
		<div
			className="relative flex justify-center items-center w-[50vw] h-[2.8rem] font-lato text-brandingDarkGreen text-[1.2rem] bg-brandingLightYellow shadow-lg rounded-2xl border-[1px] border-brandingDarkGreen border-solid
			custom-390:w-[40vw] custom-900:w-[33vw] custom-1400:w-[43.6rem] custom-1900:w-[25vw]
			custom-500:h-[3.5rem] custom-700:h-[4.5rem] custom-1400:h-[5.5rem] custom-2500:h-[7rem]
			custom-1400:text-[1.2rem] custom-1900:text-[1.8rem] custom-2500:text-[2.5rem]"
		>
			{isTherePrevBlock && (
				<Link
					to={`/admin/publications/${minPage - 1}`}
					className="mb-[0.7rem] text-[2.7rem]
					custom-1400:mb-[1rem] custom-1900:mb-[1.5rem]
					custom-600:text-[3rem] custom-1400:text-[3.6rem] custom-1900:text-[6rem] custom-2500:text-[8rem]"
				>
					<KeyboardArrowLeftRoundedIcon fontSize="inherit" color="inherit" />
				</Link>
			)}

			<div
				className="flex justify-center items-center w-[80%] gap-x-[1.5rem]
				custom-1900:gap-x-[3rem]"
			>
				{renderPagination()}
			</div>

			{isThereNextBlock && (
				<Link
					to={`/admin/publications/${maxPage + 1}`}
					className="mb-[0.7rem] text-[2.7rem]
					custom-1400:mb-[1rem] custom-1900:mb-[1.5rem]
					custom-600:text-[3rem] custom-1400:text-[3.6rem] custom-1900:text-[6rem] custom-2500:text-[8rem]"
				>
					<KeyboardArrowRightRoundedIcon fontSize="inherit" color="inherit" />
				</Link>
			)}
		</div>
	);
}

export default PublicationsPagination;
