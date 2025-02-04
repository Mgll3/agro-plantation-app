import { useEffect, useRef, useState } from "react";
import { testimonialsData } from "../../data/testimonialsData";
import { useUserRoleContext } from "../../context/UserRoleContext";

export type TestimonialsDataType = {
	header: string;
	mainText: string;
	imageUrl: string;
	imageAlt: string;
};

function Testimonials() {
	const [selectedTestimonial, setSelectedTestimonial] = useState<number>(2);
	const { userRole } = useUserRoleContext();
	const actualTestimonialElement = useRef<HTMLDivElement>(null);
	const prevTestimonialElement = useRef<HTMLDivElement>(null);
	const nextTestimonialElement = useRef<HTMLDivElement>(null);
	const prevTestimonialTimeout = useRef<number>();
	const nextTestimonialTimeout = useRef<number>();

	// Es necesario utilizar una referencia para almacenar selectedTestimonial ya que el valor del estado no se actualiza en las funciones que gestionan el swipe (el valor permanece igual al que tenía cuando se renderizó el componente cuando generamos un evento).
	const selectedTestimonialRef = useRef<number>(selectedTestimonial);

	let selectedTestimonial2: number;
	let prevTestimonialIndex1: number;
	let prevTestimonialIndex2: number;
	let nextTestimonialIndex1: number;
	let nextTestimonialIndex2: number;

	// Estas variables se almacenan el punto unicial y final (en el eje X) de un evento touch (swipe)
	const touchStartX = useRef<number>(0); // Initial touch coordinate
	const touchEndX = useRef<number>(0); // Final touch coordinate

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

	function prevClick(currentIndex: number = selectedTestimonial) {
		prevTestimonialElement.current!.classList.add("duration-700");
		prevTestimonialElement.current!.classList.remove("left-[-100%]");
		prevTestimonialElement.current!.classList.add("left-[0%]");

		prevTestimonialTimeout.current = window.setTimeout(() => {
			prevTestimonialElement.current!.classList.remove("duration-700");
			prevTestimonialElement.current!.classList.remove("left-[0%]");
			prevTestimonialElement.current!.classList.add("left-[-100%]");

			if (currentIndex >= 2) {
				setSelectedTestimonial(currentIndex - 2);
			} else if (currentIndex === 1) {
				setSelectedTestimonial(testimonialsData.length - 1);
			} else if (currentIndex === 0) {
				setSelectedTestimonial(testimonialsData.length - 2);
			}
		}, 800);
	}

	function nextClick(currentIndex: number = selectedTestimonial) {
		nextTestimonialElement.current!.classList.add("duration-700");
		nextTestimonialElement.current!.classList.remove("right-[-100%]");
		nextTestimonialElement.current!.classList.add("right-[0%]");

		nextTestimonialTimeout.current = window.setTimeout(() => {
			nextTestimonialElement.current!.classList.remove("duration-700");
			nextTestimonialElement.current!.classList.remove("right-[0%]");
			nextTestimonialElement.current!.classList.add("right-[-100%]");

			if (testimonialsData.length - 1 - currentIndex >= 2) {
				setSelectedTestimonial(currentIndex + 2);
			} else if (testimonialsData.length - 1 - currentIndex === 1) {
				setSelectedTestimonial(0);
			} else if (testimonialsData.length - 1 - currentIndex === 0) {
				setSelectedTestimonial(1);
			}
		}, 800);
	}

	// Estas funciones manejan el swipe.

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
				nextClick(selectedTestimonialRef.current);
			}

			if (touchStartX.current - touchEndX.current < -SWIPE_THRESHOLD) {
				prevClick(selectedTestimonialRef.current);
			}
		}
	}

	useEffect(() => {
		return () => {
			clearTimeout(prevTestimonialTimeout.current);
			clearTimeout(nextTestimonialTimeout.current);
		};
	});

	useEffect(() => {
		// Esta parte añade el evento touchstart y touchend para gestionar el swipe.
		if (actualTestimonialElement.current) {
			actualTestimonialElement.current!.addEventListener("touchstart", touchstart);
			actualTestimonialElement.current!.addEventListener("touchend", touchend);
		}

		return () => {
			if (actualTestimonialElement.current) {
				actualTestimonialElement.current.removeEventListener("touchstart", touchstart);
				actualTestimonialElement.current.removeEventListener("touchend", touchend);
			}
		};
	}, []);

	// Actualizamos el valor de selectedTestimonialRef en cada re-renderizado.
	useEffect(() => {
		selectedTestimonialRef.current = selectedTestimonial;
	}, [selectedTestimonial]);

	return (
		<div className="relative w-full">
			<h2
				className="w-full mb-[0.838rem] text-center text-[1.6rem] tracking-[0.015rem] font-semibold font-sans
				custom-600:mb-[1.5rem] custom-900:mb-[2rem] custom-1200:mb-[2.5rem] custom-1400:mb-[3.2rem] custom-2500:mb-[3.6rem]
				custom-900:tracking-[0.025rem]
				custom-900:font-normal
				custom-500:text-[2rem] custom-700:text-[2.5rem] custom-900:text-[3rem] custom-1400:text-[3.5rem] custom-1900:text-[4rem] custom-2500:text-[5rem] custom-3500:text-[6rem]"
			>
				Testimonios de nuestros usuarios
			</h2>

			{/* BOTONES */}
			<button
				type="button"
				className="absolute z-20 top-[50%] -left-[1.25rem] w-[1rem]
					custom-900:-left-[2.5rem] custom-1000:-left-[4rem] custom-1200:-left-[6rem] custom-1400:-left-[7.6rem] custom-2500:-left-[10rem] custom-3500:-left-[14rem]
					custom-600:w-[1.3rem] custom-700:w-[1.6rem] custom-900:w-[2rem] custom-1200:w-[2.6rem] custom-1900:w-[3.2rem] custom-2500:w-[4rem] custom-3500:w-[5.5rem]"
				onClick={() => prevClick()}
			>
				<img
					src="icons/arrow2.svg"
					alt="Flecha a la izquierda"
					className="w-full rotate-180 hover:scale-125 duration-300"
				/>
			</button>

			<button
				type="button"
				className="absolute z-20 top-[50%] -right-[1.25rem] w-[1rem]
					custom-900:-right-[2.5rem] custom-1000:-right-[4rem] custom-1200:-right-[6rem] custom-1400:-right-[7.6rem] custom-2500:-right-[10rem] custom-3500:-right-[14rem]
					custom-600:w-[1.3rem] custom-700:w-[1.6rem] custom-900:w-[2rem] custom-1200:w-[2.6rem] custom-1900:w-[3.2rem] custom-2500:w-[4rem] custom-3500:w-[5.5rem]"
				onClick={() => nextClick()}
			>
				<img src="icons/arrow2.svg" alt="Flecha a la derecha" className="w-full hover:scale-125 duration-300" />
			</button>

			<div className="relative flex w-full h-full overflow-hidden">
				{/* TESTIMONIOS */}
				<div className="flex justify-between w-full h-full">
					{/* TESTIMONIO A LA IZQUIERDA */}
					<div
						className={`absolute left-[-100%] z-10 flex items-center justify-center gap-x-[0.8rem] w-[100%] h-full ${userRole !== "visitor" && "bg-terciary300"}
							custom-400:gap-x-[1.6rem] custom-1000:gap-x-[3rem] custom-1200:gap-x-[4rem] custom-1900:gap-x-[6rem] custom-2500:gap-x-[8rem] custom-3500:gap-x-[10rem]`}
						ref={prevTestimonialElement}
					>
						<div
							className="overflow-hidden flex flex-col w-[48.1%] aspect-[191/400] text-[19.78px] border border-black border-solid bg-white rounded-2xl
							custom-1400:w-[48%]
							custom-390:aspect-[191/300] custom-600:aspect-[191/280] custom-900:aspect-[191/250] custom-1200:aspect-[191/210] custom-1400:aspect-[191/191]"
						>
							<img
								src={testimonialsData[prevTestimonialIndex1].imageUrl}
								alt={testimonialsData[prevTestimonialIndex1].imageAlt}
								className="w-full rounded-none"
							/>
							<div
								className="flex flex-col grow py-[0.4rem] pl-[0.4rem] pr-[1.8rem]
								custom-750:px-[1.8rem] custom-900:px-[2.5rem] custom-1000:px-[5.2rem] custom-2000:px-[6.5rem] custom-3500:px-[8.5rem]
								custom-1000:pb-[2.4rem]
								custom-750:pt-[1.5rem] custom-900:pt-[2.5rem] custom-1000:pt-[5.5rem] custom-3500:pt-[7rem]"
							>
								<h3
									className="font-semibold text-[1.2rem] tracking-[0.125rem]
									custom-500:text-[1.5rem] custom-640:text-[1.8rem] custom-700:text-[2rem] custom-1900:text-[2.6rem] custom-2500:text-[3.2rem] custom-3500:text-[4.2rem]
									custom-640:tracking-[0.015rem]"
								>
									{testimonialsData[prevTestimonialIndex1].header}
								</h3>
								<div
									className="flex items-center grow
									custom-1200:items-start"
								>
									<p
										className="mt-[0.8rem] text-[0.9rem] trackin-[0.15rem]
										custom-500:text-[1.3rem] custom-640:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem] custom-3500:text-[3.3rem]
										custom-640:tracking-[0.05rem]
										custom-1200:mt-[1.876rem] custom-2500:mt-[2.5rem] custom-3500:mt-[4rem]"
									>
										{testimonialsData[prevTestimonialIndex1].mainText}
									</p>
								</div>
							</div>
						</div>

						<div
							className="overflow-hidden flex flex-col w-[48.1%] aspect-[191/400] text-[19.78px] border border-black border-solid bg-white rounded-2xl
							custom-1400:w-[48%]
							custom-390:aspect-[191/300] custom-600:aspect-[191/280] custom-900:aspect-[191/250] custom-1200:aspect-[191/210] custom-1400:aspect-[191/191]"
						>
							<img
								src={testimonialsData[prevTestimonialIndex2].imageUrl}
								alt={testimonialsData[prevTestimonialIndex2].imageAlt}
								className="w-full rounded-none"
							/>
							<div
								className="flex flex-col grow py-[0.4rem] pl-[0.4rem] pr-[1.8rem]
								custom-750:px-[1.8rem] custom-900:px-[2.5rem] custom-1000:px-[5.2rem] custom-2000:px-[6.5rem] custom-3500:px-[8.5rem]
								custom-1000:pb-[2.4rem]
								custom-750:pt-[1.5rem] custom-900:pt-[2.5rem] custom-1000:pt-[5.5rem] custom-3500:pt-[7rem]"
							>
								<h3
									className="font-semibold text-[1.2rem] tracking-[0.125rem]
									custom-500:text-[1.5rem] custom-640:text-[1.8rem] custom-700:text-[2rem] custom-1900:text-[2.6rem] custom-2500:text-[3.2rem] custom-3500:text-[4.2rem]
									custom-640:tracking-[0.015rem]"
								>
									{testimonialsData[prevTestimonialIndex2].header}
								</h3>
								<div
									className="flex items-center grow
									custom-1200:items-start"
								>
									<p
										className="mt-[0.8rem] text-[0.9rem] trackin-[0.15rem]
										custom-500:text-[1.3rem] custom-640:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem] custom-3500:text-[3.3rem]
										custom-640:tracking-[0.05rem]
										custom-1200:mt-[1.876rem] custom-2500:mt-[2.5rem] custom-3500:mt-[4rem]"
									>
										{testimonialsData[prevTestimonialIndex2].mainText}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* TESTIMONIO VISIBLE */}
					<div
						className={`flex items-center justify-center gap-x-[0.8rem] w-[100%] h-full ${userRole !== "visitor" && "bg-terciary300"}
							custom-400:gap-x-[1.6rem] custom-1000:gap-x-[3rem] custom-1200:gap-x-[4rem] custom-1900:gap-x-[6rem] custom-2500:gap-x-[8rem] custom-3500:gap-x-[10rem]`}
						ref={actualTestimonialElement}
					>
						<div
							className="overflow-hidden flex flex-col w-[48.1%] aspect-[191/400] text-[19.78px] border border-black border-solid bg-white rounded-2xl
							custom-1400:w-[48%]
							custom-390:aspect-[191/300] custom-600:aspect-[191/280] custom-900:aspect-[191/250] custom-1200:aspect-[191/210] custom-1400:aspect-[191/191]"
						>
							<img
								src={testimonialsData[selectedTestimonial].imageUrl}
								alt={testimonialsData[selectedTestimonial].imageAlt}
								className="w-full rounded-none"
							/>
							<div
								className="flex flex-col grow py-[0.4rem] pl-[0.4rem] pr-[1.8rem]
								custom-750:px-[1.8rem] custom-900:px-[2.5rem] custom-1000:px-[5.2rem] custom-2000:px-[6.5rem] custom-3500:px-[8.5rem]
								custom-1000:pb-[2.4rem]
								custom-750:pt-[1.5rem] custom-900:pt-[2.5rem] custom-1000:pt-[5.5rem] custom-3500:pt-[7rem]"
							>
								<h3
									className="font-semibold text-[1.2rem] tracking-[0.125rem]
									custom-500:text-[1.5rem] custom-640:text-[1.8rem] custom-700:text-[2rem] custom-1900:text-[2.6rem] custom-2500:text-[3.2rem] custom-3500:text-[4.2rem]
									custom-640:tracking-[0.015rem]"
								>
									{testimonialsData[selectedTestimonial].header}
								</h3>
								<div
									className="flex items-center grow
									custom-1200:items-start"
								>
									<p
										className="mt-[0.8rem] text-[0.9rem] trackin-[0.15rem]
										custom-500:text-[1.3rem] custom-640:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem] custom-3500:text-[3.3rem]
										custom-640:tracking-[0.05rem]
										custom-1200:mt-[1.876rem] custom-2500:mt-[2.5rem] custom-3500:mt-[4rem]"
									>
										{testimonialsData[selectedTestimonial].mainText}
									</p>
								</div>
							</div>
						</div>
						<div
							className="overflow-hidden flex flex-col w-[48.1%] aspect-[191/400] text-[19.78px] border border-black border-solid bg-white rounded-2xl
							custom-1400:w-[48%]
							custom-390:aspect-[191/300] custom-600:aspect-[191/280] custom-900:aspect-[191/250] custom-1200:aspect-[191/210] custom-1400:aspect-[191/191]"
						>
							<img
								src={testimonialsData[selectedTestimonial2].imageUrl}
								alt={testimonialsData[selectedTestimonial2].imageAlt}
								className="w-full rounded-none"
							/>
							<div
								className="flex flex-col grow py-[0.4rem] pl-[0.4rem] pr-[1.8rem]
								custom-750:px-[1.8rem] custom-900:px-[2.5rem] custom-1000:px-[5.2rem] custom-2000:px-[6.5rem] custom-3500:px-[8.5rem]
								custom-1000:pb-[2.4rem]
								custom-750:pt-[1.5rem] custom-900:pt-[2.5rem] custom-1000:pt-[5.5rem] custom-3500:pt-[7rem]"
							>
								<h3
									className="font-semibold text-[1.2rem] tracking-[0.125rem]
									custom-500:text-[1.5rem] custom-640:text-[1.8rem] custom-700:text-[2rem] custom-1900:text-[2.6rem] custom-2500:text-[3.2rem] custom-3500:text-[4.2rem]
									custom-640:tracking-[0.015rem]"
								>
									{testimonialsData[selectedTestimonial2].header}
								</h3>
								<div
									className="flex items-center grow
									custom-1200:items-start"
								>
									<p
										className="mt-[0.8rem] text-[0.9rem] trackin-[0.15rem]
										custom-500:text-[1.3rem] custom-640:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem] custom-3500:text-[3.3rem]
										custom-640:tracking-[0.05rem]
										custom-1200:mt-[1.876rem] custom-2500:mt-[2.5rem] custom-3500:mt-[4rem]"
									>
										{testimonialsData[selectedTestimonial2].mainText}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* TESTIMONIO A LA DERECHA */}
					<div
						className={`absolute right-[-100%] z-10 flex items-center justify-center gap-x-[0.8rem] w-[100%] h-full ${userRole !== "visitor" && "bg-terciary300"}
							custom-400:gap-x-[1.6rem] custom-1000:gap-x-[3rem] custom-1200:gap-x-[4rem] custom-1900:gap-x-[6rem] custom-2500:gap-x-[8rem] custom-3500:gap-x-[10rem]`}
						ref={nextTestimonialElement}
					>
						<div
							className="overflow-hidden flex flex-col w-[48.1%] aspect-[191/400] text-[19.78px] border border-black border-solid bg-white rounded-2xl
							custom-1400:w-[48%]
							custom-390:aspect-[191/300] custom-600:aspect-[191/280] custom-900:aspect-[191/250] custom-1200:aspect-[191/210] custom-1400:aspect-[191/191]"
						>
							<img
								src={testimonialsData[nextTestimonialIndex1].imageUrl}
								alt={testimonialsData[nextTestimonialIndex1].imageAlt}
								className="w-full rounded-none"
							/>
							<div
								className="flex flex-col grow py-[0.4rem] pl-[0.4rem] pr-[1.8rem]
								custom-750:px-[1.8rem] custom-900:px-[2.5rem] custom-1000:px-[5.2rem] custom-2000:px-[6.5rem] custom-3500:px-[8.5rem]
								custom-1000:pb-[2.4rem]
								custom-750:pt-[1.5rem] custom-900:pt-[2.5rem] custom-1000:pt-[5.5rem] custom-3500:pt-[7rem]"
							>
								<h3
									className="font-semibold text-[1.2rem] tracking-[0.125rem]
									custom-500:text-[1.5rem] custom-640:text-[1.8rem] custom-700:text-[2rem] custom-1900:text-[2.6rem] custom-2500:text-[3.2rem] custom-3500:text-[4.2rem]
									custom-640:tracking-[0.015rem]"
								>
									{testimonialsData[nextTestimonialIndex1].header}
								</h3>
								<div
									className="flex items-center grow
									custom-1200:items-start"
								>
									<p
										className="mt-[0.8rem] text-[0.9rem] trackin-[0.15rem]
										custom-500:text-[1.3rem] custom-640:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem] custom-3500:text-[3.3rem]
										custom-640:tracking-[0.05rem]
										custom-1200:mt-[1.876rem] custom-2500:mt-[2.5rem] custom-3500:mt-[4rem]"
									>
										{testimonialsData[nextTestimonialIndex1].mainText}
									</p>
								</div>
							</div>
						</div>

						<div
							className="overflow-hidden flex flex-col w-[48.1%] aspect-[191/400] text-[19.78px] border border-black border-solid bg-white rounded-2xl
							custom-1400:w-[48%]
							custom-390:aspect-[191/300] custom-600:aspect-[191/280] custom-900:aspect-[191/250] custom-1200:aspect-[191/210] custom-1400:aspect-[191/191]"
						>
							<img
								src={testimonialsData[nextTestimonialIndex2].imageUrl}
								alt={testimonialsData[nextTestimonialIndex2].imageAlt}
								className="w-full rounded-none"
							/>
							<div
								className="flex flex-col grow py-[0.4rem] pl-[0.4rem] pr-[1.8rem]
								custom-750:px-[1.8rem] custom-900:px-[2.5rem] custom-1000:px-[5.2rem] custom-2000:px-[6.5rem] custom-3500:px-[8.5rem]
								custom-1000:pb-[2.4rem]
								custom-750:pt-[1.5rem] custom-900:pt-[2.5rem] custom-1000:pt-[5.5rem] custom-3500:pt-[7rem]"
							>
								<h3
									className="font-semibold text-[1.2rem] tracking-[0.125rem]
									custom-500:text-[1.5rem] custom-640:text-[1.8rem] custom-700:text-[2rem] custom-1900:text-[2.6rem] custom-2500:text-[3.2rem] custom-3500:text-[4.2rem]
									custom-640:tracking-[0.015rem]"
								>
									{testimonialsData[nextTestimonialIndex2].header}
								</h3>
								<div
									className="flex items-center grow
									custom-1200:items-start"
								>
									<p
										className="mt-[0.8rem] text-[0.9rem] trackin-[0.15rem]
										custom-500:text-[1.3rem] custom-640:text-[1.6rem] custom-1900:text-[1.9rem] custom-2500:text-[2.4rem] custom-3500:text-[3.3rem]
										custom-640:tracking-[0.05rem]
										custom-1200:mt-[1.876rem] custom-2500:mt-[2.5rem] custom-3500:mt-[4rem]"
									>
										{testimonialsData[nextTestimonialIndex2].mainText}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Testimonials;
