import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


type PublicationPreviewCardProps = {
	id: number,
	author: string,
	mainImage: string,
	title: string,
	mainText: string
};

function PublicationPreviewCard({ id, mainImage, title, author, mainText }: PublicationPreviewCardProps) {
	const [maxChars, setMaxChars] = useState(0);
	const cardContainer = useRef<HTMLDivElement>(null);

	const linkUrl = `/publications/${id}`;


	function calcMaxChars() {
		const cardWidth = cardContainer.current?.clientWidth;
		const newMaxCharsValue = (cardWidth as number * 65) / 190;
		setMaxChars(newMaxCharsValue);
	}

	function generatePreviewText() {
		const fixedText = mainText.substring(0, maxChars);					// The minimun number of characters we´re going to show
		let finalPreviewText = fixedText;

		if (fixedText[maxChars] !== " " && fixedText[maxChars] !== ".") {			// We don't want the text to end in the middle of a word, so if "fixedText" does not end in a space " " or a period ".", we save a part of the text that comes next to look for a space (the end of a word or a phrase)
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
			<div className="flex flex-col w-[328px] h-[320] overflow-hidden border-2 border-black border-solid rounded-lg"
				ref={cardContainer} key={id} >

				<div className="w-full h-[184px]">
					<img alt="Publication Main Image" src={mainImage} className="w-full h-full object-contain" />
				</div>

				<div className="w-full h-[136px] p-5">
					<h3 className="text-[19.78px] font-bold">
						{title}
					</h3>

					<p className="text-[12.22px] font-bold">
						{author}
					</p>

					<p className="text-[12px] leading-relaxed pt-3">
						{generatePreviewText()} 
						<span> ...</span>
					</p>
				</div>

			</div>
		</Link>
	);
}

export default PublicationPreviewCard;
