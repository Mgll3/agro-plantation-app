import { useEffect, useRef, useState } from "react";
import { user } from "../../data/userData";
import { Link } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";

type DeviceUsedType = "pc" | "mobile";

type UserProfileProps = {
	handleLogoutClick: () => void;
};

function UserProfile({ handleLogoutClick }: UserProfileProps) {
	//Used to render the correct filter component based on window width
	const deviceUsedInitValue: DeviceUsedType = window.innerWidth <= 800 ? "mobile" : "pc";
	const [deviceUsed, setDeviceUsed] = useState<DeviceUsedType>(deviceUsedInitValue);

	const { userRole } = useUserRoleContext();
	const expandProfileIcon = useRef(null);
	const userProfile = useRef(null);
	const userFirstName = user.name.split(" ")[0] + " " + user.name.split(" ")[1][0] + ".";

	//Este bloque determina a dónde dirige cada link del combo y cuál es el texto a mostrar, según el rol del usuario.
	let option1Link: string;
	let option2Link: string;
	let option3Link: string;

	let option1Text: string;
	let option2Text: string;
	let option3Text: string;

	if (userRole === "USER") {
		option1Link = "/user/registerProducer";
		option2Link = "";
		option3Link = "";
		option1Text = "Quiero ser Productor";
		option2Text = "Opción Provisional";
		option3Text = "Opción Provisional";
	} else if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") {
		option1Link = "/producer/publications/createPublication";
		option2Link = "";
		option3Link = "";
		option1Text = "Crear Publicación";
		option2Text = "Opción Provisional";
		option3Text = "Opción Provisional";
	} else if (userRole === "ADMIN") {
		option1Link = "";
		option2Link = "";
		option3Link = "";
		option1Text = "Opción Provisional";
		option2Text = "Opción Provisional";
		option3Text = "Opción Provisional";
	} else {
		option1Link = "";
		option2Link = "";
		option3Link = "";
		option1Text = "Opción Provisional";
		option2Text = "Opción Provisional";
		option3Text = "Opción Provisional";
	}

	function showHideProfileOptions() {
		if ((userProfile.current! as HTMLDivElement).classList.contains("opacity-0")) {
			(userProfile.current! as HTMLDivElement).classList.remove("hidden");

			setTimeout(() => {
				(userProfile.current! as HTMLDivElement).classList.remove("opacity-0");
				(userProfile.current! as HTMLDivElement).classList.add("opacity-100");
			}, 0);
			(expandProfileIcon.current! as HTMLDivElement).classList.add("rotate-90");
		} else {
			(userProfile.current! as HTMLDivElement).classList.add("opacity-0");
			(userProfile.current! as HTMLDivElement).classList.remove("opacity-100");
			setTimeout(() => {
				(userProfile.current! as HTMLDivElement).classList.add("hidden");
			}, 300);
			(expandProfileIcon.current! as HTMLDivElement).classList.remove("rotate-90");
		}
	}

	useEffect(() => {
		function changeDeviceType() {
			if (window.innerWidth <= 800 && deviceUsed === "pc") {
				setDeviceUsed("mobile");
			} else if (window.innerWidth > 800 && deviceUsed === "mobile") {
				setDeviceUsed("pc");
			}
		}
		window.addEventListener("resize", changeDeviceType);
		return () => {
			window.removeEventListener("resize", changeDeviceType);
		};
	});

	return (
		<div aria-label="Mi perfil" className="relative" id="userProfileMainContainer">
			<div
				id="userProfileSecondaryContainer"
				className="flex justify-center items-center w-fit py-[0.3rem] px-[1.1rem] rounded-lg bg-brandingYellow
				custom-800:py-[0.6rem] custom-1000:py-[1rem] custom-2500:py-[1.3rem] custom-3500:py-[1.5rem]
				custom-600:px-[1.2rem] custom-2500:px-[2.3rem] custom-3500:px-[2.5rem]
				custom-2000:rounded-2xl"
			>
				{userRole === "PRODUCER" || userRole === "PRODUCER_VIP" ? (
					<img
						id="userProfilePlantIcon"
						src="/icons/black-plant.png"
						alt=""
						className="hidden custom-800:block custom-2000:w-[3.2rem] custom-3000:w-[3.8rem] mr-[0.8rem] custom-3000:mr-[1.2rem]"
					/>
				) : null}

				<p
					id="userProfileUserName"
					role="button"
					onClick={showHideProfileOptions}
					className="hidden mr-[1.8rem] font-sans font-normal text-[1.6rem]
						custom-800:inline
						custom-3000:mr-[2.5rem]
						custom-1900:text-[1.8rem] custom-2500:text-[2.5rem] custom-3500:text-[3.2rem] 
						custom-1000:font-semibold
						custom-800:cursor-pointer"
				>
					{user.name}
				</p>

				<p
					id="userProfileUserFirstName"
					role="button"
					className="custom-800:hidden font-sans font-normal text-[1.2rem] cursor-default
					custom-500:text-[1.6rem]"
				>
					{userFirstName}
				</p>

				<div
					id="userProfileArrowIconContainer"
					className="hidden custom-800:flex items-center custom-800:cursor-pointer duration-200"
					onClick={showHideProfileOptions}
					ref={expandProfileIcon}
				>
					<img
						id="userProfileArrowIcon"
						src="/icons/arrow-black.png"
						alt=""
						className="custom-2000:w-[1.8rem] custom-3000:w-[2.2rem]"
					/>
				</div>
			</div>

			{deviceUsed === "pc" && (
				<nav
					id="userProfileNavTag"
					aria-label="Navegación Secundaria"
					ref={userProfile}
					className="hidden absolute min-w-[100%] opacity-0 duration-300 m-auto mt-4 bg-brandingLightYellow shadow-lg rounded-lg text-brandingDarkGreen z-10 overflow-hidden"
				>
					<p id="userProfileOptionsTitle" className="text-[2.4rem] custom-2000:text-[3.3rem] text-center py-3">
						Mi Perfil
					</p>

					<div id="userProfileDecorator" className="border-b border-brandingLightBlue mx-2 mb-3"></div>

					<div
						id="userProfileMainOptionsContainer"
						className="flex flex-col gap-y-0 text-[1.8rem] custom-2000:text-[2.5rem]"
					>
						<Link
							id="userProfileOption1Link"
							to={option1Link}
							className="px-4 py-2 hover:font-bold hover:bg-brandingYellow duration-200"
						>
							{option1Text}
						</Link>
						<Link
							id="userProfileOption2Link"
							to={option2Link}
							className="px-4 py-2 hover:font-bold hover:bg-brandingYellow duration-200"
						>
							{option2Text}
						</Link>
						<Link
							id="userProfileOption3Link"
							to={option3Link}
							className="px-4 py-2 mb-2 hover:font-bold hover:bg-brandingYellow duration-200"
						>
							{option3Text}
						</Link>
					</div>

					<div id="userProfileDecorator2" className="border-b border-brandingLightBlue mx-2 mb-2"></div>

					<p
						id="userProfileLogoutButton"
						className="px-4 py-2 mb-2 text-[1.8rem] custom-2000:text-[2.5rem] cursor-pointer hover:font-bold hover:bg-brandingYellow duration-200"
						role="link"
						onClick={handleLogoutClick}
					>
						Cerrar Sesión
					</p>
				</nav>
			)}
		</div>
	);
}

export default UserProfile;
