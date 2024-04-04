
function PlantInBanner() {
	return (
		<div className="flex w-full overflow-hidden bg-brandingLightYellow rounded-md">
			<div className="py-0 px-2 text-center">
				<h2 className="font-sans text-[52px] font-bold drop-shadow-custom">
					Somos
					<span className="block my-[-1rem] font-loginFont font-normal">PLANT-IN</span>
				</h2>

				<p className="mt-3 text-left text-[20px]">
					<span className="font-loginFont text-[24px]">PLANT-IN </span>
					es un proyecto sin fines de lucro que tiene como objetivo, conectar a todas las personas apasionadas por los alimentos saludables y la sanidad de la tierra, sin importar si son grandes o pequeños productores. En este espacio, compartiremos experiencias, fotos y novedades sobre nuestras huertas agroecologicas... TE SUMAS?
				</p>
			</div>

			<img alt=""
				src="images/home-card_somos.png"
				className="rounded-md"
			/>
	
		</div>
	);
}

export default PlantInBanner;
