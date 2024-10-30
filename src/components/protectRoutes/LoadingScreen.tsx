import Footer from "../footer/Footer";
import Header from "../header/Header";
import LoadingSmall from "../modals/LoadingSmall";

function LoadingScreen() {
	return (
		<div className="flex flex-col min-h-[100vh]">
			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center flex-grow w-[100%] min-h-[70vh] mt-[0.5rem] mx-auto
				custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-900:mt-[3.5rem] custom-1400:mt-[8.8rem]"
			>
				<div className="z-[1000] fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkeningLight h-screen">
					<LoadingSmall />
				</div>
			</main>

			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default LoadingScreen;
