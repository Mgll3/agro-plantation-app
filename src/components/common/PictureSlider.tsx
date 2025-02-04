import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

	// Estas variables se almacenan el punto unicial y final (en el eje X) de un evento touch (swipe)
	const touchStartX = useRef<number>(0); // Initial touch coordinate
	const touchEndX = useRef<number>(0); // Final touch coordinate

	const prevImgElementTimeout = useRef<number>();
	const nextImgElementTimeout = useRef<number>();

	// Es necesario utilizar una referencia para almacenar prevImg y nextImg ya que su valor no se actualiza en las funciones que gestionan el swipe (el valor permanece igual al que tenía cuando se renderizó el componente cuando generamos un evento).
	const prevImg = useRef<string>("");
	const nextImg = useRef<string>("");

	const mainImgIndex = sliderInfo.pictures.findIndex((element) => {
		return element.url === mainImg;
	});

	if (mainImgIndex < sliderInfo.pictures.length - 1) {
		nextImg.current = sliderInfo.pictures[mainImgIndex + 1].url;
	} else {
		nextImg.current = sliderInfo.pictures[0].url;
	}

	if (mainImgIndex > 0) {
		prevImg.current = sliderInfo.pictures[mainImgIndex - 1].url;
	} else {
		prevImg.current = sliderInfo.pictures[sliderInfo.pictures.length - 1].url;
	}

	function changeToPrevImg() {
		if (!prevImgElement.current!.classList.contains("animate-sliderPrevImgGoRight")) {
			prevImgElement.current!.classList.add("animate-sliderPrevImgGoRight");
			mainImgElement.current!.classList.add("animate-sliderMainImgGoRight");

			prevImgElementTimeout.current = window.setTimeout(() => {
				setMainImg(prevImg.current);
			}, 750);
		}
	}

	function changeToNextImg() {
		if (!nextImgElement.current!.classList.contains("animate-sliderNextImgGoLeft")) {
			nextImgElement.current!.classList.add("animate-sliderNextImgGoLeft");
			mainImgElement.current!.classList.add("animate-sliderMainImgGoLeft");

			nextImgElementTimeout.current = window.setTimeout(() => {
				setMainImg(nextImg.current);
			}, 750);
		}
	}

	function touchstart(e: TouchEvent) {
		if (e.changedTouches.length > 0) {
			touchStartX.current = e.changedTouches[0].clientX;
		}
	}

	function touchend(e: TouchEvent) {
		if (e.changedTouches.length > 0) {
			touchEndX.current = e.changedTouches[0].clientX;
			const SWIPE_THRESHOLD = 40;

			if (touchStartX.current - touchEndX.current > SWIPE_THRESHOLD) {
				changeToNextImg();
			}

			if (touchStartX.current - touchEndX.current < -SWIPE_THRESHOLD) {
				changeToPrevImg();
			}
		}
	}

	useEffect(() => {
		return () => {
			clearTimeout(prevImgElementTimeout.current);
			clearTimeout(nextImgElementTimeout.current);
		};
	});

	useEffect(() => {
		// Esta parte añade el evento touchstart y touchend para gestionar el swipe.
		if (mainImgElement.current) {
			mainImgElement.current!.addEventListener("touchstart", touchstart);
			mainImgElement.current!.addEventListener("touchend", touchend);
		}

		return () => {
			if (mainImgElement.current) {
				mainImgElement.current.removeEventListener("touchstart", touchstart);
				mainImgElement.current.removeEventListener("touchend", touchend);
			}
		};
	}, []);

	useLayoutEffect(() => {
		prevImgElement.current!.classList.remove("animate-sliderPrevImgGoRight");
		mainImgElement.current!.classList.remove("animate-sliderMainImgGoRight");
		nextImgElement.current!.classList.remove("animate-sliderNextImgGoLeft");
		mainImgElement.current!.classList.remove("animate-sliderMainImgGoLeft");
	});

	return (
		<div className="z-50 fixed top-0 left-0 flex flex-col justify-center items-center w-screen bg-semiTansparentBlack h-screen select-none">
			<div
				className="relative flex justify-center items-center w-[90vw] aspect-[817.24/546.19] overflow-hidden bg-publicationCardsBg bg-no-repeat bg-cover text-center text-black font-sans border-[2px] border-brandingDarkGreen border-solid rounded-2xl
				custom-700:w-[80vw] custom-1000:w-[70vw] custom-1200:w-[57vw] custom-2500:w-[50vw]"
			>
				<img ref={mainImgElement} alt="" src={mainImg} className="absolute z-0 left-[0%] w-[100%] duration-700" />
				<img ref={prevImgElement} alt="" src={prevImg.current} className="absolute z-10 left-[-100%] w-[100%]" />
				<img ref={nextImgElement} alt="" src={nextImg.current} className="absolute z-10 right-[-100%] w-[100%]" />
				<p
					role="button"
					onClick={handleImageOnClick}
					className="absolute top-[5px] right-[5px] z-20 flex justify-center items-center w-[30px] aspect-[1/1] rounded-full bg-green300 hover:bg-brandingLightGreen text-[18px] font-bold cursor-pointer duration-300
						custom-1000:w-[40px] custom-1400:w-[50px] custom-2500:w-[70px]
						custom-1000:text-[24px] custom-1900:text-[30px] custom-2500:text-[40px]"
				>
					X
				</p>

				{sliderInfo.pictures.length > 1 && (
					<>
						<div
							onClick={changeToPrevImg}
							className="absolute top-[40%] left-[2%] z-20 flex justify-center items-center w-[10vw] h-[15vw] bg-screenDarkening hover:bg-semiTansparentBlack hover:scale-110 active:scale-90 rounded-xl text-brandingLightGreen text-[35px] cursor-pointer duration-300
								custom-500:w-[7vw] custom-1000:w-[5vw] custom-2500:w-[3vw]
								custom-500:h-[14vw] custom-1000:h-[10vw] custom-1400:h-[8vw] custom-2500:h-[7vw]
								custom-600:text-[40px] custom-700:text-[45px] custom-1400:text-[55px] custom-1900:text-[65px] custom-2500:text-[70px]"
						>
							<ArrowBackIosNewRoundedIcon color="inherit" fontSize="inherit" />
						</div>
						<div
							onClick={changeToNextImg}
							className="absolute top-[40%] right-[2%] z-20 flex justify-center items-center w-[10vw] h-[15vw] bg-screenDarkening hover:bg-semiTansparentBlack hover:scale-110 active:scale-90 rounded-xl text-brandingLightGreen text-[35px] cursor-pointer duration-300
								custom-500:w-[7vw] custom-1000:w-[5vw] custom-2500:w-[3vw]
								custom-500:h-[14vw] custom-1000:h-[10vw] custom-1400:h-[8vw] custom-2500:h-[7vw]
								custom-600:text-[40px] custom-700:text-[45px] custom-1400:text-[55px] custom-1900:text-[65px] custom-2500:text-[70px]"
						>
							<ArrowForwardIosRoundedIcon color="inherit" fontSize="inherit" />
						</div>
					</>
				)}
			</div>

			<div
				className="mt-[2rem] text-brandingLightGreen text-[2rem]
				custom-1900:text-[2.5rem] custom-2500:text-[3rem]"
			>
				{`${mainImgIndex + 1} de ${sliderInfo.pictures.length}`}
			</div>
		</div>
	);
}

export default PictureSlider;
