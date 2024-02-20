import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
		<main>
			<h1>La página indicada no existe. Redirigiendo a Home...</h1>
		</main>
	);
}

export default WrongPath;
