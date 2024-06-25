import PublicationCard from "./PublicationCard";
import { FormattedPublicationsInfoType } from "./adminTypes";

type ViewerPropsType = {
	itemsList: FormattedPublicationsInfoType[] | null;
	filter: string;
};

function Viewer({ itemsList, filter }: ViewerPropsType) {
	return (
		<div className="flex flex-col items-start w-[100%]">
			{itemsList &&
				itemsList.map((block, index) => {
					return (
						<div key={index} className="w-[100%]">
							<h2 className="mt-[88px] mb-[22px] text-sans font-semibold text-[24px]">{block.title}</h2>

							<div className="flex justify-start flex-wrap gap-x-[11.03vw] gap-y-[4vh]">
								{block.content.map((publication) => {
									return (
										<div key={publication.id} className="w-[19vw] h-[19vw]">
											<PublicationCard publicationInfo={publication} filter={filter} />
										</div>
									);
								})}
							</div>
						</div>
					);
				})}

			{itemsList === null && (
				<h2 className="w-[100%] mt-[140px] mb-[22px] text-center text-sans text-lightGrayText font-semibold text-[24px]">
					No hay publicaciones disponibles
				</h2>
			)}
		</div>
	);
}

export default Viewer;
