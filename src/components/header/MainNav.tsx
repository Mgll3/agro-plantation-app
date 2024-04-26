import { useUserRoleContext } from "../../context/UserRoleContext";
import Button from "../button/Button";
import { ButtonColorType } from "../button/buttonTypes";

type MainNavProps = {
	handleOpenMustLoginWarning?: () => void;
}

function MainNav({ handleOpenMustLoginWarning }: MainNavProps) {
	const { userRole } = useUserRoleContext();

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
						buttonFuncionality={{ linkText: "Home", linkUrl: "/" }}>
					</Button>
				</li>

				<li className="">
					{
						!handleOpenMustLoginWarning
							? (
								<Button
									buttonColor={buttonColor}
									buttonFontSize={buttonFontSize}
									buttonWidth={buttonWidth}
									buttonPaddingY={buttonPaddingY}
									buttonFuncionality={{ linkText: "Publicaciones", linkUrl: "/publications" }}>
								</Button>
							)
							: userRole === "visitor"
								? (
									<Button
										buttonColor={buttonColor}
										buttonFontSize={buttonFontSize}
										buttonWidth={buttonWidth}
										buttonPaddingY={buttonPaddingY}
										buttonFuncionality={{ actionText: "Publicaciones", handleClick: handleOpenMustLoginWarning }}>
									</Button>
								)
								: (
									<Button
										buttonColor={buttonColor}
										buttonFontSize={buttonFontSize}
										buttonWidth={buttonWidth}
										buttonPaddingY={buttonPaddingY}
										buttonFuncionality={{ linkText: "Publicaciones", linkUrl: "/publications" }}>
									</Button>
								)
					}
				</li>

				<li className="">
					{
						!handleOpenMustLoginWarning
							? (
								<Button
									buttonColor={buttonColor}
									buttonFontSize={buttonFontSize}
									buttonWidth={buttonWidth}
									buttonPaddingY={buttonPaddingY}
									buttonFuncionality={{ linkText: "Foro", linkUrl: "/forums" }}>
								</Button>
							)
							: userRole === "visitor"
								? (
									<Button
										buttonColor={buttonColor}
										buttonFontSize={buttonFontSize}
										buttonWidth={buttonWidth}
										buttonPaddingY={buttonPaddingY}
										buttonFuncionality={{ actionText: "Foro", handleClick: handleOpenMustLoginWarning }}>
									</Button>
								)
								: (
									<Button
										buttonColor={buttonColor}
										buttonFontSize={buttonFontSize}
										buttonWidth={buttonWidth}
										buttonPaddingY={buttonPaddingY}
										buttonFuncionality={{ linkText: "Foro", linkUrl: "/forums" }}>
									</Button>
								)
					}
				</li>
			</ul>
		</nav>
	);
}

export default MainNav;
