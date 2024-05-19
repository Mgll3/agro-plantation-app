import { UserRoleType } from "../context/UserRoleContext";

export function storeRole (role: UserRoleType) {
	localStorage.setItem("userRole", role);
}