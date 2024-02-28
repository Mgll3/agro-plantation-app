import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PublicationPreviewType } from "./publicationsListTypes";

type PublicationPreviewCardProps = PublicationPreviewType;

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
			<div className="" ref={cardContainer} key={id} >

				<div className="">
					<img alt="Publication Main Image" src={mainImage} className="" />
				</div>

				<div className="">
					<h3 className="">{title}</h3>
					<p className="">{author}</p>
					<p className="">{generatePreviewText()} <span> (...)</span></p>
				</div>
			</div>
		</Link>
	);
}

export default PublicationPreviewCard;
