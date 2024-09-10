import { useEffect, useLayoutEffect, useRef } from "react";
import Header from "../header/Header";
import { getStoredToken } from "../../utils/getStoredToken";
import { checkOpenSession } from "../../interfaces/users/checkOpenSession";
import { UserDataType } from "../../pages/commonTypes";
import { storeName } from "../../utils/storeName";
import { user } from "../../data/userData";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { getStoredName } from "../../utils/getStoredName";

function HelpDesk() {
	const { setUserRole } = useUserRoleContext();
	const axiosController = useRef<AbortController>();

	useLayoutEffect(() => {
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
			<div className="w-full">
				<Header />
			</div>

			<main
				className="py-[6vh] px-[2vw]
				custom-700:py-[4vh] custom-1200:py-[6vh]
				custom-600:px-[5vw] custom-900:px-[8vw] custom-1400:px-[10vw]"
			>
				<h1
					className="font-bold text-[3rem] text-center pb-10
					custom-700:text-[3.5rem] custom-900:text-[4rem]"
				>
					Help Desk
				</h1>

				<div
					className="bg-brandingLightYellow py-12 px-12 leading-loose border-2 border-black border-solid text-[2rem]
					custom-700:text-[2.5rem]"
				>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente error repellendus, quas consequuntur
						minus, id vitae possimus maiores, soluta suscipit cum velit quam beatae quibusdam adipisci quasi ullam!
						Error, quae!
					</p>
					<p>
						Nullam fermentum faucibus elit aliquet aliquam. Integer consequat risus arcu, ac scelerisque lacus ultrices
						ultrices. Pellentesque semper risus sed leo suscipit, vel varius lectus dapibus. Vivamus scelerisque, orci
						in aliquam convallis, felis velit volutpat dolor, sit amet convallis tortor sapien nec erat. Pellentesque
						habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris bibendum condimentum
						viverra. Vivamus commodo cursus erat, et fringilla nunc. Donec a condimentum leo, vitae sodales leo. Nunc
						non laoreet urna, et ullamcorper nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
						nisi nec nunc rhoncus ullamcorper. Donec eget libero a quam hendrerit ultrices. Vivamus a est facilisis,
						ultrices augue in, vehicula dolor. Pellentesque semper metus non tortor vestibulum, non iaculis arcu
						iaculis. Cras posuere quis neque non interdum.
					</p>
					<p>
						Pellentesque nunc ante, efficitur nec tempus sit amet, vehicula nec mauris. Curabitur vulputate leo
						vulputate suscipit convallis. Curabitur felis est, porta nec mollis at, luctus in dui. Sed massa elit,
						auctor vel gravida quis, vestibulum et odio. Donec dignissim porttitor ex ac maximus. Cras diam neque,
						volutpat ut dolor ut, efficitur venenatis erat. Duis eu pharetra enim. Pellentesque porttitor odio lorem,
						tincidunt iaculis enim pulvinar sed. Suspendisse efficitur eget risus a sollicitudin. Mauris eu maximus
						ipsum.
					</p>
					<p>
						Quisque fermentum ligula eget nulla feugiat pulvinar. Fusce in purus diam. Nam posuere enim eu justo porta
						venenatis. Curabitur sit amet est placerat, auctor enim ut, commodo est. Suspendisse non ipsum eu purus
						euismod bibendum nec in dui. Fusce sit amet elit vel elit pellentesque finibus. Ut id nisi non velit
						bibendum consectetur. Pellentesque quis purus suscipit, mattis lacus ut, tincidunt ipsum. Integer in ante
						urna. Suspendisse leo ligula, volutpat at libero feugiat, congue luctus odio.
					</p>
				</div>
			</main>
		</>
	);
}

export default HelpDesk;
