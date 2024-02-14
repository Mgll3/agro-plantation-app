import { Link } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";

function MainNav() {
	const { userRole } = useUserRoleContext();

	return (
		<nav className="">
			<ul className="">
				<li className="">
					<Link to="/" className="">Home</Link>
				</li>

				<li className="">
					<Link to="/forums" className="">Foro</Link>
				</li>

				<li className="">
					<Link to="/publications" className="">Publicaciones</Link>
				</li>
			</ul>
		</nav>
	);
}

export default MainNav;
