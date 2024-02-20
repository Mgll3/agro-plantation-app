import { user } from "../../data/userData";

function UserProfile() {

	function showHideProfileOptions() {

	}

	return (
		<nav aria-label="Mi perfil" className="">
			<p role="button" onClick={showHideProfileOptions}>
				{user.name}
			</p>
		</nav>
	);
}

export default UserProfile;
