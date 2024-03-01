import { useEffect, useRef, useState } from "react";
import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";
import { userProfileStateType } from "./headerTypes";
import { logOutUser } from "../../interfaces/logOutUser";
import { useNavigate } from "react-router-dom";


type HeaderProps = {
	bgImageTailwind: string,
	logoSrc: string,
	handleOpenMustLoginWarning?: () => void
}

function Header({ bgImageTailwind, logoSrc, handleOpenMustLoginWarning }: HeaderProps) {

	const { userRole, setUserRole } = useUserRoleContext();
	const [userProfileState, setUserProfileState] = useState<userProfileStateType>("init");

	const axiosController = useRef<AbortController>();

	const navigate = useNavigate();


	function handleLogoutClick() {
		setUserProfileState("loading");

		logOutUser(axiosController.current!)
			.then(() => {
				setUserRole("visitor");
				setUserProfileState("logout");
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		axiosController.current = new AbortController();

		return () => {
			axiosController.current?.abort();
		};
	}, []);

	useEffect(() => {
		if (userProfileState === "logout") {

			setUserProfileState("init");
			navigate("/", { replace: true });
		}
	}, [userProfileState]);

	return (
		<>
			<header className="overflow-hidden w-full">
				<div className={`${bgImageTailwind} bg-cover relative flex justify-center items-center py-5`}>
					<img src={logoSrc} alt="" className="w-1/5" />
					<div className="absolute right-4 top-2">

						{
							userRole === "visitor"
								? <SecondaryNav />
								: <UserProfile userProfileState={userProfileState} handleLogoutClick={handleLogoutClick} />
						}

					</div>
				</div>

				<div className="flex justify-center bg-brandingLightGreen py-4">
					{
						handleOpenMustLoginWarning
							? <MainNav handleOpenMustLoginWarning={handleOpenMustLoginWarning} />
							: <MainNav />
					}

				</div>
			</header>
		</>
	);
}

export default Header;
