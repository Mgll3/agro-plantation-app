import { Link } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { useEffect, useRef } from "react";

type MobileNavProps = {
	toggleMobileMenuVisibility: () => void;
	handleLogoutClick: () => void;
	mobileNavStyles: "mounting" | "unmounting";
};

function MobileNav({ toggleMobileMenuVisibility, handleLogoutClick, mobileNavStyles }: MobileNavProps) {
	const { userRole } = useUserRoleContext();
	const mainDivElement = useRef<HTMLDivElement>(null);
	const contentDivElement = useRef<HTMLDivElement>(null);

	let publicationsRoute = "/user/publications";
	let forumRoute = "/user/forum";

	if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") {
		publicationsRoute = "/producer/publications";
		forumRoute = "/producer/forum";
	}

	const mobileNavStylesTiemout = useRef<number>(0);

	useEffect(() => {
		if (mobileNavStyles === "mounting") {
			mobileNavStylesTiemout.current = window.setTimeout(() => {
				mainDivElement.current?.classList.replace("bg-transparent", "bg-screenDarkening");
				contentDivElement.current?.classList.replace("left-[-30%]", "left-0");
			}, 0);
		} else {
			mainDivElement.current?.classList.replace("bg-screenDarkening", "bg-transparent");
			contentDivElement.current?.classList.replace("left-0", "left-[-30%]");
		}

		return () => {
			clearTimeout(mobileNavStylesTiemout.current);
		};
	});

	return (
		<div
			ref={mainDivElement}
			onClick={toggleMobileMenuVisibility}
			className={`z-[1000] fixed top-0 left-0 w-screen h-screen transition-all duration-1000 ${mobileNavStyles === "mounting" ? "bg-transparent" : "bg-screenDarkening"} `}
		>
			<div
				ref={contentDivElement}
				className={`z-50 absolute top-0 ${mobileNavStyles === "mounting" ? "left-[-30%]" : "left-0"} flex flex-col items-start w-[20.6rem] p-[0.8rem_1.6rem] rounded-tr-3xl rounded-br-3xl bg-terciary150 duration-700`}
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
	);
}

export default MobileNav;
