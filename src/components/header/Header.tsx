import { useEffect, useState } from "react";
import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";
import { userProfileStateType } from "./headerTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import MustLoginWarning from "./MustLoginWarning";
import DvrIcon from "@mui/icons-material/Dvr";
import { resetUserData } from "../../utils/resetUserData";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

type MustLoginWarningStateType = "visible" | "hidden";

function Header() {
	const [mustLoginWarningState, setMustLoginWarningState] = useState<MustLoginWarningStateType>("hidden");
	const { userRole, setUserRole } = useUserRoleContext();
	const [userProfileState, setUserProfileState] = useState<userProfileStateType>("init");
	let logoutTimeout: number;
	const navigate = useNavigate();

	// Used to show the main section where the user is now (mobile version)
	const location = useLocation();
	// const regexHome = /^\/$/;
	const regexPublications = /\/publications/;
	const regexUsers = /\/users(\/|$)/;
	const regexForum = /\/forum/;
	let actualSection = "Home";

	if (regexPublications.test(location.pathname)) actualSection = "Publicaciones";
	if (regexUsers.test(location.pathname)) actualSection = "Usuarios";
	if (regexForum.test(location.pathname)) actualSection = "Foro";

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
					className={`flex justify-center items-center h-[98px] custom-800:h-[239px] ${headerBg} bg-cover bg-center bg-no-repeat relative`}
				>
					<Link to="/management" className="absolute bottom-[0px] left-0 w-[40px] pl-[1rem] text-[4rem]">
						<DvrIcon fontSize="inherit" />
					</Link>

					<div className="absolute top-[0px] left-[16px] text-[4.2rem] text-yellow500 custom-800:hidden">
						<MenuRoundedIcon color="inherit" fontSize="inherit" />
					</div>

					{userRole === "ADMIN" ? (
						<img
							src="/images/logos/Logo_original_Plant-In.png"
							alt=""
							className="w-[66px] custom-800:w-[90px] custom-950:w-[128px]"
						/>
					) : (
						<img
							src="/images/logos/Logo_fondo_verde.png"
							alt=""
							className="w-[66px] custom-800:w-[90px] custom-950:w-[128px]"
						/>
					)}

					<div className="hidden absolute right-4 top-2 custom-800:block">
						{userRole === "visitor" ? (
							<SecondaryNav />
						) : (
							<UserProfile userProfileState={userProfileState} handleLogoutClick={handleLogoutClick} />
						)}
					</div>
				</div>

				<div className="hidden justify-center bg-brandingLightGreen py-[18px] custom-800:flex">
					{userRole === "ADMIN" ? (
						<AdminNav />
					) : handleOpenMustLoginWarning ? (
						<MainNav handleOpenMustLoginWarning={handleOpenMustLoginWarning} />
					) : (
						<MainNav />
					)}
				</div>

				<div className="flex justify-center bg-brandingLightGreen py-[0.2rem] custom-800:hidden">
					<h1 className="text-[2.4rem] text-brandingDarkGreen font-semibold">{actualSection}</h1>
				</div>

				{mustLoginWarningState === "visible" && (
					<MustLoginWarning handleCloseMustLoginWarning={handleCloseMustLoginWarning} />
				)}
			</header>
		</>
	);
}

export default Header;
