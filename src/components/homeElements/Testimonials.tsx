import { useEffect, useRef, useState } from "react";
import { testimonialsData } from "../../data/testimonialsData";

export type TestimonialsDataType = {
	header: string,
	mainText: string,
	captionHeader: string,
	captionMainText: string,
	imageUrl: string,
	imageAlt: string
}

function Testimonials() {
	const [selectedTestimonial, setSelectedTestimonial] = useState<number>(1);
	const prevTestimonialElement = useRef<HTMLDivElement>(null);
	const nextTestimonialElement = useRef<HTMLDivElement>(null);
	let prevTestimonialIndex: number;
	let nextTestimonialIndex: number;
	const prevTestimonialTimeout = useRef<number>();
	const nextTestimonialTimeout = useRef<number>();


	if (selectedTestimonial < testimonialsData.length - 1) {
		nextTestimonialIndex = selectedTestimonial + 1;
	} else {
		nextTestimonialIndex = 0;
	}

	if (selectedTestimonial > 0) {
		prevTestimonialIndex = selectedTestimonial - 1;
	} else {
		prevTestimonialIndex = testimonialsData.length - 1;
	}

	function prevClick () {
		prevTestimonialElement.current!.classList.add("duration-700");
		prevTestimonialElement.current!.classList.remove("left-[-100%]");
		prevTestimonialElement.current!.classList.add("left-[0%]");

		prevTestimonialTimeout.current = window.setTimeout( () => {
			prevTestimonialElement.current!.classList.remove("duration-700");
			prevTestimonialElement.current!.classList.remove("left-[0%]");
			prevTestimonialElement.current!.classList.add("left-[-100%]");

			if (selectedTestimonial > 0) {
				setSelectedTestimonial(selectedTestimonial - 1);
			} else {
				setSelectedTestimonial(testimonialsData.length - 1);
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

			if (selectedTestimonial < testimonialsData.length - 1) {
				setSelectedTestimonial(selectedTestimonial + 1);
			} else {
				setSelectedTestimonial(0);
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
			<h2 className="w-full mb-[2vh] text-center text-3xl font-sans">Testimonios de nuestros usuarios</h2>

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
					<div className="absolute left-[-100%] z-10 flex items-center justify-between w-[100%] h-full bg-white"
						ref={prevTestimonialElement}
					>
						<div className="w-[55%] px-6">
							<h3 className="text-[51.78px]">{testimonialsData[prevTestimonialIndex].captionHeader}</h3>
							<p className="text-[32px] font-light">{testimonialsData[prevTestimonialIndex].captionMainText}</p>
						</div>

						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[prevTestimonialIndex].imageUrl} alt={testimonialsData[prevTestimonialIndex].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[prevTestimonialIndex].header}</h3>
								<p className="">{testimonialsData[prevTestimonialIndex].mainText}</p>
							</div>
						</div>
					</div>

					{/* TESTIMONIO VISIBLE */}
					<div className="flex items-center justify-between w-[100%] h-full bg-white">
						<div className="w-[55%] px-6">
							<h3 className="text-[51.78px]">{testimonialsData[selectedTestimonial].captionHeader}</h3>
							<p className="text-[32px] font-light">{testimonialsData[selectedTestimonial].captionMainText}</p>
						</div>

						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[selectedTestimonial].imageUrl} alt={testimonialsData[selectedTestimonial].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[selectedTestimonial].header}</h3>
								<p className="">{testimonialsData[selectedTestimonial].mainText}</p>
							</div>
						</div>
					</div>

					{/* TESTIMONIO A LA DERECHA */}
					<div className="absolute right-[-100%] z-10 flex items-center justify-between w-[100%] h-full bg-white"
						ref={nextTestimonialElement}
					>
						<div className="w-[55%] px-6">
							<h3 className="text-[51.78px]">{testimonialsData[nextTestimonialIndex].captionHeader}</h3>
							<p className="text-[32px] font-light">{testimonialsData[nextTestimonialIndex].captionMainText}</p>
						</div>

						<div className="w-[45%] h-full text-[19.78px]">
							<img src={testimonialsData[nextTestimonialIndex].imageUrl} alt={testimonialsData[nextTestimonialIndex].imageAlt}
								className="w-full"
							/>
							<div className="">
								<h3 className="font-bold">{testimonialsData[nextTestimonialIndex].header}</h3>
								<p className="">{testimonialsData[nextTestimonialIndex].mainText}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Testimonials;
