import { useEffect, useState } from "react";

type PublicationPreviewProps = {
	mainImage: File;
	title: string;
	productionType: string;
	mainText: string;
	handleClose: () => void;
};

function PublicationPreview({ mainImage, title, productionType, mainText, handleClose }: PublicationPreviewProps) {
	const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
	let shortenedMainText = "";
	if (mainText.length > 80) {
		shortenedMainText = mainText.slice(0, 80) + "...";
	} else {
		shortenedMainText = mainText;
	}

	useEffect(() => {
		if (mainImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageSrc(reader.result);
			};
			reader.readAsDataURL(mainImage);
		}
	}, [mainImage]);

	return (
		<div
			onClick={handleClose}
			className="z-[1000] fixed top-0 left-0 flex justify-center items-center w-screen bg-semiTansparentBlack h-screen"
		>
			<div className="w-[550px] overflow-hidden rounded-lg bg-white">
				<div className="flex justify-center items-center overflow-hidden w-full h-[308.54px] bg-publicationCardsBg">
					<img
						src={imageSrc ? (imageSrc as string) : "/images/backgrounds/cards-background.jpg"}
						alt="Image Preview"
						className="mx-auto"
					/>
				</div>

				<div className="px-[27px] my-[26px]">
					<h3 className="text-[33.54px] font-semibold leading-tight">{title ? title : "Campo sin cumplimentar"}</h3>
					<p className="mt-[5px] text-[20.12px] font-semibold">
						{productionType ? productionType : "Campo sin cumplimentar"}
					</p>
					<p className="mt-[27px] text-[20.12px] font-normal">
						{mainText ? shortenedMainText : "Campo sin cumplimentar"}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PublicationPreview;
