import { useEffect, useRef, useState } from "react";
import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";
import { loginStateType } from "./headerTypes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import MustLoginWarning from "./MustLoginWarning";
import DvrIcon from "@mui/icons-material/Dvr";
import { resetUserData } from "../../utils/resetUserData";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MobileNav from "./MobileNav";
import Loading from "../modals/Loading";

type MustLoginWarningStateType = "visible" | "hidden";

function Header() {
	const [mustLoginWarningState, setMustLoginWarningState] = useState<MustLoginWarningStateType>("hidden");
	const [loginState, setLoginState] = useState<loginStateType>("init");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [mobileNavStyles, setMobileNavStyles] = useState<"mounting" | "unmounting">("mounting"); //Used to trigger the fade-in / fade-out animations of the mobile menu
	const { userRole, setUserRole } = useUserRoleContext();
	const logoutTimeout = useRef<number>();
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

	const mobileMenuStylesTimeout = useRef<number>(0);

	function toggleMobileMenuVisibility(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (isMobileMenuOpen === false) {
			setMobileNavStyles("mounting");
			setIsMobileMenuOpen(true);
		} else if (event.target === event.currentTarget) {
			setMobileNavStyles("unmounting");

			mobileMenuStylesTimeout.current = window.setTimeout(() => {
				setIsMobileMenuOpen(false);
			}, 700);
		}
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
		setLoginState("loading");

		logoutTimeout.current = window.setTimeout(() => {
			resetUserData(setUserRole);
			setLoginState("logout");
		}, 1500);
	}

	//Uses handleLogoutClick, but also closes the mobile menu
	function handleLogoutClickMobile() {
		setMobileNavStyles("unmounting");

		mobileMenuStylesTimeout.current = window.setTimeout(() => {
			setIsMobileMenuOpen(false);
		}, 700);

		handleLogoutClick();
	}

	useEffect(() => {
		return () => {
			clearTimeout(logoutTimeout.current);
			clearTimeout(mobileMenuStylesTimeout.current);
		};
	}, []);

	useEffect(() => {
		if (loginState === "logout") {
			setLoginState("init");
			navigate("/", { replace: true });
		}
	}, [loginState]);

	return (
		<>
			<header className="w-full">
				<div
					className={`relative flex justify-center items-center w-[100vw] h-[98px] custom-1000:h-[180px] custom-2000:h-[270px] custom-3000:h-[320px] ${headerBg} bg-cover bg-center bg-no-repeat`}
				>
					<Link to="/management" className="absolute bottom-[0px] left-0 w-[40px] pl-[1rem] text-[4rem]">
						<DvrIcon fontSize="inherit" />
					</Link>

					{/* MOBILE MENU ***START */}
					<div
						onClick={toggleMobileMenuVisibility}
						className="absolute top-[0px] left-[16px] text-[4.2rem] text-yellow500 custom-800:hidden cursor-pointer"
					>
						<MenuRoundedIcon color="inherit" fontSize="inherit" />
					</div>

					{isMobileMenuOpen === true ? (
						<MobileNav
							toggleMobileMenuVisibility={toggleMobileMenuVisibility}
							handleLogoutClickMobile={handleLogoutClickMobile}
							mobileNavStyles={mobileNavStyles}
							handleOpenMustLoginWarning={handleOpenMustLoginWarning}
						/>
					) : null}
					{/* MOBILE MENU ***END */}

					{userRole === "ADMIN" ? (
						<img
							src="/images/logos/Logo_original_Plant-In.png"
							alt=""
							className="w-[66px] custom-1000:w-[118px] custom-2000:w-[170px] custom-3000:w-[200px]"
						/>
					) : (
						<img
							src="/images/logos/Logo_fondo_verde.png"
							alt=""
							className="w-[66px] custom-1000:w-[118px] custom-2000:w-[170px] custom-3000:w-[200px]"
						/>
					)}

					<div className="hidden absolute right-[30px] top-[10px] custom-1000:right-[43px] custom-1000:top-[28px] custom-800:block">
						{userRole === "visitor" ? <SecondaryNav /> : <UserProfile handleLogoutClick={handleLogoutClick} />}
					</div>
					<div className="absolute right-[-60px] top-[5px] custom-800:right-[30px] custom-800:top-[10px] custom-1000:right-[43px] custom-1000:top-[28px] custom-800:hidden">
						{userRole !== "visitor" && <UserProfile handleLogoutClick={handleLogoutClick} />}
					</div>
				</div>

				<div className="hidden justify-center bg-brandingLightGreen py-[10px] custom-1000:py-[18px] custom-800:flex">
					{userRole === "ADMIN" ? <AdminNav /> : <MainNav handleOpenMustLoginWarning={handleOpenMustLoginWarning} />}
				</div>

				<div className="flex justify-center bg-brandingLightGreen py-[0.2rem] custom-800:hidden">
					<h1 className="text-[2.4rem] text-brandingDarkGreen font-semibold">{actualSection}</h1>
				</div>

				{mustLoginWarningState === "visible" && (
					<MustLoginWarning handleCloseMustLoginWarning={handleCloseMustLoginWarning} />
				)}

				{loginState === "loading" && <Loading />}
			</header>
		</>
	);
}

export default Header;
