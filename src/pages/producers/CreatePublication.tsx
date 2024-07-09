import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import CreatePublicationForm from "../../components/forms/CreatePublicationForm";
import { NewPublicationType } from "../../components/forms/formsTypes";

function CreatePublication() {
	const navigate = useNavigate();

	function handleSubmit(formValues: NewPublicationType) {
		console.log(formValues);
	}

	return (
		<>
			<div className="w-full">
				<Header />
			</div>

			<main className="w-full p-[5vw] font-sans">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex items-center py-[10px] px-[16px] mb-[25px] text-[12px] font-semibold border-2 border-brandingYellow rounded-md text-brandingYellow"
				>
					<img alt="" src="/icons/Shape@2x.png" className="w-[5px] h-[8px] mr-[20px]" />
					Volver a Home
				</button>

				<h1 className="font-bold mb-[14px] text-[35px]">Crea tu publicación</h1>

				<p className="w-[65%] mb-20 text-[16px]">
					Agregá todos los detalles de tu publicación para que los lectores sepan qué esperar
				</p>

				<div className="flex flex-col px-[109px] py-[20px]">
					<CreatePublicationForm handleSubmit={handleSubmit} />
				</div>
			</main>

			<Footer />
		</>
	);
}

export default CreatePublication;
