import { PublicationInfoType } from "../../admin/adminTypes";
import PublicationImagesViewer from "./PublicationImagesViewer";
import GeoViewer from "../../geolocator/GeoViewer";
import { AddressCoordinatesType } from "../../../pages/admin/AdminPublicationDetails";
import { useUserRoleContext } from "../../../context/UserRoleContext";
import ContactProducer from "./ContactProducer";
import VotePublication from "./VotePublication";
import LoadingSmall from "../../modals/LoadingSmall";

type PublicationDetailsProps = {
	areMapCoordinatesLoaded: boolean;
	publicationInfo: PublicationInfoType;
	addressCoordinates: AddressCoordinatesType;
	isVoteChangedFlag?: null | string;
	handleImageOnClick: (pictureId: string) => void;
	handleVotePublication: () => void;
};

export default function PublicationDetails({
	areMapCoordinatesLoaded,
	publicationInfo,
	addressCoordinates,
	isVoteChangedFlag,
	handleImageOnClick,
	handleVotePublication
}: PublicationDetailsProps) {
	const { userRole } = useUserRoleContext();

	return (
		<div className="flex flex-col items-start w-[100%] text-sans">
			<h1
				className="mb-[1.6rem] text-[2rem] font-bold capitalize
				custom-500:mb-[2.5rem] custom-700:mb-[3.5rem] custom-1000:mb-[5rem] custom-1400:mb-[6.4rem]
				custom-500:text-[2.5rem] custom-700:text-[3rem] custom-1000:text-[3.5rem] custom-1400:text-[4.070rem] custom-1900:text-[4.5rem] custom-2500:text-[5rem]"
			>
				{`Huerta "${publicationInfo.title}"`}
			</h1>

			<h2
				className="opacity-50 w-auto px-[0.5rem] py-[1rem] mb-[1.6rem] rounded-[8px] shadow-below-dark text-[1.3rem]
				custom-500:mb-[2rem] custom-700:mb-[2.4rem]
				custom-500:p-[1rem]
				custom-500:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3rem]"
			>
				Fotos de la publicación
			</h2>

			<PublicationImagesViewer
				mainImg={publicationInfo.mainImage}
				secondaryImages={publicationInfo.images}
				handleImageOnClick={handleImageOnClick}
			/>

			<h2
				className="opacity-50 w-auto px-[0.5rem] py-[1rem] mt-[3.4rem] mb-[1.6rem] rounded-[8px] shadow-below-dark text-[1.3rem]
				custom-600:mt-[4rem]
				custom-500:mb-[2rem] custom-700:mb-[2.4rem]
				custom-500:p-[1rem]
				custom-500:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3rem]"
			>
				Texto de la publicación
			</h2>

			<div
				className="w-[100%] p-[0.8rem] text-[1rem] tracking-[0.15rem] shadow-around-light rounded-lg
				custom-500:p-[2rem_1rem_2rem_2rem] custom-700:p-[3rem_2.5rem_3rem_2rem] custom-1000:p-[3rem_3.5rem_3rem_2rem] custom-1400:p-[3rem_4.8rem_3rem_2.2rem] custom-1900:p-[4rem_6rem_4rem_3rem]
				custom-500:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[2.7rem]
				custom-500:tracking-[0px]"
			>
				<p>{publicationInfo.plantation.details}</p>
			</div>

			<h2
				className="opacity-50 w-auto px-[0.5rem] py-[1rem] mt-[3.4rem] mb-[1.6rem] rounded-[8px] shadow-below-dark text-[1.3rem]
				custom-600:mt-[4rem]
				custom-500:mb-[2rem] custom-700:mb-[2.4rem]
				custom-500:p-[1rem]
				custom-500:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3rem]"
			>
				Detalles
			</h2>

			<div
				className="flex justify-center items-center gap-[0.8rem] w-[100%] px-[0rem] py-[1.114rem] text-[0.8rem] text-center shadow-around-light rounded-lg
				custom-400:gap-[1rem] custom-640:gap-[1.6rem] custom-900:gap-[2.5rem] custom-1000:gap-[3rem] custom-1200:gap-[4rem] custom-1400:gap-[4.8rem]
				custom-700:py-[1.6rem] custom-1000:py-[2rem] custom-2500:py-[4rem]
				custom-390:text-[0.9rem] custom-500:text-[1rem] custom-600:text-[1.2rem] custom-700:text-[1.4rem] custom-900:text-[1.6rem] custom-1900:text-[1.8rem] custom-2500:text-[2.3rem] custom-3500:text-[2.6rem]"
			>
				<div className="flex flex-col text-darkText">
					<h3 className="font-semibold">Superficie</h3>
					<div
						className="flex justify-center items-center w-[20vw] aspect-[83/75.45] my-[1rem] rounded-lg bg-brandingLightGreen
						custom-700:w-[18vw] custom-900:w-[17vw] custom-1200:w-[14vw] custom-1400:w-[12.225vw]"
					>
						<img src="/icons/publications_details/aspect_ratio.png" alt="Superficie" className="w-[23.5%]" />
					</div>
					<p>{publicationInfo.plantation.area}</p>
				</div>

				<div className="flex flex-col text-darkText">
					<h3 className="font-semibold">Tipo de cosecha</h3>
					<div
						className="flex justify-center items-center w-[20vw] aspect-[83/75.45] my-[1rem] rounded-lg bg-brandingLightGreen
						custom-700:w-[18vw] custom-900:w-[17vw] custom-1200:w-[14vw] custom-1400:w-[12.225vw]"
					>
						<img src="/icons/publications_details/menstrual_health.png" alt="Tipo de Cosecha" className="w-[23.5%]" />
					</div>
					<p>{publicationInfo.plantation.harvestType}</p>
				</div>

				<div className="flex flex-col text-darkText">
					<h3 className="font-semibold">Tipo de riego</h3>
					<div
						className="flex justify-center items-center w-[20vw] aspect-[83/75.45] my-[1rem] rounded-lg bg-brandingLightGreen
						custom-700:w-[18vw] custom-900:w-[17vw] custom-1200:w-[14vw] custom-1400:w-[12.225vw]"
					>
						<img src="/icons/publications_details/humidity_mid.png" alt="Tipo de Riego" className="w-[23.5%]" />
					</div>
					<p>{publicationInfo.plantation.irrigationType}</p>
				</div>

				<div className="flex flex-col text-darkText">
					<h3 className="font-semibold">Tipo de producción</h3>
					<div
						className="flex justify-center items-center w-[20vw] aspect-[83/75.45] my-[1rem] rounded-lg bg-brandingLightGreen
						custom-700:w-[18vw] custom-900:w-[17vw] custom-1200:w-[14vw] custom-1400:w-[12.225vw]"
					>
						<img src="/icons/publications_details/agriculture.png" alt="Tipo de Producción" className="w-[23.5%]" />
					</div>
					<p>{publicationInfo.plantation.productionType}</p>
				</div>
			</div>

			<div
				className="flex flex-col justify-between items-center w-[100%] mt-[3rem]
					custom-1200:flex-row
					custom-1200:items-start
					custom-1200:mt-[5rem]"
			>
				<div
					className="flex flex-col items-start w-[100%]
					custom-1200:w-[66%]"
				>
					<h2
						className="opacity-50 w-auto px-[0.5rem] py-[1rem] mt-[3.4rem] mb-[1.6rem] rounded-[8px] shadow-below-dark text-[1.3rem]
						custom-600:mt-[4rem]
						custom-500:mb-[2rem] custom-700:mb-[2.4rem]
						custom-500:p-[1rem]
						custom-500:text-[1.6rem] custom-1900:text-[2rem] custom-2500:text-[3rem]"
					>
						Ubicación
					</h2>

					<div className="z-10 w-[100%] aspect-[397/129] overflow-hidden rounded-xl border-[0.5px] border-black border-solid">
						{areMapCoordinatesLoaded ? (
							addressCoordinates ? (
								<GeoViewer
									addressString={publicationInfo.author.address}
									addressCoordinates={addressCoordinates}
									plantationName={publicationInfo.title}
								/>
							) : (
								<div className="flex justify-center items-center w-full h-full">
									<p
										className="text-[1.7rem] text-brandingDarkGreen font-lato font-semibold drop-shadow-smallText
										custom-950:text-[2rem]"
									>
										No se ha podido obtener la dirección
									</p>
								</div>
							)
						) : (
							<div className="flex justify-center items-center w-full h-full">
								<LoadingSmall />
							</div>
						)}
					</div>
				</div>

				{userRole === "ADMIN" ? (
					<ContactProducer publicationInfo={publicationInfo} />
				) : (
					<VotePublication
						isVoted={publicationInfo.userVote}
						handleVotePublication={handleVotePublication}
						isVoteChangedFlag={isVoteChangedFlag}
					/>
				)}
			</div>
		</div>
	);
}
