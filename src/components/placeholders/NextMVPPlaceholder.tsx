import { Helmet } from "react-helmet";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function NextMVPPlaceholder() {
	return (
		<div className="flex flex-col min-h-[100vh]">
			<Helmet>
				<title>Plant-In Próximamente</title>
			</Helmet>

			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center grow w-[97%] min-h-[40vh] my-[2.4rem] mx-auto
						custom-390:w-[92.52%] custom-700:w-[85%] custom-1000:w-[83%] custom-1400:w-[75%]
						custom-500:my-[3.5rem] custom-700:my-[4.5rem] custom-1900:my-[8rem] custom-3500:my-[13rem]"
			>
				<h1
					className="mb-[1.6rem] text-[2rem] font-bold text-center capitalize
							custom-500:mb-[2.5rem] custom-700:mb-[3.5rem] custom-1000:mb-[5rem] custom-1400:mb-[6.4rem]
							custom-500:text-[2.5rem] custom-700:text-[3rem] custom-1000:text-[3.5rem] custom-1400:text-[4.070rem] custom-1900:text-[4.5rem] custom-2500:text-[5rem]"
				>
					Disponible Próximamente
				</h1>

				<div
					className="mx-[7vw] mt-[3vh] mb-[5vh] p-[1rem] font-sans text-center bg-terciary150 rounded-xl border-[2px] border-black border-solid shadow-below-light
							custom-1400:mt-[4vh]
							custom-1400:mb-[4vh]
							custom-1400:p-[1.5rem]
							custom-1400:rounded-3xl"
				>
					<p
						className="text-[1.6rem] font-semibold
								custom-1400:text-[2rem] custom-1900:text-[2.5rem] custom-2500:text-[3.7rem]"
					>
						Esta sección estará disponible en el próximo MVP
					</p>
				</div>
			</main>
			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default NextMVPPlaceholder;
