import { useState, useEffect } from "react";
import mobileBanner from "@/images/banners/visitor_banner_mobile.png";
import desktopBanner from "@/images/banners/home-card_somos.png";

function VisitorBanner() {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="flex w-full overflow-hidden bg-brandingLightYellow rounded-md
		max-[767px]:justify-center max-[767px]:h-[260px] 
		md:h-[max-content]">
			<div className="py-0 px-2 text-center ">
				<h2 className="font-sans text-[16px] mt-4 md:text-[52px] font-bold drop-shadow-custom">
					Somos
					<span className="block my-[-.75rem] font-loginFont font-normal text-[28px]">PLANT-IN</span>
				</h2>

				<p className="m-[1rem_.5rem_1rem] md:m-[0_2rem_3rem_3rem] text-left text-[8.6px] md:text-[20px]">
					<span className="font-loginFont text-[12px] md:text-[24px]">PLANT-IN </span>
					es un proyecto sin fines de lucro que tiene como objetivo, conectar a todas las personas apasionadas por los alimentos saludables y la sanidad de la tierra, sin importar si son grandes o pequeños productores. <br /><span className="ml-4">
					En este espacio, compartiremos experiencias, fotos y novedades sobre nuestras huertas agroecologicas... <b>TE SUMAS?</b>
					</span>
				</p>
			</div>

			<img alt=""
				src={windowWidth < 768 ? mobileBanner : desktopBanner}
				className="rounded-md max-[767px]:w-[55%] max-[767px]:h-[260px]"
			/>
	
		</div>
	);
}

export default VisitorBanner;
