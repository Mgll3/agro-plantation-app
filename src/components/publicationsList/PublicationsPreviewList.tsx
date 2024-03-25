import PublicationPreviewCard from "./PublicationPreviewCard";
import { PublicationsPreviewListProps } from "./publicationsListTypes";
import { generateUniqueId } from "../../utils/generateUniqueId";


function PublicationsPreviewList({ bestPublicationsArray }: PublicationsPreviewListProps) {

	return (
		<div className="">
			<p className="my-[2em] text-center text-3xl font-sans">Publicaciones</p>

			{
				bestPublicationsArray.map((element) => {
					return (
						<div className="" key={generateUniqueId()}>
							<PublicationPreviewCard 
								id={element.id}
								author={element.author}
								mainImage={element.mainImage}
								title={element.title}
								mainText={element.mainText}
							/>
						</div>
					);
				})
			}
		</div>
	);
}

export default PublicationsPreviewList;
