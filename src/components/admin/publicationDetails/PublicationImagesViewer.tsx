import { MainImageType } from "../adminTypes";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

type PublicationImagesViewerProps = {
	mainImg: MainImageType | null;
	secondaryImages: MainImageType[] | null;
	handleImageOnClick: (pictureId: string) => void;
};

function PublicationImagesViewer({ mainImg, secondaryImages, handleImageOnClick }: PublicationImagesViewerProps) {
	const mainPicture = mainImg?.url ? mainImg : null;
	let secondaryPicture1: MainImageType | null = null;
	let secondaryPicture2: MainImageType | null = null;
	let secondaryPicture3: MainImageType | null = null;
	let leftPicturesNumber = 0;

	if (secondaryImages) {
		secondaryPicture1 = secondaryImages?.[0] && secondaryImages[0];
		secondaryPicture2 = secondaryImages?.[1] && secondaryImages[1];
		secondaryPicture3 = secondaryImages?.[2] && secondaryImages[2];
		leftPicturesNumber = secondaryImages.length - 3;
	}

	const mainPictureBg = mainPicture ? "bg-publicationCardsBg" : "bg-green300";
	const secondaryPicture1Bg = secondaryPicture1 ? "bg-publicationCardsBg" : "bg-green300";
	const secondaryPicture2Bg = secondaryPicture2 ? "bg-publicationCardsBg" : "bg-green300";
	const secondaryPicture3Bg = secondaryPicture3 ? "bg-publicationCardsBg" : "bg-green300";

	//Estas son las funciones que activará el recuadro que muestra las imágenes restantes al ser pulsado. Si no hay imágenes restantes no hará nada
	function handleLeftPicturesOnClick() {
		if (leftPicturesNumber > 0) {
			if (secondaryImages && secondaryImages[3]) handleImageOnClick(secondaryImages[3].id);
		} else {
			return;
		}
	}

	//Este es el estilo que se aplicará al cursor en el último recuadro.
	const pointerStyle = leftPicturesNumber > 0 ? "cursor-pointer" : "";

	return (
		<div className="flex w-[100%] gap-[1rem] select-none">
			<div
				className={`flex justify-center items-center w-[50%] h-[50vh] overflow-hidden text-[100px] rounded-xl ${mainPictureBg} bg-cover border-[2px] border-brandingDarkGreen border-solid`}
			>
				{mainPicture ? (
					<img
						className="w-[100%] cursor-pointer"
						src={mainPicture.url}
						alt=""
						onClick={() => handleImageOnClick(mainPicture.id)}
					/>
				) : (
					<NoPhotographyIcon fontSize="inherit" />
				)}
			</div>

			<div className="flex flex-wrap w-[50%] h-[50vh] gap-[1rem] text-[100px]">
				<div
					className={`flex justify-center items-center w-[48.5%] h-[48%] overflow-hidden rounded-xl ${secondaryPicture1Bg}`}
				>
					{secondaryPicture1 ? (
						<img
							className="w-[100%] cursor-pointer"
							src={secondaryPicture1.url}
							alt=""
							onClick={() => handleImageOnClick((secondaryPicture1 as MainImageType).id)}
						/>
					) : (
						<NoPhotographyIcon fontSize="inherit" />
					)}
				</div>
				<div
					className={`flex justify-center items-center w-[48.5%] h-[48%] overflow-hidden rounded-xl ${secondaryPicture2Bg}`}
				>
					{secondaryPicture2 ? (
						<img
							className="w-[100%] cursor-pointer"
							src={secondaryPicture2.url}
							alt=""
							onClick={() => handleImageOnClick((secondaryPicture2 as MainImageType).id!)}
						/>
					) : (
						<NoPhotographyIcon fontSize="inherit" />
					)}
				</div>
				<div
					className={`flex justify-center items-center w-[48.5%] h-[48%] overflow-hidden rounded-xl ${secondaryPicture3Bg}`}
				>
					{secondaryPicture3 ? (
						<img
							className="w-[100%] cursor-pointer"
							src={secondaryPicture3.url}
							alt=""
							onClick={() => handleImageOnClick((secondaryPicture3 as MainImageType).id!)}
						/>
					) : (
						<NoPhotographyIcon fontSize="inherit" />
					)}
				</div>

				<div
					onClick={handleLeftPicturesOnClick}
					className={`flex justify-center items-center gap-[0.6rem] w-[48.5%] h-[48%] overflow-hidden text-darkText rounded-xl bg-brandingLightGreen ${pointerStyle}`}
				>
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
							<p className="text-[16px] font-bold">No hay más imágenes</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default PublicationImagesViewer;
