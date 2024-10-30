import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LoadingSmall from "../../components/modals/LoadingSmall";

function WrongPath() {
	const navigate = useNavigate();

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			navigate("/");
		}, 3000);

		return () => {
			clearTimeout(redirectTimer);
		};
	});

	return (
		<div className="flex flex-col min-h-[100vh]">
			<Helmet>
				<title>Plant-In URL Incorrecta</title>
			</Helmet>
			<div className="w-full">
				<Header />
			</div>

			<main
				className="flex flex-col items-center flex-grow w-[100%] min-h-[40vh] mt-[0.5rem] mx-auto
				custom-500:mt-[2rem] custom-700:mt-[2.5rem] custom-900:mt-[3.5rem] custom-1400:mt-[8.8rem]"
			>
				<h1 className="text-center font-bold font-niramit text-black text-[2rem] leading-[4rem]">
					¡Vaya! La página indicada no existe.
					<br />
					<span className="font-semibold text-brandingDarkGreen text-[1.8rem]"> Redirigiendo a Home...</span>
				</h1>

				<div className="my-[7vh]">
					<LoadingSmall />
				</div>
			</main>

			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default WrongPath;
