import { PublicationInfoType } from "../adminTypes";
import ShareIcon from "@mui/icons-material/Share";
import PublicationImagesViewer from "./PublicationImagesViewer";
import GeoViewer from "../../geolocator/GeoViewer";
import Button from "../../button/Button";
import { AddressCoordinatesType } from "../../../pages/admin/AdminPendingPublicationDetails";

type PublicationDetailsProps = {
	publicationInfo: PublicationInfoType;
	addressCoordinates: AddressCoordinatesType;
};

export default function PublicationDetails({ publicationInfo, addressCoordinates }: PublicationDetailsProps) {
	const contactButtonFuncionality = {
		actionText: "Contactar",
		handleClick: contactProducer
	};

	function contactProducer() {
		const email = "***Email del Productor***";
		const mailto = `mailto:${email}`;
		window.location.href = mailto;
	}

	return (
		<div className="flex flex-col items-start w-[100%] text-sans">
			<div className="flex justify-between w-[100%] mb-[4rem] text-[40.70px]">
				<h1 className="font-bold capitalize">{`Huerta "${publicationInfo.title}"`}</h1>
				<div className="pr-[2rem] cursor-pointer" role="button">
					<ShareIcon color="inherit" fontSize="inherit" />
				</div>
			</div>

			<h2 className="opacity-50 w-auto p-[0.5rem] mb-[1.5rem] rounded-[8px] shadow-below-dark text-[16px]">
				Fotos de la publicación
			</h2>

			<PublicationImagesViewer mainImg={publicationInfo.mainImage} secondaryImages={publicationInfo.images} />

			<h2 className="opacity-50 w-auto p-[0.5rem] mt-[3rem] mb-[1.5rem] rounded-[8px] shadow-below-dark text-[16px]">
				Texto de la publicación
			</h2>

			<div className="w-[100%] px-[1.5rem] py-[2rem] shadow-around-light rounded-lg">
				<p>{publicationInfo.plantation.details}</p>
			</div>

			<h2 className="opacity-50 w-auto p-[0.5rem] mt-[3rem] mb-[1.5rem] rounded-[8px] shadow-below-dark text-[16px]">
				Detalles
			</h2>

			<div className="flex justify-center items-center gap-[3rem] w-[100%] px-[1.5rem] py-[2rem] shadow-around-light rounded-lg">
				<div className="flex flex-col text-darkText text-[16px]">
					<h3 className="font-semibold">Superficie</h3>
					<div className="flex justify-center items-center w-[14vw] h-[13vw] my-[1rem] rounded-lg bg-brandingLightGreen">
						<img src="/icons/publications_details/aspect_ratio.png" alt="Superficie" />
					</div>
					<p>{publicationInfo.plantation.area}</p>
				</div>

				<div className="flex flex-col text-darkText text-[16px]">
					<h3 className="font-semibold">Tipo de cosecha</h3>
					<div className="flex justify-center items-center w-[14vw] h-[13vw] my-[1rem] rounded-lg bg-brandingLightGreen">
						<img src="/icons/publications_details/menstrual_health.png" alt="Superficie" />
					</div>
					<p>{publicationInfo.plantation.harvestType}</p>
				</div>

				<div className="flex flex-col text-darkText text-[16px]">
					<h3 className="font-semibold">Tipo de riego</h3>
					<div className="flex justify-center items-center w-[14vw] h-[13vw] my-[1rem] rounded-lg bg-brandingLightGreen">
						<img src="/icons/publications_details/humidity_mid.png" alt="Superficie" />
					</div>
					<p>{publicationInfo.plantation.irrigationType}</p>
				</div>

				<div className="flex flex-col text-darkText text-[16px]">
					<h3 className="font-semibold">Tipo de producción</h3>
					<div className="flex justify-center items-center w-[14vw] h-[13vw] my-[1rem] rounded-lg bg-brandingLightGreen">
						<img src="/icons/publications_details/agriculture.png" alt="Superficie" />
					</div>
					<p>{publicationInfo.plantation.productionType}</p>
				</div>
			</div>

			<h2 className="opacity-50 w-auto p-[0.5rem] mt-[3rem] mb-[1.5rem] rounded-[8px] shadow-below-dark text-[16px]">
				Descripción
			</h2>

			<div className="w-[100%] px-[1.5rem] py-[2rem] font-light text-lightGrayText text-[19.78px] shadow-around-light rounded-lg">
				<p>{publicationInfo.plantation.details}</p>
			</div>

			<div className="flex justify-between w-[100%] mt-[3rem]">
				<div className="flex flex-col items-start w-[66%]">
					<h2 className="opacity-50 w-auto p-[0.5rem] mt-[3rem] mb-[1.5rem] rounded-[8px] shadow-below-dark text-[16px]">
						Ubicación
					</h2>
					<div className="z-10 w-[100%] h-[226px] overflow-hidden rounded-xl border-[0.5px] border-black border-solid">
						{addressCoordinates ? (
							<GeoViewer
								addressString={publicationInfo.author.address}
								addressCoordinates={addressCoordinates}
								plantationName={publicationInfo.title}
							/>
						) : (
							<p>No se ha podido obtener la dirección</p>
						)}
					</div>
				</div>

				<div className="flex flex-col items-center w-[28%] mr-[1rem] mt-[1.1rem]">
					<h2 className="font-semibold text-[18.12px]">Contactar con productor</h2>

					<div className="w-[100%] my-[1.5rem] border-[1px] border-ligthGrayText2 border-solid"></div>

					<div className="flex flex-col items-center mb-[3.5rem] py-[1rem] px-[2rem] bg-veryLightGrey">
						<p className="font-semibold text-[14.66px] text-black">{`${publicationInfo.author.name} ${publicationInfo.author.lastname}`}</p>
						<p className="font-normal text-[14.66px] text-darkGrayText2">Productor Local</p>

						<div className="flex w-[100%] mt-[1rem]">
							<img className="h-[15px]" src="/icons/contact/phone.png" alt="" />
							<p className="ml-[1rem] font-normal text-darkText text-[10.99px]">***Teléfono***</p>
						</div>

						<div className="flex w-[100%] mt-[0.6rem]">
							<img src="/icons/contact/building.png" alt="" />
							<p className="ml-[1rem] font-normal text-darkText text-[10.99px]">{publicationInfo.author.address}</p>
						</div>

						<div className="flex w-[100%] mt-[0.6rem]">
							<img src="/icons/contact/envelope.png" alt="" />
							<p className="ml-[1rem] font-normal text-darkText text-[10.99px]">***Email del Productor***</p>
						</div>
					</div>

					<Button
						buttonColor="green"
						buttonFontSize="text-[13.74px]"
						buttonWidth="w-[100%]"
						buttonPaddingY="py-[1rem]"
						buttonFuncionality={contactButtonFuncionality}
					/>
				</div>
			</div>
		</div>
	);
}
