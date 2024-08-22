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
				className="mb-[2vh] text-center text-[1.6rem] font-sans font-semibold tracking-[0.015rem]
				custom-1400:text-[3.5rem] custom-1400:font-normal
				custom-1400:mb-[2vh]"
			>
				Publicaciones
			</h2>

			<div className="flex flex-wrap justify-center gap-x-[44px] gap-y-[44px]">
				{bestPublicationsArray.map((element) => {
					return (
						<div className="" key={generateUniqueId()}>
							<PublicationPreviewCard
								id={element.id}
								author={`${element.author.name} ${element.author.lastname}`}
								mainImage={element.mainImage.url}
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
