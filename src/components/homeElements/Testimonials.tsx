import { useEffect, useRef, useState } from "react";
import { testimonialsData } from "../../data/testimonialsData";

export type TestimonialsDataType = {
	header: string,
	mainText: string,
	imageUrl: string,
	imageAlt: string
}

function Testimonials() {
	const [selectedTestimonial, setSelectedTestimonial] = useState<number>(2);
	const prevTestimonialElement = useRef<HTMLDivElement>(null);
	const nextTestimonialElement = useRef<HTMLDivElement>(null);
	const prevTestimonialTimeout = useRef<number>();
	const nextTestimonialTimeout = useRef<number>();
	let selectedTestimonial2: number;
	let prevTestimonialIndex1: number;
	let prevTestimonialIndex2: number;
	let nextTestimonialIndex1: number;
	let nextTestimonialIndex2: number;


	if (selectedTestimonial < testimonialsData.length - 1) {
		selectedTestimonial2 = selectedTestimonial + 1;
	} else {
		selectedTestimonial2 = 0;
	}

	if (selectedTestimonial2 < testimonialsData.length - 1) {
		nextTestimonialIndex1 = selectedTestimonial2 + 1;
	} else {
		nextTestimonialIndex1 = 0;
	}

	if (nextTestimonialIndex1 < testimonialsData.length - 1) {
		nextTestimonialIndex2 = nextTestimonialIndex1 + 1;
	} else {
		nextTestimonialIndex2 = 0;
	}

	if (selectedTestimonial > 0) {
		prevTestimonialIndex2 = selectedTestimonial - 1;
	} else {
		prevTestimonialIndex2 = testimonialsData.length - 1;
	}

	if (prevTestimonialIndex2 > 0) {
		prevTestimonialIndex1 = prevTestimonialIndex2 - 1;
	} else {
		prevTestimonialIndex1 = testimonialsData.length - 1;
	}


	function prevClick () {
		prevTestimonialElement.current!.classList.add("duration-700");
		prevTestimonialElement.current!.classList.remove("left-[-100%]");
		prevTestimonialElement.current!.classList.add("left-[0%]");

		prevTestimonialTimeout.current = window.setTimeout( () => {
			prevTestimonialElement.current!.classList.remove("duration-700");
			prevTestimonialElement.current!.classList.remove("left-[0%]");
			prevTestimonialElement.current!.classList.add("left-[-100%]");

			if (selectedTestimonial >= 2) {
				setSelectedTestimonial(selectedTestimonial - 2);
			} else if (selectedTestimonial === 1) {
				setSelectedTestimonial(testimonialsData.length - 1);
			} else if (selectedTestimonial === 0) {
				setSelectedTestimonial(testimonialsData.length - 2);
			}

		},800);
	}


	function nextClick () {
		nextTestimonialElement.current!.classList.add("duration-700");
		nextTestimonialElement.current!.classList.remove("right-[-100%]");
		nextTestimonialElement.current!.classList.add("right-[0%]");

		nextTestimonialTimeout.current = window.setTimeout( () => {
			nextTestimonialElement.current!.classList.remove("duration-700");
			nextTestimonialElement.current!.classList.remove("right-[0%]");
			nextTestimonialElement.current!.classList.add("right-[-100%]");

			if ((testimonialsData.length - 1) - selectedTestimonial >= 2) {
				setSelectedTestimonial(selectedTestimonial + 2);
			} else if ((testimonialsData.length - 1) - selectedTestimonial === 1) {
				setSelectedTestimonial(0);
			} else if ((testimonialsData.length - 1) - selectedTestimonial === 0) {
				setSelectedTestimonial(1);
			}

		},800);
	}


	useEffect( () => {
		return () => {
			clearTimeout(prevTestimonialTimeout.current);
			clearTimeout(nextTestimonialTimeout.current);
		};
	});


	return (
		<div className="relative w-full h-[70vh]">
			<h2 className="w-full mb-[8vh] text-center text-3xl font-sans">Testimonios de nuestros usuarios</h2>

			{/* BOTONES */}
			<button className="absolute z-20 top-[50%] -left-20 text-brandingDarkGreen text-[77px] font-light"
				onClick={prevClick}
			>
				<img src="icons/arrow.png" alt="To left arrow" 
					className=""
				/>
			</button>

			<button className="absolute z-20 top-[50%] -right-20 text-brandingDarkGreen text-[77px] font-light"
				onClick={nextClick}
			>
				<img src="icons/arrow.png" alt="To left arrow"
					className="rotate-180"
				/>
			</button>
				
			<div className="relative flex w-full h-full overflow-hidden">
				{/* TESTIMONIOS */}
				<div className="flex justify-between w-full h-full">
					{/* TESTIMONIO A LA IZQUIERDA */}
					<div className="absolute left-[-100%] z-10 flex items-center justify-center gap-10 w-[100%] h-full bg-white"
						ref={prevTestimonialElement}
					>
						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[prevTestimonialIndex1].imageUrl} alt={testimonialsData[prevTestimonialIndex1].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[prevTestimonialIndex1].header}</h3>
								<p className="">{testimonialsData[prevTestimonialIndex1].mainText}</p>
							</div>
						</div>

						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[prevTestimonialIndex2].imageUrl} alt={testimonialsData[prevTestimonialIndex2].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[prevTestimonialIndex2].header}</h3>
								<p className="">{testimonialsData[prevTestimonialIndex2].mainText}</p>
							</div>
						</div>
					</div>

					{/* TESTIMONIO VISIBLE */}
					<div className="flex items-center justify-center gap-10 w-[100%] h-full bg-white">
						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[selectedTestimonial].imageUrl} alt={testimonialsData[selectedTestimonial].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[selectedTestimonial].header}</h3>
								<p className="">{testimonialsData[selectedTestimonial].mainText}</p>
							</div>
						</div>
						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[selectedTestimonial2].imageUrl} alt={testimonialsData[selectedTestimonial2].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[selectedTestimonial2].header}</h3>
								<p className="">{testimonialsData[selectedTestimonial2].mainText}</p>
							</div>
						</div>
					</div>

					{/* TESTIMONIO A LA DERECHA */}
					<div className="absolute right-[-100%] z-10 flex items-center justify-center gap-10 w-[100%] h-full bg-white"
						ref={nextTestimonialElement}
					>
						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[nextTestimonialIndex1].imageUrl} alt={testimonialsData[nextTestimonialIndex1].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[nextTestimonialIndex1].header}</h3>
								<p className="">{testimonialsData[nextTestimonialIndex1].mainText}</p>
							</div>
						</div>

						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[nextTestimonialIndex2].imageUrl} alt={testimonialsData[nextTestimonialIndex2].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[nextTestimonialIndex2].header}</h3>
								<p className="">{testimonialsData[nextTestimonialIndex2].mainText}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Testimonials;
