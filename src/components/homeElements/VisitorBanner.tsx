
function VisitorBanner() {
	return (
		<div className="flex w-full overflow-hidden bg-[#f9f8f8] rounded-md p-[">
			<div className="p-[32px_32px_48px] text-center flex flex-col gap-16px">
				<h2 className="font-sans text-[3rem] font-bold drop-shadow-custom ">
					Somos <br/>
					<span className="font-loginFont font-normal translate-y-[-1rem] block">PLANT-IN</span>
				</h2>

				<p className=" text-left text-lg ">
					<span className="font-loginFont text-[24px] ">PLANT-IN </span>
					es un proyecto sin fines de lucro que tiene como objetivo, conectar a todas las personas apasionadas por los alimentos saludables y la sanidad de la tierra, sin importar si son grandes o pequeños productores. <br /><span className="ml-3">
					En este espacio, compartiremos experiencias, fotos y novedades sobre nuestras huertas agroecologicas... <span className=" font-semibold">TE SUMAS?</span>
					</span>
				</p>
			</div>

			<img alt=""
				src="images/banners/home-card_somos.png"
				className="rounded-md"
			/>
	
		</div>
	);
}

export default VisitorBanner;
