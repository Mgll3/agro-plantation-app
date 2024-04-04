import { useEffect, useState } from "react";
import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";
import { userProfileStateType } from "./headerTypes";
import { useNavigate } from "react-router-dom";
import { eraseStoredToken } from "../../utils/eraseStoredToken";
import AdminNav from "./AdminNav";


type HeaderProps = {
	bgImageTailwind: string,
	logoSrc: string,
	handleOpenMustLoginWarning?: () => void
}

function Header({ bgImageTailwind, logoSrc, handleOpenMustLoginWarning }: HeaderProps) {

	const { userRole, setUserRole } = useUserRoleContext();
	const [userProfileState, setUserProfileState] = useState<userProfileStateType>("init");

	let logoutTimeout: number;

	const navigate = useNavigate();


	function handleLogoutClick() {
		setUserProfileState("loading");

		logoutTimeout = window.setTimeout( () => {
			eraseStoredToken();
			setUserRole("visitor");
			setUserProfileState("logout");
		}, 1500);
	}

	useEffect(() => {

		return () => {
			clearTimeout(logoutTimeout);
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
			<header className="w-full">
				<div className={`${bgImageTailwind} bg-cover bg-center bg-no-repeat relative flex justify-center items-center py-5`}>
					<img src={logoSrc} alt="" className="w-1/12" />
					<div className="absolute right-4 top-2">

						{
							userRole === "ADMIN"
								?	null 
								: userRole === "visitor"
									?	<SecondaryNav />
									:	<UserProfile userProfileState={userProfileState} handleLogoutClick={handleLogoutClick} />
						}

					</div>
				</div>

				<div className="flex justify-center bg-brandingLightGreen py-4">

					{
						userRole === "ADMIN"
							? <AdminNav />
							: handleOpenMustLoginWarning
								? <MainNav handleOpenMustLoginWarning={handleOpenMustLoginWarning} />
								: <MainNav />
					}

				</div>
			</header>
		</>
	);
}

export default Header;
