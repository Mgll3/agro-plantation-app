import { useLocation } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type MainNavProps = {
	handleOpenMustLoginWarning?: () => void;
};

function MainNav({ handleOpenMustLoginWarning }: MainNavProps) {
	const { userRole } = useUserRoleContext();
	const location = useLocation();

	const buttonColor: ButtonColorType = "yellow";
	const buttonColor2: ButtonColorType = "green";
	const buttonFontSize = "text-base";
	const buttonWidth = "w-[200px]";
	const buttonPaddingY = "py-2.5";

	return (
		<nav aria-label="Navegación principal" className="flex justify-center w-[100%]">
			<ul className="flex gap-x-4">
				<li className="">
					<Button
						buttonColor={location.pathname === "/" ? buttonColor2 : buttonColor}
						buttonFontSize={buttonFontSize}
						buttonWidth={buttonWidth}
						buttonPaddingY={buttonPaddingY}
						buttonFuncionality={{ linkText: "Home", linkUrl: "/" }}
					></Button>
				</li>

				<li className="">
					{!handleOpenMustLoginWarning ? (
						<Button
							buttonColor={location.pathname === "/publications" ? buttonColor2 : buttonColor}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={{ linkText: "Publicaciones", linkUrl: "/publications" }}
						></Button>
					) : userRole === "visitor" ? (
						<Button
							buttonColor={location.pathname === "/publications" ? buttonColor2 : buttonColor}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={{ actionText: "Publicaciones", handleClick: handleOpenMustLoginWarning }}
						></Button>
					) : (
						<Button
							buttonColor={location.pathname === "/publications" ? buttonColor2 : buttonColor}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={{ linkText: "Publicaciones", linkUrl: "/publications" }}
						></Button>
					)}
				</li>

				<li className="">
					{!handleOpenMustLoginWarning ? (
						<Button
							buttonColor={location.pathname === "/forum" ? buttonColor2 : buttonColor}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={{ linkText: "Foro", linkUrl: "/forums" }}
						></Button>
					) : userRole === "visitor" ? (
						<Button
							buttonColor={location.pathname === "/forum" ? buttonColor2 : buttonColor}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={{ actionText: "Foro", handleClick: handleOpenMustLoginWarning }}
						></Button>
					) : (
						<Button
							buttonColor={location.pathname === "/forum" ? buttonColor2 : buttonColor}
							buttonFontSize={buttonFontSize}
							buttonWidth={buttonWidth}
							buttonPaddingY={buttonPaddingY}
							buttonFuncionality={{ linkText: "Foro", linkUrl: "/forums" }}
						></Button>
					)}
				</li>
			</ul>
		</nav>
	);
}

export default MainNav;
