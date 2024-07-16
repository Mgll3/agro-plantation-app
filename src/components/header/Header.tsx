import { useEffect, useState } from "react";
import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";
import { userProfileStateType } from "./headerTypes";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import MustLoginWarning from "./MustLoginWarning";
import DvrIcon from "@mui/icons-material/Dvr";
import { resetUserData } from "../../utils/resetUserData";

type MustLoginWarningStateType = "visible" | "hidden";

function Header() {
	const [mustLoginWarningState, setMustLoginWarningState] = useState<MustLoginWarningStateType>("hidden");
	const { userRole, setUserRole } = useUserRoleContext();
	const [userProfileState, setUserProfileState] = useState<userProfileStateType>("init");
	let logoutTimeout: number;
	const navigate = useNavigate();

	//Fondo del Header. Varía según el rol del usuario.
	let headerBg: string = "bg-headerBg";

	if (userRole === "ADMIN") {
		headerBg = "bg-headerBgAdmin";
	}

	function handleOpenMustLoginWarning() {
		setMustLoginWarningState("visible");
	}

	function handleCloseMustLoginWarning(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target === e.currentTarget) {
			setMustLoginWarningState("hidden");
		}
	}

	function handleLogoutClick() {
		setUserProfileState("loading");

		logoutTimeout = window.setTimeout(() => {
			resetUserData(setUserRole);
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
				<div
					className={`flex justify-center items-center h-[239px] ${headerBg} bg-cover bg-center bg-no-repeat relative`}
				>
					<Link to="/management" className="absolute top-0 left-0 w-[40px] text-3xl">
						<DvrIcon fontSize="inherit" />
					</Link>

					{userRole === "ADMIN" ? (
						<img src="/images/logos/Logo_original_Plant-In.png" alt="" className="w-[128px]" />
					) : (
						<img src="/images/logos/Logo_fondo_verde.png" alt="" className="w-[128px]" />
					)}

					<div className="absolute right-4 top-2">
						{userRole === "visitor" ? (
							<SecondaryNav />
						) : (
							<UserProfile userProfileState={userProfileState} handleLogoutClick={handleLogoutClick} />
						)}
					</div>
				</div>

				<div className="flex justify-center bg-brandingLightGreen py-[18px]">
					{userRole === "ADMIN" ? (
						<AdminNav />
					) : handleOpenMustLoginWarning ? (
						<MainNav handleOpenMustLoginWarning={handleOpenMustLoginWarning} />
					) : (
						<MainNav />
					)}
				</div>

				{mustLoginWarningState === "visible" && (
					<MustLoginWarning handleCloseMustLoginWarning={handleCloseMustLoginWarning} />
				)}
			</header>
		</>
	);
}

export default Header;
