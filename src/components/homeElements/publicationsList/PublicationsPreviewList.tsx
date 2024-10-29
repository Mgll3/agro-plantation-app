import PublicationPreviewCard from "./PublicationPreviewCard";
import { PublicationType } from "./publicationsListTypes";
import { generateUniqueId } from "../../../utils/generateUniqueId";

export type PublicationsPreviewListProps = {
	bestPublicationsArray: PublicationType[];
};

function PublicationsPreviewList({ bestPublicationsArray }: PublicationsPreviewListProps) {
	return (
		<div className="">
			<h2
				className="mb-[1rem] text-center text-[1.6rem] font-sans font-semibold tracking-[0.015rem]
				custom-500:text-[2rem] custom-700:text-[2.5rem] custom-900:text-[3rem] custom-1400:text-[3.5rem] custom-1900:text-[4rem] custom-2500:text-[5rem] custom-3500:text-[6.5rem] custom-1400:font-normal
				custom-700:mb-[1.4rem] custom-900:mb-[1.8rem] custom-1200:mb-[2rem] custom-1400:mb-[2.4rem] custom-1900:mb-[3rem] custom-2500:mb-[4rem] custom-3500:mb-[5rem]"
			>
				Publicaciones
			</h2>

			<div
				className="flex flex-wrap justify-center gap-[24px]
					custom-1200:gap-[44px] custom-1400:gap-[64px] custom-1900:gap-[84px] custom-2500:gap-[94px] custom-3500:gap-[100px]"
			>
				{bestPublicationsArray.map((element) => {
					return (
						<div className="" key={generateUniqueId()}>
							<PublicationPreviewCard
								id={element.id}
								author={`${element.author.name} ${element.author.lastname}`}
								mainImage={element.mainImage?.url}
								title={element.title}
								mainText={element.plantation.details}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PublicationsPreviewList;
