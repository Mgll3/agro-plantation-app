import { useLocation } from "react-router-dom";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function AdminNav() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonColor2: ButtonColorType = "green";
	const buttonFontSize = "text-[1.978rem]";
	const buttonWidth = "w-[21.2rem]";
	const buttonPaddingY = "py-[0.77rem]";
	const location = useLocation();
	const regex = /^\/admin\/publications/;

	return (
		<nav aria-label="Navegación principal" className="">
			<ul className="flex gap-x-4">
				<li className="">
					<Button
						buttonColor={regex.test(location.pathname) ? buttonColor2 : buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Publicaciones", linkUrl: "/admin/publications/1" }}
					></Button>
				</li>

				<li className="">
					<Button
						buttonColor={location.pathname === "/admin/users" ? buttonColor2 : buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Usuarios", linkUrl: "/admin/users" }}
					></Button>
				</li>

				<li className="">
					<Button
						buttonColor={location.pathname === "/admin/forum" ? buttonColor2 : buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Foro", linkUrl: "/admin/forum" }}
					></Button>
				</li>
			</ul>
		</nav>
	);
}

export default AdminNav;
