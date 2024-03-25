import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../header/Header";
import MustLoginWarning from "../header/MustLoginWarning";
import { getStoredToken } from "../../utils/getStoredToken";
import { checkOpenSession } from "../../interfaces/checkOpenSession";
import { UserDataType } from "../../pages/commonTypes";
import { storeName } from "../../utils/storeName";
import { user } from "../../data/userData";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { getStoredName } from "../../utils/getStoredName";

type MustLoginWarningStateType = "visible" | "hidden";

function HelpDesk() {
	const bgImageTailwind = "bg-headerBg";
	const logoSrc = "images/Logo_fondo_verde.png";

	const [mustLoginWarningState, setMustLoginWarningState] = useState<MustLoginWarningStateType>("hidden");
	const { setUserRole } = useUserRoleContext();
	const axiosController = useRef<AbortController>();


	function handleOpenMustLoginWarning() {
		setMustLoginWarningState("visible");
	}

	function handleCloseMustLoginWarning() {
		setMustLoginWarningState("hidden");
	}


	useLayoutEffect( () => {
		const userName = getStoredName();
		const token = getStoredToken();

		if (userName) {
			user.name = userName;
		}

		if (token) {
			setUserRole("USER");
		}
	});


	useEffect(() => {
		axiosController.current = new AbortController();

		const storedToken = getStoredToken();

		if (storedToken) {
			checkOpenSession(storedToken, axiosController.current)
				.then((userData: UserDataType) => {
					storeName(`${userData.name} ${userData.lastname}`);
					user.name = `${userData.name} ${userData.lastname}`;
					setUserRole(userData.userType);
				})
				.catch(() => {
					user.name = "";
					setUserRole("visitor");
				});
		}


		return () => {
			axiosController.current?.abort();
		};
	}, []);



	return (
		<>
			<div className="w-full" >
				<Header bgImageTailwind={bgImageTailwind} logoSrc={logoSrc} handleOpenMustLoginWarning={handleOpenMustLoginWarning} />
			</div>

			{
				mustLoginWarningState === "visible"
				&& <MustLoginWarning handleCloseMustLoginWarning={handleCloseMustLoginWarning} />
			}

			<main className="py-12 px-[10vw]">
				<h1 className="text-4xl text-center pb-10">Help Desk</h1>

				<div className="bg-brandingLightYellow py-12 px-12 leading-loose border-2 border-black border-solid text-[20px]">
					<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente error repellendus, quas consequuntur minus, id vitae possimus maiores, soluta suscipit cum velit quam beatae quibusdam adipisci quasi ullam! Error, quae!</p>
					<p>Nullam fermentum faucibus elit aliquet aliquam. Integer consequat risus arcu, ac scelerisque lacus ultrices ultrices. Pellentesque semper risus sed leo suscipit, vel varius lectus dapibus. Vivamus scelerisque, orci in aliquam convallis, felis velit volutpat dolor, sit amet convallis tortor sapien nec erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris bibendum condimentum viverra. Vivamus commodo cursus erat, et fringilla nunc. Donec a condimentum leo, vitae sodales leo. Nunc non laoreet urna, et ullamcorper nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed nisi nec nunc rhoncus ullamcorper. Donec eget libero a quam hendrerit ultrices. Vivamus a est facilisis, ultrices augue in, vehicula dolor. Pellentesque semper metus non tortor vestibulum, non iaculis arcu iaculis. Cras posuere quis neque non interdum.</p>
					<p>Pellentesque nunc ante, efficitur nec tempus sit amet, vehicula nec mauris. Curabitur vulputate leo vulputate suscipit convallis. Curabitur felis est, porta nec mollis at, luctus in dui. Sed massa elit, auctor vel gravida quis, vestibulum et odio. Donec dignissim porttitor ex ac maximus. Cras diam neque, volutpat ut dolor ut, efficitur venenatis erat. Duis eu pharetra enim. Pellentesque porttitor odio lorem, tincidunt iaculis enim pulvinar sed. Suspendisse efficitur eget risus a sollicitudin. Mauris eu maximus ipsum.</p>
					<p>Quisque fermentum ligula eget nulla feugiat pulvinar. Fusce in purus diam. Nam posuere enim eu justo porta venenatis. Curabitur sit amet est placerat, auctor enim ut, commodo est. Suspendisse non ipsum eu purus euismod bibendum nec in dui. Fusce sit amet elit vel elit pellentesque finibus. Ut id nisi non velit bibendum consectetur. Pellentesque quis purus suscipit, mattis lacus ut, tincidunt ipsum. Integer in ante urna. Suspendisse leo ligula, volutpat at libero feugiat, congue luctus odio.</p>
				</div>
			</main>
		</>
	);
}

export default HelpDesk;
