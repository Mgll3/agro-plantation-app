import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserRoleContext } from "../../../context/UserRoleContext";

type PublicationPreviewCardProps = {
	id: number;
	author: string;
	mainImage: string | undefined;
	title: string;
	mainText: string;
};

function PublicationPreviewCard({ id, mainImage, title, author, mainText }: PublicationPreviewCardProps) {
	const { userRole } = useUserRoleContext();
	const [maxChars, setMaxChars] = useState(0);
	const cardContainer = useRef<HTMLDivElement>(null);

	let linkUrl = "/";

	if (userRole === "USER") linkUrl = `user/publications/details/${id}`;
	if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") linkUrl = `producer/publications/details/${id}`;

	function calcMaxChars() {
		const cardWidth = cardContainer.current?.clientWidth;
		const newMaxCharsValue = ((cardWidth as number) * 40) / 190;
		setMaxChars(newMaxCharsValue);
	}

	function generatePreviewText() {
		const fixedText = mainText.substring(0, maxChars); // The minimun number of characters we´re going to show
		let finalPreviewText = fixedText;

		if (fixedText[maxChars] !== " " && fixedText[maxChars] !== "." && fixedText[maxChars + 1]) {
			// We don't want the text to end in the middle of a word, so if "fixedText" does not end in a space " " or a period ".", we save a part of the text that comes next to look for a space (the end of a word or a phrase)
			const restOfText = mainText.substring(maxChars + 1, 100);
			const indexOfNextSpace = restOfText.indexOf(" ");
			const endingText = restOfText.substring(0, indexOfNextSpace);
			finalPreviewText += endingText;
		}

		return finalPreviewText;
	}

	useEffect(() => {
		calcMaxChars();

		window.addEventListener("resize", calcMaxChars);

		return () => {
			removeEventListener("resize", calcMaxChars);
		};
	});

	return (
		<Link to={linkUrl}>
			<div
				className="flex flex-col w-[183px] h-[182px] overflow-hidden border-2 border-black border-solid rounded-3xl
					custom-500:w-[220px] custom-900:w-[250px] custom-1000:w-[300px] custom-1400:w-[328px] custom-1900:w-[370px] custom-2500:w-[500px] custom-3500:w-[700px]
					custom-500:h-[200px] custom-900:h-[240px] custom-1000:h-[290px] custom-1400:h-[320px] custom-1900:h-[360px] custom-2500:h-[490px] custom-3500:h-[690px]"
				ref={cardContainer}
				key={id}
			>
				<div
					className="w-full h-[87px] bg-publicationCardsBg bg-cover
						custom-500:h-[94px] custom-900:h-[112.8px] custom-1000:h-[160px] custom-1400:h-[184px] custom-1900:h-[194px] custom-2500:h-[279px] custom-3500:h-[393px]"
				>
					{mainImage ? (
						<img alt="Publication Main Image" src={mainImage} className="w-full h-full object-contain" />
					) : (
						<div className="flex justify-center items-center w-full h-full">
							<p className="text-[2rem] font-semibold text-brandingLightGreen drop-shadow-custom">Sin Imagen</p>
						</div>
					)}
				</div>

				<div
					className="w-full pt-[0.1rem] pl-[0.4rem] pr-[1.9rem] pb-[1.2rem] font-sans
					custom-500:p-[0.6rem] custom-1400:p-[1.6rem] custom-1900:p-[2rem] custom-2500:p-[2.5rem]
					custom-1900:flex custom-1900:flex-col custom-1900:grow"
				>
					<h3
						className="text-[1.2rem] font-semibold tracking-[0.05rem]
							custom-500:text-[1.3rem] custom-900:text-[1.5rem] custom-1000:text-[1.978rem] custom-1900:text-[2rem] custom-2500:text-[2.7rem] custom-3500:text-[3.5rem]
							custom-1400:font-bold
							custom-1400:tracking-[0rem]"
					>
						{title}
					</h3>

					<p
						className="pt-[0.4rem] text-[1rem] font-normal tracking-[0.15rem] 
							custom-500:text-[1.1rem] custom-900:text-[1.222rem] custom-1900:text-[1.6rem] custom-2500:text-[2.2rem] custom-3500:text-[3rem]
							custom-1000:font-bold"
					>
						{author}
					</p>

					<p
						className="pt-[0.8rem] text-[0.9rem] leading-[120%]
							custom-500:text-[1rem] custom-900:text-[1.2rem] custom-1900:text-[1.5rem] custom-2500:text-[2.2rem] custom-3500:text-[3rem]
							custom-900:leading-[140%] custom-1400:leading-[2rem] custom-3500:leading-[4rem]
							custom-500:pt-[1.2rem] custom-1400:pt-[1.6rem] custom-1900:pt-[2rem]
							custom-1900:flex custom-1900:grow custom-1900:items-center"
					>
						{`${generatePreviewText()}${maxChars + 1 < mainText.length ? "..." : ""}`}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default PublicationPreviewCard;
