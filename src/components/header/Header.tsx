import { useUserRoleContext } from "../../context/UserRoleContext";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import UserProfile from "./UserProfile";

type HeaderProps = {
	bgImageTailwind: string,
	logoSrc: string
}

function Header({ bgImageTailwind, logoSrc }: HeaderProps) {

	const { userRole } = useUserRoleContext();



	return (
		<>
			<header className="overflow-hidden w-full">
				<div className={`${bgImageTailwind} bg-cover relative flex justify-center items-center py-5`}>
					<img src={logoSrc} alt="" className="w-1/5" />
					<div className="absolute right-4 top-2">

						{
							userRole === "visitor"
								? <SecondaryNav />
								: <UserProfile />
						}


					</div>
				</div>

				<div className="flex justify-center bg-brandingLightGreen py-4">
					<MainNav />
				</div>
			</header>
		</>
	);
}

export default Header;
