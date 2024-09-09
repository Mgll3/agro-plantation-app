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
		<div
			className="flex flex-col w-[100%] gap-[1.2rem] select-none
			custom-900:flex-row
			custom-900:gap-[1.3rem]
			custom-900:w-[100%]"
		>
			<div
				className={`flex justify-center items-center w-[100%] aspect-[535/420] overflow-hidden text-[100px] rounded-xl ${mainPictureBg} bg-cover border-[2px] border-brandingDarkGreen border-solid
					custom-900:w-[50%]`}
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

			<div
				className="flex flex-wrap justify-between w-[100%] aspect-[535/420] gap-x-[1.6rem] gap-y-[1.2rem] text-[100px]
				custom-900:gap-[1.4rem]
				custom-900:w-[50%]"
			>
				<div
					className={`flex justify-center items-center w-[47.4%] aspect-[253/202] overflow-hidden rounded-xl bg-cover bg-no-repeat ${secondaryPicture1Bg}
						custom-390:w-[47.7%] custom-400:w-[47.9%] custom-500:w-[48.2%] custom-600:w-[48.5%] custom-700:w-[48.7%] custom-900:w-[48.1%] custom-1200:w-[48.6%] custom-1900:w-[49%] custom-2500:w-[49.2%]`}
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
					className={`flex justify-center items-center w-[47.4%] aspect-[253/202] overflow-hidden rounded-xl bg-cover bg-no-repeat ${secondaryPicture2Bg}
						custom-390:w-[47.7%] custom-400:w-[47.9%] custom-500:w-[48.2%] custom-600:w-[48.5%] custom-700:w-[48.7%] custom-900:w-[48.1%] custom-1200:w-[48.6%] custom-1900:w-[49%] custom-2500:w-[49.2%]`}
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
					className={`flex justify-center items-center w-[47.4%] aspect-[253/202] overflow-hidden rounded-xl bg-cover bg-no-repeat ${secondaryPicture3Bg}
						custom-390:w-[47.7%] custom-400:w-[47.9%] custom-500:w-[48.2%] custom-600:w-[48.5%] custom-700:w-[48.7%] custom-900:w-[48.1%] custom-1200:w-[48.6%] custom-1900:w-[49%] custom-2500:w-[49.2%]`}
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
					className={`flex justify-center items-center gap-[0.6rem] w-[47.4%] aspect-[253/202] overflow-hidden text-darkText rounded-xl bg-brandingLightGreen ${pointerStyle}
						custom-390:w-[47.7%] custom-400:w-[47.9%] custom-500:w-[48.2%] custom-600:w-[48.5%] custom-700:w-[48.7%] custom-900:w-[48.1%] custom-1200:w-[48.6%] custom-1900:w-[49%] custom-2500:w-[49.2%]`}
				>
					{leftPicturesNumber > 0 ? (
						<>
							<div>
								<p
									className="text-montserrat text-[2.31rem] font-bold
									custom-2500:text-[4rem]"
								>
									<span>+</span>
									{leftPicturesNumber}
								</p>
							</div>

							<div>
								<p
									className="text-[12px] font-semibold
									custom-2500:text-[2.3rem]"
								>
									más
								</p>
								<p
									className="text-[16px] font-bold
									custom-2500:text-[2.8rem]"
								>
									Fotos
								</p>
							</div>
						</>
					) : (
						<div>
							<p
								className="text-[1.6rem] text-center font-bold
								custom-2500:text-[2.5rem]"
							>
								No hay más imágenes
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default PublicationImagesViewer;
