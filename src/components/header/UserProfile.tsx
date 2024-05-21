import { useRef } from "react";
import { user } from "../../data/userData";
import { Link } from "react-router-dom";
import { userProfileStateType } from "./headerTypes";
import Loading from "../modals/Loading";
import { useUserRoleContext } from "../../context/UserRoleContext";

type UserProfileProps = {
	userProfileState: userProfileStateType,
	handleLogoutClick: () => void
}

function UserProfile({ userProfileState, handleLogoutClick }: UserProfileProps) {
	const { userRole } = useUserRoleContext();
	const expandProfileIcon = useRef(null);
	const userProfile = useRef(null);

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
		<div aria-label="Mi perfil" className="w-full">
			<div className="flex justify-center items-center py-[10px] px-[12px] rounded-lg bg-brandingYellow">
				{
					userRole === "PRODUCER" || userRole === "PRODUCER_VIP"
						? (
							<img src="/icons/black-plant.png" alt=""
								className="mr-[6px]"
							/>
						)
						: null
				}

				<p role="button" onClick={showHideProfileOptions} className="mr-[18px] font-semibold font-sans text-[19.78px]">
					{user.name}
				</p>

				<div className="flex items-center cursor-pointer duration-200" onClick={showHideProfileOptions} ref={expandProfileIcon}>
					<img src="/icons/arrow-black.png" alt=""
						className=""
					/>
				</div>
			</div>

			<nav aria-label="Navegación Secundaria" ref={userProfile}
				className="min-w-[15vw] opacity-0 duration-300 w-3/4 m-auto mt-4 bg-brandingLightYellow shadow-lg rounded-lg text-brandingDarkGreen z-10 overflow-hidden"
			>
				<p className="text-2xl text-center py-3">
					Mi Perfil
				</p>

				<div className="border-b border-brandingLightBlue mx-2 mb-3"></div>

				<div className="flex flex-col gap-y-0">
					<Link to="" className="px-4 py-2 hover:font-bold hover:bg-brandingYellow duration-200">Opción 1</Link>
					<Link to="" className="px-4 py-2 hover:font-bold hover:bg-brandingYellow duration-200">Opción 2</Link>
					<Link to="" className="px-4 py-2 mb-2 hover:font-bold hover:bg-brandingYellow duration-200">Opción 3</Link>
				</div>

				<div className="border-b border-brandingLightBlue mx-2 mb-2"></div>

				<p className="px-4 py-2 mb-2 cursor-pointer hover:font-bold hover:bg-brandingYellow duration-200" role="link" onClick={handleLogoutClick} >
					Cerrar Sesión
				</p>

				{
					userProfileState === "loading" && <Loading />
				}
			</nav>
		</div>
	);
}

export default UserProfile;
