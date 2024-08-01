import styles from "./VisitorBanner.module.scss";

function VisitorBanner() {
	return (
		<div className={"flex w-full overflow-hidden bg-brandingLightYellow rounded-md"}>
			<div
				className={
					"flex flex-col justify-center w-[60%] custom-420:w-[50%] custom-1200:w-[40%] custom-1400:w-[33.8%] py-[11.5px] custom-1500:py-[16px] custom-2000:py-[30px] px-[17.5px] custom-1500:px-[25px] custom-2000:px-[45px] text-center"
				}
			>
				<h2 className={`${styles.h2ClampText} font-sans font-semibold custom-1000:font-bold drop-shadow-custom`}>
					Somos
					<br />
					<span className={`${styles.h2LogoClampText} block my-[-1rem] font-loginFont font-normal`}>PLANT-IN</span>
				</h2>

				<p className={`${styles.mainText} mt-3 text-left font-normal`}>
					<span className={`${styles.mainTextLogo} font-loginFont`}>PLANT-IN </span>
					es un proyecto sin fines de lucro que tiene como objetivo, conectar a todas las personas apasionadas por los
					alimentos saludables y la sanidad de la tierra, sin importar si son grandes o pequeños productores. En este
					espacio, compartiremos experiencias, fotos y novedades sobre nuestras huertas agroecologicas...
					<span className="font-semibold"> TE SUMAS?</span>
				</p>
			</div>
			<div className="w-[40%] custom-420:w-[50%] custom-1200:w-[60%] custom-1400:w-[66.2%] overflow-hidden rounded-md">
				<img alt="" src="images/banners/home-card_somos.png" className="w-full h-full hidden custom-1000:block" />
				<img
					alt=""
					src="images/banners/home-card_somos_mobile.png"
					className="object-cover w-full h-full custom-1000:hidden"
				/>
			</div>
		</div>
	);
}

export default VisitorBanner;
