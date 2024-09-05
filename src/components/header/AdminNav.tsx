import { useLocation } from "react-router-dom";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function AdminNav() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonColor2: ButtonColorType = "green";
	const buttonFontSize =
		"tracking-[0rem] text-[1.7rem] custom-1000:text-[1.978rem] custom-2000:text-[3.4rem] custom-3000:text-[4.2rem]";
	const buttonWidth = "w-[180px] custom-1000:w-[212px] custom-2000:w-[350px] custom-3000:w-[500px]";
	const buttonPaddingY = "py-[0.77rem]";
	const location = useLocation();
	const regex = /^\/admin\/publications/;

	return (
		<nav aria-label="Navegación principal" className="">
			<ul
				className="flex gap-x-[1rem]
				custom-2500:gap-x-[2rem] custom-3500:gap-x-[3rem]"
			>
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
