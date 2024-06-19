import { MainImageType } from "../adminTypes";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

type PublicationImagesViewerProps = {
	mainImg: MainImageType | null;
	secondaryImages: MainImageType[] | null;
};

function PublicationImagesViewer({ mainImg, secondaryImages }: PublicationImagesViewerProps) {
	const mainPicture = mainImg?.url ? mainImg.url : null;
	let secondaryPicture1 = null;
	let secondaryPicture2 = null;
	let secondaryPicture3 = null;
	let leftPicturesNumber = 0;

	if (secondaryImages) {
		secondaryPicture1 = secondaryImages?.[0] && secondaryImages[0].url;
		secondaryPicture2 = secondaryImages?.[1] && secondaryImages[1].url;
		secondaryPicture3 = secondaryImages?.[2] && secondaryImages[2].url;
		leftPicturesNumber = secondaryImages.length - 3;
	}

	return (
		<div className="flex w-[100%] gap-[1rem]">
			<div className="flex justify-center items-center w-[50%] h-[50vh] overflow-hidden text-[100px] rounded-xl bg-publicationCardsBg bg-cover border-[2px] border-brandingDarkGreen border-solid">
				{mainPicture ? <img className="w-[100%]" src={mainPicture} alt="" /> : <NoPhotographyIcon fontSize="inherit" />}
			</div>

			<div className="flex flex-wrap w-[50%] h-[50vh] gap-[1rem] text-[100px]">
				<div className="flex justify-center items-center w-[48.5%] h-[48%] overflow-hidden rounded-xl bg-publicationCardsBg">
					{secondaryPicture1 ? (
						<img className="w-[100%]" src={secondaryPicture1} alt="" />
					) : (
						<NoPhotographyIcon fontSize="inherit" />
					)}
				</div>
				<div className="flex justify-center items-center w-[48.5%] h-[48%] overflow-hidden rounded-xl bg-publicationCardsBg">
					{secondaryPicture2 ? (
						<img className="w-[100%]" src={secondaryPicture2} alt="" />
					) : (
						<NoPhotographyIcon fontSize="inherit" />
					)}
				</div>
				<div className="flex justify-center items-center w-[48.5%] h-[48%] overflow-hidden rounded-xl bg-publicationCardsBg">
					{secondaryPicture3 ? (
						<img className="w-[100%]" src={secondaryPicture3} alt="" />
					) : (
						<NoPhotographyIcon fontSize="inherit" />
					)}
				</div>

				<div className="flex justify-center items-center gap-[0.6rem] w-[48.5%] h-[48%] overflow-hidden text-darkText rounded-xl bg-brandingLightGreen cursor-pointer">
					{leftPicturesNumber > 0 ? (
						<>
							<div>
								<p className="text-montserrat text-[2.31rem] font-bold">
									<span>+</span>
									{leftPicturesNumber}
								</p>
							</div>

							<div>
								<p className="text-[12px] font-semibold">más</p>
								<p className="text-[16px] font-bold">Fotos</p>
							</div>
						</>
					) : (
						<div>
							<p className="text-[16px] font-bold">-No hay más imágenes-</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default PublicationImagesViewer;
