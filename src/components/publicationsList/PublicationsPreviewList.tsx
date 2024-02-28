import PublicationPreviewCard from "./PublicationPreviewCard";
import { PublicationsPreviewListProps } from "./publicationsListTypes";
import { generateUniqueId } from "../../utils/generateUniqueId";


function PublicationsPreviewList({ bestPublicationsArray }: PublicationsPreviewListProps) {

	return (
		<div className="">
			{
				bestPublicationsArray.map((element) => {
					return (
						<div className="" key={generateUniqueId()}>
							<PublicationPreviewCard id={element.id} author={element.author} mainImage={element.mainImage} title={element.title} mainText={element.mainText} />
						</div>
					);
				})
			}
		</div>
	);
}

export default PublicationsPreviewList;
