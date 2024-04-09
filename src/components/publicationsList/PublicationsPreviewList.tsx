import PublicationPreviewCard from "./PublicationPreviewCard";
import { PublicationsPreviewListProps } from "./publicationsListTypes";
import { generateUniqueId } from "../../utils/generateUniqueId";


function PublicationsPreviewList({ bestPublicationsArray }: PublicationsPreviewListProps) {

	return (
		<div className="">
			<h2 className="mt-[2.5rem] mb-[1.2rem] text-center text-3xl font-sans">Publicaciones</h2>

			<div className="flex flex-wrap justify-between gap-x-12 gap-y-12">
				{
					bestPublicationsArray.map((element) => {
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
					})
				}
			</div>

		</div>
	);
}

export default PublicationsPreviewList;
