import { FilterType } from "./AdminPublications";

type AdminPublicationsFilterProps = {
	switchFilterComponentVisibility: () => void,
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>
};

function AdminPublicationsFilter( {switchFilterComponentVisibility, setFilter}: AdminPublicationsFilterProps) {


	function changeFilter (newFilter: FilterType) {
		switchFilterComponentVisibility();
		setFilter(newFilter);
	}

	return (
		<div className="absolute flex flex-col left-[-35%] top-[120%] w-[280px] h-[270px] py-6 text-brandingDarkGreen text-[19.78px] font-sans font-light rounded-xl bg-brandingLightYellow">
			<div className="flex items-center gap-2 mb-2 ml-4">
				<img alt="" src="../../../public/icons/filters/apps.png" 
					className="w-[26px] h-[26px]"
				/>
				<h3>Filtro</h3>
			</div>

			<div className="">
				<div className="flex items-center gap-2 mb-2 pl-10 hover:bg-brandingDarkGreen hover:text-brandingYellow">
					<img alt="" src="../../../public/icons/filters/random.png" 
						className="w-[24px] h-[19px]"
					/>
					<button className="ml-2"
						onClick={() => changeFilter("random")}
					>
						Aleatorio
					</button>
				</div>

				<div className="flex items-center gap-2 mb-2 pl-10 hover:bg-brandingDarkGreen hover:text-brandingYellow">
					<img alt="" src="../../../public/icons/filters/person-outline.png" 
						className="w-[24px] h-[24px]"
					/>
					<button className="ml-2"
						onClick={() => changeFilter("user")}
					>
						Por Usuario
					</button>
				</div>

				<div className="flex items-center gap-2 mb-2 pl-10 hover:bg-brandingDarkGreen hover:text-brandingYellow">
					<img alt="" src="../../../public/icons/filters/like.png" 
						className="w-[24px] h-[22px]"
					/>
					<button className="ml-2"
						onClick={() => changeFilter("score")}
					>
						Por Like
					</button>
				</div>

				<div className="flex items-center gap-2 mb-2 pl-10 hover:bg-brandingDarkGreen hover:text-brandingYellow">
					<img alt="" src="../../../public/icons/filters/calendar-number-outline.png" 
						className="w-[24px] h-[26px]"
					/>
					<button className="ml-2"
						onClick={() => changeFilter("date")}
					>
						Por Fecha public.
					</button>
				</div>

				<div className="flex items-center gap-2 mb-2 pl-10 hover:bg-brandingDarkGreen hover:text-brandingYellow">
					<img alt="" src="../../../public/icons/filters/checkbox-outline.png" 
						className="w-[24px] h-[26px]"
					/>
					<button className="ml-2"
						onClick={() => changeFilter("ammount")}
					>
						Por Publicaciones
					</button>
				</div>
			</div>
		</div>
	);
}

export default AdminPublicationsFilter;
