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
			<div
				className="w-[300px] overflow-hidden rounded-lg bg-white
				custom-390:w-[330px] custom-400:w-[360px] custom-500:w-[400px] custom-900:w-[500px] custom-1400:w-[550px] custom-1900:w-[650px] custom-2500:w-[850px] custom-3500:w-[1200px]
				custom-1900:rounded-xl custom-2500:rounded-2xl"
			>
				<div className="flex justify-center items-center overflow-hidden w-full aspect-[300/168] bg-publicationCardsBg bg-no-repeat bg-cover">
					{imageSrc && <img src={imageSrc as string} alt="Image Preview" className="mx-auto" />}
				</div>

				<div className="px-[27px] my-[26px]">
					<h3
						className="text-[2.017rem] font-semibold leading-tight
						custom-500:text-[2.3rem] custom-900:text-[2.8rem] custom-1400:text-[3.354rem] custom-2500:text-[4rem] custom-3500:text-[5.5rem]"
					>
						{title ? title : "Campo sin cumplimentar"}
					</h3>
					<p
						className="mt-[5px] text-[1.21rem] font-semibold
						custom-500:text-[1.6rem] custom-900:text-[1.9rem] custom-1400:text-[2.012rem] custom-2500:text-[2.8rem] custom-3500:text-[4rem]"
					>
						{productionType ? productionType : "Campo sin cumplimentar"}
					</p>
					<p
						className="mt-[27px] text-[1.21rem] font-normal
						custom-500:text-[1.6rem] custom-900:text-[1.9rem] custom-1400:text-[2.012rem] custom-2500:text-[2.8rem] custom-3500:text-[4rem]"
					>
						{mainText ? shortenedMainText : "Campo sin cumplimentar"}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PublicationPreview;
