import Header from "../../components/header/Header";

function AdminPublications() {

	const bgImageTailwind = "bg-headerBg";
	const logoSrc = "images/Logo_fondo_verde.png";

	return (
		<>
			<div className="w-full" >
				<Header bgImageTailwind={bgImageTailwind} logoSrc={logoSrc} />
			</div>

			<nav>
				HERRAMIENTAS DE ADMINISTRADOR
			</nav>
			
			<main>
				PUBLICACIONES
			</main>

		</>
	);
}

export default AdminPublications;