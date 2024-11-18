import { Helmet } from "react-helmet";
import Header from "../../components/header/Header";

function UserForum() {
	return (
		<>
			<Helmet>
				<title>Plant-In Foro</title>
				<meta name="robots" content="noindex, nofollow"></meta>
			</Helmet>
			<div className="w-full">
				<Header />
			</div>
			ESTÁS EN EL FORO (VERSIÓN USUARIO REGISTRADO)
		</>
	);
}

export default UserForum;
