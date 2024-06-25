import { FilterType } from "../adminTypes";

type PublicationsFiltersProps = {
	filter: FilterType;
	setFilter: (newFilter: FilterType) => void;
};

function PublicationsFilters({ filter, setFilter }: PublicationsFiltersProps) {
	const filterUnderlinedStyles = "absolute w-[40px] border-[3px] border-darkText border-solid";
	const dotStyle = "w-[6px] h-[6px] bg-brandingLightGreen rounded-full";

	return (
		<ul className="flex gap-6 items-center font-montserrat font-semibold text-[16px]">
			<li>
				<div className="relative flex-col">
					<button className="text-darkText" type="button" onClick={() => setFilter("random")}>
						Aleatorio
					</button>
					<div className={filter === "random" ? filterUnderlinedStyles : ""}></div>
				</div>
			</li>
			<li>
				<div className={dotStyle}></div>
			</li>
			<li>
				<div className="flex-col">
					<button className="text-darkText" type="button" onClick={() => setFilter("user")}>
						Por Usuario
					</button>
					<div className={filter === "user" ? filterUnderlinedStyles : ""}></div>
				</div>
			</li>
			<li>
				<div className={dotStyle}></div>
			</li>
			<li>
				<div className="flex-col">
					<button className="text-darkText" type="button" onClick={() => setFilter("score")}>
						Por Like
					</button>
					<div className={filter === "score" ? filterUnderlinedStyles : ""}></div>
				</div>
			</li>
			<li>
				<div className={dotStyle}></div>
			</li>
			<li>
				<div className="flex-col">
					<button className="text-darkText" type="button" onClick={() => setFilter("date")}>
						Por Fecha de Publicación
					</button>
					<div className={filter === "date" ? filterUnderlinedStyles : ""}></div>
				</div>
			</li>
			<li>
				<div className={dotStyle}></div>
			</li>
			<li>
				<div className="flex-col">
					<button className="text-darkText" type="button" onClick={() => setFilter("ammount")}>
						Por cantidad de publicaciones
					</button>
					<div className={filter === "ammount" ? filterUnderlinedStyles : ""}></div>
				</div>
			</li>
			<li>
				<div className={dotStyle}></div>
			</li>
			<li>
				<div className="flex-col">
					<button className="text-darkText" type="button" onClick={() => setFilter("auth")}>
						Por Pendientes
					</button>
					<div className={filter === "auth" ? filterUnderlinedStyles : ""}></div>
				</div>
			</li>
		</ul>
	);
}

export default PublicationsFilters;
