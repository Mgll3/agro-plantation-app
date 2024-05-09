//Usada para borrar los datos de usuario del Local Storaga y el contexto cuando el servidor no lo autoriza o el usuario se desloga.
import { UserRoleType } from "../context/UserRoleContext";
import { user } from "../data/userData";
import { eraseStoredName } from "./eraseStoredName";
import { eraseStoredRole } from "./eraseStoredRole";
import { eraseStoredToken } from "./eraseStoredToken";

export function resetUserData (setUserRole: React.Dispatch<React.SetStateAction<UserRoleType>>) {
	eraseStoredToken();
	eraseStoredName();
	eraseStoredRole();
	user.name = "";
	setUserRole("visitor");
}