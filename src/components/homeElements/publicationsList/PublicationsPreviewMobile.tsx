import { useEffect, useRef, useState } from "react";
import { generateUniqueId } from "../../../utils/generateUniqueId";
import PublicationPreviewCard from "./PublicationPreviewCard";
import { PublicationType } from "./publicationsListTypes";

export type PublicationsPreviewMobileProps = {
	bestPublicationsArray: PublicationType[];
};

function PublicationsPreviewMobile({ bestPublicationsArray }: PublicationsPreviewMobileProps) {
	const [isSliderAtStart, setIsSliderAtStart] = useState<boolean>(true);
	const [isSliderAtEnd, setIsSliderAtEnd] = useState<boolean>(false);
	const moveSliderLeftInterval = useRef<number>(0);
	const moveSliderRightInterval = useRef<number>(0);

	const leftArrow = useRef<HTMLImageElement>(null);
	const rightArrow = useRef<HTMLImageElement>(null);
	const pictureViewerDiv = useRef<HTMLDivElement>(null);
	const sliderLastDiv = useRef<HTMLDivElement>(null);
	const actualViewerDivPosition = useRef<number>(0);
	const isSliderAtEndRef = useRef<boolean>(false);

	// En este componente utilizamos setIsSliderAtStart para determinar los estilos del botón "a la izquierda", pero no para parar su scroll.
	// Para desactivar su scroll usamos el valor de posicionamiento del div del slider (actualViewerDivPosition) ya que,si usamos el estado,
	// al ser asíncrono el cambio de estado, el scroll seguía funcionando a pesar de haber llegado a la posición "0"

	//Para controlar el scroll en la otra dirección (botón "a la derecha"), utilizamos un Observer que detecta un elemento que hemos situado al final
	//del slider. No usamos el valor de posicionamiento, ya que al ser variable (responsive) el tamaño del div que contiene las imágenes no es posible
	//saber de antemano en qué valor de posición debe parar.

	const sliderEndPositionObserver = new IntersectionObserver(
		(elements) => {
			if (elements[0].isIntersecting) {
				isSliderAtEndRef.current = true;
				setIsSliderAtEnd(true);
			}
		},
		{ threshold: 0.0 }
	);

	function checkIsSliderAtStart() {
		if (actualViewerDivPosition.current >= 0) {
			setIsSliderAtStart(true);
		} else {
			setIsSliderAtStart(false);
		}
	}

	function moveSliderLeft() {
		if (actualViewerDivPosition.current < 0) {
			actualViewerDivPosition.current += 1;
			pictureViewerDiv.current!.style.left = `${actualViewerDivPosition.current}px`;
			checkIsSliderAtStart();

			moveSliderLeftInterval.current = window.setInterval(() => {
				if (actualViewerDivPosition.current < 0) {
					actualViewerDivPosition.current += 1;
					pictureViewerDiv.current!.style.left = `${actualViewerDivPosition.current}px`;
					checkIsSliderAtStart();
				}
			}, 5);
		}
	}

	function stopMovingSliderLeft() {
		clearInterval(moveSliderLeftInterval.current);
	}

	function moveSliderRight() {
		if (!isSliderAtEnd) {
			actualViewerDivPosition.current -= 1;
			pictureViewerDiv.current!.style.left = `${actualViewerDivPosition.current}px`;
			checkIsSliderAtStart();

			moveSliderRightInterval.current = window.setInterval(() => {
				if (!isSliderAtEnd) {
					actualViewerDivPosition.current -= 1;
					pictureViewerDiv.current!.style.left = `${actualViewerDivPosition.current}px`;
					checkIsSliderAtStart();
				}
			}, 5);
		}
	}

	function stopMovingSliderRight() {
		clearInterval(moveSliderRightInterval.current);
	}

	useEffect(() => {
		sliderEndPositionObserver.observe(sliderLastDiv.current!);

		return () => {
			clearInterval(moveSliderLeftInterval.current);
			clearInterval(moveSliderRightInterval.current);
		};
	}, []);

	//**** Esta sección controla el desplazamiento mediante el dedo del usuario
	let isDragging = false;
	let startX: number;
	let currentX: number;
	let initialPosition: number;
	let newPosition: number;

	useEffect(() => {
		pictureViewerDiv.current!.addEventListener("touchstart", (e) => {
			// Comenzamos el desplazamiento
			isDragging = true;
			startX = e.touches[0].clientX;
			initialPosition = pictureViewerDiv.current!.offsetLeft;
		});

		pictureViewerDiv.current!.addEventListener("touchmove", (e) => {
			if (!isDragging) return;

			// Calculamos la posición actual
			currentX = e.touches[0].clientX;
			const deltaX = currentX - startX;

			// Movemos el pictureViewerDiv.current según la posición del dedo
			newPosition = Math.round(initialPosition + deltaX);

			if (newPosition < initialPosition) {
				if (!isSliderAtEndRef.current) {
					pictureViewerDiv.current!.style.left = `${newPosition}px`;
					actualViewerDivPosition.current = newPosition;
				}
			} else if (newPosition > initialPosition && newPosition <= 5) {
				pictureViewerDiv.current!.style.left = `${newPosition}px`;
				actualViewerDivPosition.current = newPosition;
			} else {
				pictureViewerDiv.current!.style.left = `${0}px`;
				actualViewerDivPosition.current = 0;
			}
		});

		pictureViewerDiv.current!.addEventListener("touchend", () => {
			// Terminamos el desplazamiento
			checkIsSliderAtStart();
			if (newPosition > initialPosition) {
				isSliderAtEndRef.current = false;
				setIsSliderAtEnd(false);
			}
			isDragging = false;
		});
	}, []);

	//**** Fin de la sección de desplazamiento mediante el dedo del usuario

	useEffect(() => {
		clearInterval(moveSliderRightInterval.current);
	}, [isSliderAtEnd]);

	return (
		<>
			<h2 className="mb-[0.9rem] text-center text-[1.6rem] font-sans font-semibold tracking-[0.015rem]">
				Publicaciones
			</h2>

			<div className="flex items-stretch w-full">
				<div className="relative flex justify-center w-[6%]">
					<img
						ref={leftArrow}
						onMouseDown={moveSliderLeft}
						onMouseUp={stopMovingSliderLeft}
						onMouseLeave={stopMovingSliderLeft}
						src="icons/arrow2.svg"
						alt="Flecha a la izquierda"
						className={`absolute top-[37%] w-[15px] rotate-180 ${!isSliderAtStart && "cursor-pointer hover:scale-125"} ${isSliderAtStart && "opacity-40"}`}
					/>
				</div>

				<div className="overflow-hidden w-[88%]">
					<div ref={pictureViewerDiv} className="relative left-[0%] flex gap-x-[1.6rem] w-[300%]">
						{bestPublicationsArray.map((element) => {
							return (
								<div key={generateUniqueId()}>
									<PublicationPreviewCard
										id={element.id}
										author={`${element.author.name} ${element.author.lastname}`}
										mainImage={element.mainImage.url}
										title={element.title}
										mainText={element.plantation.details}
									/>
								</div>
							);
						})}
						{/* Este div vacío es utilizado para que el observer detecte que hemos llegado al final del slider */}
						<div ref={sliderLastDiv} className="relative right-[1.6rem] custom-500:hidden w-[1px]"></div>
					</div>
				</div>

				<div className="relative flex justify-center w-[6%]">
					<img
						ref={rightArrow}
						onMouseDown={moveSliderRight}
						onMouseUp={stopMovingSliderRight}
						onMouseLeave={stopMovingSliderRight}
						src="icons/arrow2.svg"
						alt="Flecha a la derecha"
						className={`absolute top-[37%] w-[15px] ${!isSliderAtEnd && "cursor-pointer hover:scale-125"} ${isSliderAtEnd && "opacity-40"}`}
					/>
				</div>
			</div>
		</>
	);
}

export default PublicationsPreviewMobile;
