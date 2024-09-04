import PublicationCard from "./PublicationCard";
import { FormattedPublicationsInfoType } from "../adminTypes";

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
							<h2
								className="mt-[2rem] mb-[1.6rem] ml-[0.7rem] text-sans font-semibold text-[1.6rem]
								custom-500:mt-[4rem] custom-700:mt-[8.8rem] custom-2500:mt-[10rem]
								custom-500:mb-[2rem] custom-700:mb-[2.2rem] custom-1900:mb-[3rem] custom-2500:mb-[4rem]
								custom-500:ml-[2rem] custom-700:ml-[3rem] custom-1200:ml-[0rem]
								custom-500:text-[2rem] custom-700:text-[2.4rem] custom-1900:text-[3rem] custom-2500:text-[4rem]"
							>
								{block.title}
							</h2>

							<div
								className="flex justify-center flex-wrap gap-x-[3vw] gap-y-[3vh]
								custom-900:gap-x-[8vw] custom-1400:gap-x-[11.03vw] custom-1900:gap-x-[8vw] custom-2500:gap-x-[7.2vw]
								custom-1400:gap-y-[4vh] custom-1900:gap-y-[6vh] custom-3500:gap-y-[4vh]"
							>
								{block.content.map((publication) => {
									return (
										<div
											key={publication.id}
											className="w-[47vw] h-[47vw]
											custom-500:w-[45vw] custom-700:w-[38vw] custom-900:w-[33vw] custom-1000:w-[28vw] custom-1200:w-[21vw] custom-1400:w-[19vw] custom-1900:w-[21vw] custom-2500:w-[20vw] custom-3500:w-[16vw]
											custom-500:h-[45vw] custom-700:h-[38vw] custom-900:h-[33vw] custom-1000:h-[28vw] custom-1200:h-[21vw] custom-1400:h-[19vw] custom-1900:h-[21vw] custom-2500:h-[20vw] custom-3500:h-[16vw]"
										>
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
