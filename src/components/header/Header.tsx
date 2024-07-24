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
	const [userProfileState, setUserProfileState] = useState<userProfileStateType>("init");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { userRole, setUserRole } = useUserRoleContext();
	let logoutTimeout: number;
	const navigate = useNavigate();

	// Used to show the main section where the user is now (mobile version) ***START
	const location = useLocation();
	const regexPublications = /\/publications/;
	const regexUsers = /\/users(\/|$)/;
	const regexForum = /\/forum/;
	let actualSection = "Home";

	if (regexPublications.test(location.pathname)) actualSection = "Publicaciones";
	if (regexUsers.test(location.pathname)) actualSection = "Usuarios";
	if (regexForum.test(location.pathname)) actualSection = "Foro";
	// Used to show the main section where the user is now (mobile version) ***END

	//Used in the mobile menu links ***START
	let publicationsRoute = "/user/publications";
	let forumRoute = "/user/forum";

	if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") {
		publicationsRoute = "/producer/publications";
		forumRoute = "/producer/forum";
	}
	//Used in the mobile menu links ***END

	function toggleMobileMenuVisibility() {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	}

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

					{/* MOBILE MENU AND ICON START*/}
					<div
						onClick={toggleMobileMenuVisibility}
						className="absolute top-[0px] left-[16px] text-[4.2rem] text-yellow500 custom-800:hidden"
					>
						<MenuRoundedIcon color="inherit" fontSize="inherit" />
					</div>

					<div
						onClick={toggleMobileMenuVisibility}
						className={`${isMobileMenuOpen === false ? "hidden" : "flex"} z-[1000] fixed top-0 w-screen  h-screen bg-screenDarkening`}
					>
						<div
							className={`z-50 absolute top-0 ${isMobileMenuOpen === false ? "left-[-100%]" : "left-0"} flex flex-col items-start w-[20.6rem] p-[0.8rem_1.6rem] rounded-tr-3xl rounded-br-3xl bg-terciary150 duration-700`}
						>
							<div className="flex justify-center w-full">
								<img src="/images/logos/LogoVerde.png" alt="" className="w-[6.624rem]" />
							</div>

							<hr className="w-[100%] my-[1.6rem] border-brandingDarkGreen" />

							<div className="flex justify-start items-center mb-[1.6rem] cursor-pointer">
								<img src="/icons/mobile_menu/home.png" alt="" className="w-[24px]" />
								<Link to="/" className="ml-[0.8rem] text-[2rem] text-brandingDarkGreen">
									Home
								</Link>
							</div>

							<div className="flex justify-start items-center mb-[1.6rem] cursor-pointer">
								<img src="/icons/mobile_menu/publications.png" alt="" className="w-[24px]" />
								<Link to={publicationsRoute} className="ml-[0.8rem] text-[2rem] text-brandingDarkGreen">
									Publicaciones
								</Link>
							</div>

							<div className="flex justify-start items-center mb-[1.6rem] cursor-pointer">
								<img src="/icons/mobile_menu/forum.png" alt="" className="w-[24px]" />
								<Link to={forumRoute} className="ml-[0.8rem] text-[2rem] text-brandingDarkGreen">
									Foro
								</Link>
							</div>

							<hr className="w-[100%] my-[1.6rem] border-brandingDarkGreen" />

							<div className="flex justify-start items-center mb-[1.6rem] cursor-pointer">
								<img src="/icons/mobile_menu/login.png" alt="" className="w-[24px]" />
								<Link to="/login" className="ml-[0.8rem] text-[2rem] text-brandingDarkGreen">
									Ingresa
								</Link>
							</div>

							<div className="flex justify-start items-center mb-[1.6rem] cursor-pointer">
								<img src="/icons/mobile_menu/register.png" alt="" className="w-[24px]" />
								<Link to="/register" className="ml-[0.8rem] text-[2rem] text-brandingDarkGreen">
									Regístrate
								</Link>
							</div>

							<hr className="w-[100%] my-[1.6rem] border-brandingDarkGreen" />

							<div onClick={handleLogoutClick} className="flex justify-start items-center mb-[1.6rem] cursor-pointer">
								<img src="/icons/mobile_menu/logout.png" alt="" className="w-[16px]" />
								<p className="ml-[0.8rem] text-[2rem] text-brandingDarkGreen">Cerrar sesión</p>
							</div>
						</div>
					</div>

					{/* MOBILE MENU AND ICON END*/}

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
					{userRole === "ADMIN" ? <AdminNav /> : <MainNav handleOpenMustLoginWarning={handleOpenMustLoginWarning} />}
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
