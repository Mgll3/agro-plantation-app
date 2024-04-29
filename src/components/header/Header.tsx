import { useEffect, useState } from "react";
import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";
import { userProfileStateType } from "./headerTypes";
import { useNavigate } from "react-router-dom";
import { eraseStoredToken } from "../../utils/eraseStoredToken";
import AdminNav from "./AdminNav";
import MustLoginWarning from "./MustLoginWarning";

type MustLoginWarningStateType = "visible" | "hidden";

function Header() {
	const [mustLoginWarningState, setMustLoginWarningState] = useState<MustLoginWarningStateType>("hidden");
	const { userRole, setUserRole } = useUserRoleContext();
	const [userProfileState, setUserProfileState] = useState<userProfileStateType>("init");
	let logoutTimeout: number;
	const navigate = useNavigate();


	function handleOpenMustLoginWarning() {
		setMustLoginWarningState("visible");
	}

	function handleCloseMustLoginWarning() {
		setMustLoginWarningState("hidden");
	}


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
				<div className="bg-headerBg bg-cover bg-center bg-no-repeat relative flex justify-center items-center py-5">
					<img src="images/logos/Logo_fondo_verde.png" alt="" className="w-1/12" />
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

				{
					mustLoginWarningState === "visible"
					&& <MustLoginWarning handleCloseMustLoginWarning={handleCloseMustLoginWarning} />
				}
			</header>
		</>
	);
}

export default Header;
