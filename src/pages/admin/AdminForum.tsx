import { Helmet } from "react-helmet";
import Header from "../../components/header/Header";

function AdminForum() {
	return (
		<>
			<Helmet>
				<title>Plant-In Forum</title>
				<meta name="robots" content="noindex, nofollow"></meta>
			</Helmet>

			<div className="w-full">
				<Header />
			</div>

			<nav>HERRAMIENTAS DE ADMINISTRADOR</nav>

			<main>FORO DISPONIBLE EN EL SIGUIENTE MVP!!!</main>
		</>
	);
}

export default AdminForum;
