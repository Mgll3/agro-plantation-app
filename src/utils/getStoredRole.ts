import { UserRoleType } from "../context/UserRoleContext";

export function getStoredRole () {
	const userRole = localStorage.getItem("userRole");
	
	if (userRole) {
		return userRole as UserRoleType;
	} else {
		return null;
	}
}