import { useLocation } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type MainNavProps = {
	handleOpenMustLoginWarning: () => void;
};

function MainNav({ handleOpenMustLoginWarning }: MainNavProps) {
	const { userRole } = useUserRoleContext();
	const location = useLocation();

	const buttonColor: ButtonColorType = "yellow";
	const buttonColor2: ButtonColorType = "green";
	const buttonFontSize = "text-[1.978rem] tracking-wide custom-2000:text-[3.4rem] custom-3000:text-[4.2rem]";
	const buttonWidth = "w-[212px] custom-2000:w-[350px] custom-3000:w-[500px]";
	const buttonPaddingY = "py-[0.767rem]";

	//ROUTES FOR DIFFERENT USER ROLES ***START
	let publicationsRoute = "/user/publications";
	let forumRoute = "/user/forum";

	if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") {
		publicationsRoute = "/producer/publications";
		forumRoute = "/producer/forum";
	}
	//ROUTES FOR DIFFERENT USER ROLES ***END

	return (
		<nav aria-label="Navegación principal" className="flex justify-center w-[100%]">
			<ul className="flex gap-x-4 custom-2000:gap-x-8">
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
					{userRole === "visitor" ? (
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
							buttonFuncionality={{ linkText: "Publicaciones", linkUrl: publicationsRoute }}
						></Button>
					)}
				</li>

				<li className="">
					{userRole === "visitor" ? (
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
							buttonFuncionality={{ linkText: "Foro", linkUrl: forumRoute }}
						></Button>
					)}
				</li>
			</ul>
		</nav>
	);
}

export default MainNav;
