import { Link } from "react-router-dom";
import { AdminPublicationsFilteredType } from "./adminTypes";

type PublicationCardProps = {
	publicationInfo: AdminPublicationsFilteredType
}

function PublicationCard( {publicationInfo}: PublicationCardProps) {
	return (
		<Link to="/" className="h-[100%]">
			<div className="w-[100%] h-[100%] p-[6.38%] rounded-lg text-sans bg-brandingLightYellow">
				
				<div className="overflow-hidden w-[100%] h-[67.27%] rounded-lg border-[2px] border-brandingDarkGreen border-solid">
					<img alt="Imagen principal" src={publicationInfo.mainImage?.url} 
						className="w-[100%] max-h-[100%]"
					/>
				</div>

				<div className="flex flex-col justify-between w-[100%] h-[34.2%]">
					{
						publicationInfo.title.length > 20
							? (
								<h3 className="mt-[9.27px] text-center font-semibold text-[16.4px]">
									{publicationInfo.title}
								</h3>
							)
							: (
								<h3 className="mt-[9.27px] text-center font-semibold text-[19.74px]">
									{publicationInfo.title}
								</h3>
							)
					}

					<div className="flex justify-between items-center w-[100%] font-light text-[11px]">
						<div className="flex items-center">
							<img alt="" src="/icons/like.png" />

							<p className="ml-[2px]">
								{publicationInfo.score}
							</p>
						</div>

						<div className="flex items-center">
							<p className="mr-[2px]">
								Estado
							</p>

							<div className="w-[15px] h-[15px] rounded-full bg-brandingDarkGreen"></div>
						</div>
					</div>

				</div>
			</div>
		</Link>
	);
}

export default PublicationCard;
