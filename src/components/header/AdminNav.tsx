import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

function AdminNav() {
	const buttonColor: ButtonColorType = "yellow";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-53";
	const buttonPaddingY = "py-2.5";

	return (
		<nav aria-label="Navegación principal" className="">
			<ul className="flex gap-x-4">
				<li className="">
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Publicaciones", linkUrl: "/admin_publications" }}>
					</Button>
				</li>

				<li className="">
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Usuarios", linkUrl: "/admin_users" }}>
					</Button>
				</li>

				<li className="">
					<Button
						buttonColor={buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Foro", linkUrl: "/admin_forum" }}>
					</Button>
				</li>
			</ul>
		</nav>
	);
}

export default AdminNav;
