import { useRef, useState } from "react";
import { MainImageType } from "../admin/adminTypes";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export type SliderInfoType = {
	pictures: MainImageType[];
	selectedImg: string;
};

type PictureSliderProps = {
	sliderInfo: SliderInfoType;
	handleImageOnClick: () => void;
};

function PictureSlider({ sliderInfo, handleImageOnClick }: PictureSliderProps) {
	const initialMainImgIndex = sliderInfo.pictures.findIndex((element) => {
		return element.id === sliderInfo.selectedImg;
	});
	const initialMainImg = sliderInfo.pictures[initialMainImgIndex].url;

	const [mainImg, setMainImg] = useState<string>(initialMainImg);
	const mainImgElement = useRef<HTMLImageElement>(null);
	const prevImgElement = useRef<HTMLImageElement>(null);
	const nextImgElement = useRef<HTMLImageElement>(null);
	const prevImgElementTimeout = useRef<number>();
	const nextImgElementTimeout = useRef<number>();

	let prevImg: string = "";
	let nextImg: string = "";

	const mainImgIndex = sliderInfo.pictures.findIndex((element) => {
		return element.url === mainImg;
	});

	if (mainImgIndex < sliderInfo.pictures.length - 1) {
		nextImg = sliderInfo.pictures[mainImgIndex + 1].url;
	} else {
		nextImg = sliderInfo.pictures[0].url;
	}

	if (mainImgIndex > 0) {
		prevImg = sliderInfo.pictures[mainImgIndex - 1].url;
	} else {
		prevImg = sliderInfo.pictures[sliderInfo.pictures.length - 1].url;
	}

	function changeToPrevImg() {
		if (!prevImgElement.current!.classList.contains("animate-sliderPrevImgGoRight")) {
			prevImgElement.current!.classList.add("animate-sliderPrevImgGoRight");
			mainImgElement.current!.classList.add("animate-sliderMainImgGoRight");

			prevImgElementTimeout.current = window.setTimeout(() => {
				setMainImg(prevImg);
				prevImgElement.current!.classList.remove("animate-sliderPrevImgGoRight");
				mainImgElement.current!.classList.remove("animate-sliderMainImgGoRight");
			}, 750);
		}
	}

	function changeToNextImg() {
		if (!nextImgElement.current!.classList.contains("animate-sliderNextImgGoLeft")) {
			nextImgElement.current!.classList.add("animate-sliderNextImgGoLeft");
			mainImgElement.current!.classList.add("animate-sliderMainImgGoLeft");

			nextImgElementTimeout.current = window.setTimeout(() => {
				setMainImg(nextImg);
				nextImgElement.current!.classList.remove("animate-sliderNextImgGoLeft");
				mainImgElement.current!.classList.remove("animate-sliderMainImgGoLeft");
			}, 750);
		}
	}

	return (
		<div className="z-50 fixed top-0 left-0 flex flex-col justify-center items-center w-screen bg-semiTansparentBlack h-screen">
			<div className="relative flex justify-center items-center w-[57vw] h-[70vh] overflow-hidden bg-publicationCardsBg bg-no-repeat bg-cover text-center text-black font-sans border-[2px] border-brandingDarkGreen border-solid rounded-2xl">
				<img ref={mainImgElement} alt="" src={mainImg} className="absolute z-0 left-[0%] w-[70vw] duration-700" />
				<img ref={prevImgElement} alt="" src={prevImg} className="absolute z-10 left-[-100%] w-[70vw]" />
				<img ref={nextImgElement} alt="" src={nextImg} className="absolute z-10 right-[-100%] w-[70vw]" />
				<p
					role="button"
					onClick={handleImageOnClick}
					className="absolute top-[5px] right-[5px] z-20 flex justify-center items-center w-[50px] h-[50px] rounded-full bg-green300 hover:bg-brandingLightGreen text-[24px] font-bold cursor-pointer duration-300"
				>
					X
				</p>

				{sliderInfo.pictures.length > 1 && (
					<>
						<div
							onClick={changeToPrevImg}
							className="absolute top-[40%] left-[2%] z-20 flex justify-center items-center w-[4vw] h-[8vw] bg-screenDarkening hover:bg-semiTansparentBlack hover:scale-110 rounded-xl text-brandingLightGreen text-[45px] cursor-pointer duration-300"
						>
							<ArrowBackIosNewRoundedIcon color="inherit" fontSize="inherit" />
						</div>
						<div
							onClick={changeToNextImg}
							className="absolute top-[40%] right-[2%] z-20 flex justify-center items-center w-[4vw] h-[8vw] bg-screenDarkening hover:bg-semiTansparentBlack hover:scale-110 rounded-xl text-brandingLightGreen text-[45px] cursor-pointer duration-300"
						>
							<ArrowForwardIosRoundedIcon color="inherit" fontSize="inherit" />
						</div>
					</>
				)}
			</div>

			<div className="mt-[2rem] text-brandingLightGreen text-[20px]">{`${mainImgIndex + 1} de ${sliderInfo.pictures.length}`}</div>
		</div>
	);
}

export default PictureSlider;
