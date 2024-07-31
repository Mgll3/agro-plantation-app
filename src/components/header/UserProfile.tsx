import { useRef } from "react";
import { user } from "../../data/userData";
import { Link } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";

type UserProfileProps = {
	handleLogoutClick: () => void;
};

function UserProfile({ handleLogoutClick }: UserProfileProps) {
	const { userRole } = useUserRoleContext();
	const expandProfileIcon = useRef(null);
	const userProfile = useRef(null);
	const userFirstName = user.name.split(" ")[0] + " " + user.name.split(" ")[1][0] + ".";

	function showHideProfileOptions() {
		if ((userProfile.current! as HTMLDivElement).classList.contains("opacity-0")) {
			(userProfile.current! as HTMLDivElement).classList.remove("opacity-0");
			(userProfile.current! as HTMLDivElement).classList.add("opacity-100");
			(expandProfileIcon.current! as HTMLDivElement).classList.add("rotate-90");
		} else {
			(userProfile.current! as HTMLDivElement).classList.add("opacity-0");
			(userProfile.current! as HTMLDivElement).classList.remove("opacity-100");
			(expandProfileIcon.current! as HTMLDivElement).classList.remove("rotate-90");
		}
	}

	return (
		<div aria-label="Mi perfil" className="">
			<div className="flex justify-center items-center w-fit py-[0px] custom-800:py-[6px] custom-1000:py-[10px] px-[9px] custom-1000:px-[12px] custom-2000:px-[2rem] rounded-lg custom-2000:rounded-3xl bg-brandingYellow">
				{userRole === "PRODUCER" || userRole === "PRODUCER_VIP" ? (
					<img
						src="/icons/black-plant.png"
						alt=""
						className="hidden custom-800:block custom-2000:w-[3.2rem] custom-3000:w-[3.8rem] mr-[0.8rem] custom-3000:mr-[1.2rem]"
					/>
				) : null}

				<p
					role="button"
					onClick={showHideProfileOptions}
					className="hidden custom-800:inline mr-[1.8rem] custom-3000:mr-[2.5rem] font-sans font-normal custom-1000:font-semibold text-[1.6rem] custom-1000:text-[19.78px] custom-2000:text-[3.2rem] custom-3000:text-[3.8rem]"
				>
					{user.name}
				</p>

				<p role="button" className="custom-800:hidden font-sans font-normal text-[1.2rem]">
					{userFirstName}
				</p>

				<div
					className="hidden custom-800:flex items-center cursor-pointer duration-200"
					onClick={showHideProfileOptions}
					ref={expandProfileIcon}
				>
					<img src="/icons/arrow-black.png" alt="" className="custom-2000:w-[2.1rem] custom-3000:w-[2.5rem]" />
				</div>
			</div>

			<nav
				aria-label="Navegación Secundaria"
				ref={userProfile}
				className="min-w-[15vw] opacity-0 duration-300 w-3/4 m-auto mt-4 bg-brandingLightYellow shadow-lg rounded-lg text-brandingDarkGreen z-10 overflow-hidden"
			>
				<p className="text-[2.4rem] custom-2000:text-[3.3rem] text-center py-3">Mi Perfil</p>

				<div className="border-b border-brandingLightBlue mx-2 mb-3"></div>

				<div className="flex flex-col gap-y-0 text-[1.8rem] custom-2000:text-[2.5rem]">
					<Link to="" className="px-4 py-2 hover:font-bold hover:bg-brandingYellow duration-200">
						Opción 1
					</Link>
					<Link to="" className="px-4 py-2 hover:font-bold hover:bg-brandingYellow duration-200">
						Opción 2
					</Link>
					<Link to="" className="px-4 py-2 mb-2 hover:font-bold hover:bg-brandingYellow duration-200">
						Opción 3
					</Link>
				</div>

				<div className="border-b border-brandingLightBlue mx-2 mb-2"></div>

				<p
					className="px-4 py-2 mb-2 text-[1.8rem] custom-2000:text-[2.5rem] cursor-pointer hover:font-bold hover:bg-brandingYellow duration-200"
					role="link"
					onClick={handleLogoutClick}
				>
					Cerrar Sesión
				</p>
			</nav>
		</div>
	);
}

export default UserProfile;
