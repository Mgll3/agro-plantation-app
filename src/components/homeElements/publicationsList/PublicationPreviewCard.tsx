import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type PublicationPreviewCardProps = {
	id: number;
	author: string;
	mainImage: string;
	title: string;
	mainText: string;
};

function PublicationPreviewCard({ id, mainImage, title, author, mainText }: PublicationPreviewCardProps) {
	const [maxChars, setMaxChars] = useState(0);
	const cardContainer = useRef<HTMLDivElement>(null);

	const linkUrl = `/publications/${id}`;

	function calcMaxChars() {
		const cardWidth = cardContainer.current?.clientWidth;
		const newMaxCharsValue = ((cardWidth as number) * 65) / 190;
		setMaxChars(newMaxCharsValue);
	}

	function generatePreviewText() {
		const fixedText = mainText.substring(0, maxChars); // The minimun number of characters we´re going to show
		let finalPreviewText = fixedText;

		if (fixedText[maxChars] !== " " && fixedText[maxChars] !== ".") {
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
				className="flex flex-col w-[191px] h-[172px] overflow-hidden border-2 border-black border-solid rounded-3xl
					custom-1400:w-[328px] custom-1400:h-[320px]"
				ref={cardContainer}
				key={id}
			>
				<div
					className="w-full h-[87px] bg-publicationCardsBg
						custom-1400:h-[184px]"
				>
					<img alt="Publication Main Image" src={mainImage} className="w-full h-full object-contain" />
				</div>

				<div className="w-full pt-[0.1rem] pl-[0.4rem] pr-[1.9rem] pb-[1.2rem] font-sans">
					<h3
						className="text-[1.2rem] font-semibold tracking-[0.05rem]
							custom-1400:text-[1.978rem] custom-1400:font-bold custom-1400:tracking-[0rem]"
					>
						{title}
					</h3>

					<p
						className="pt-[0.4rem] text-[1rem] font-normal tracking-[0.15rem] 
							custom-1400:text-[1.222rem] custom-1400:font-bold"
					>
						{author}
					</p>

					<p
						className="pt-[0.8rem] text-[0.9rem] leading-[120%]
							custom-1400:text-[1.2rem] custom-1400:leading-[2rem]"
					>
						{generatePreviewText()}
						<span> ...</span>
					</p>
				</div>
			</div>
		</Link>
	);
}

export default PublicationPreviewCard;
