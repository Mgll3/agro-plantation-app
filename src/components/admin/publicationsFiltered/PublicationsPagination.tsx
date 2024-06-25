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
	const maxPage =
		actualPage + (pagesLeft - 1) <= pagesForBlock ? actualPage + (pagesLeft - 1) : minPage + (pagesForBlock - 1); //Hay que restarle "1" a "pagesLeft", ya que el servidor cuenta la página actual, no sólo las que quedan.

	// Calculamos si debe hay un bloque anterior / posterior al que saltar con los iconos de flecha
	const isTherePrevBlock: boolean = minPage > 1 ? true : false;
	const isThereNextBlock: boolean = actualPage + (pagesLeft - 1) > maxPage ? true : false;

	function renderPagination() {
		const paginationElements: React.ReactNode[] = [];

		for (let i = minPage; i <= maxPage; i++) {
			if (i === actualPage) {
				paginationElements.push(
					<p
						key={i}
						className="flex justify-center items-center w-[28px] h-[28px] text-brandingLightYellow bg-brandingDarkGreen rounded-full"
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
		<div className="relative flex justify-center items-center w-[436px] h-[55px] font-lato text-brandingDarkGreen text-[12px] bg-brandingLightYellow shadow-lg rounded-2xl border-[1px] border-brandingDarkGreen border-solid">
			{isTherePrevBlock && (
				<Link to={`/admin/publications/${minPage - 1}`} className="absolute left-[10px] top-[-4px] text-[36px]">
					<KeyboardArrowLeftRoundedIcon fontSize="inherit" color="inherit" />
				</Link>
			)}

			<div className="flex justify-center items-center gap-x-[1.5rem]">{renderPagination()}</div>

			{isThereNextBlock && (
				<Link to={`/admin/publications/${maxPage + 1}`} className="absolute right-[10px] top-[-4px] text-[36px]">
					<KeyboardArrowRightRoundedIcon fontSize="inherit" color="inherit" />
				</Link>
			)}
		</div>
	);
}

export default PublicationsPagination;
