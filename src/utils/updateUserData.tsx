//Utilizada para actualizar todos los datos en los estados y en el Local Storage (Incluído el Token) cuando se recibe la información del usuario del servidor.
import { UserRoleType } from "../context/UserRoleContext";
import { user } from "../data/userData";
import { UserDataType } from "../pages/commonTypes";
import { storeName } from "./storeName";
import { storeRole } from "./storeRole";
import { storeToken } from "./storeToken";

export function updateUserData(userData: UserDataType, setUserRole: React.Dispatch<React.SetStateAction<UserRoleType>>) {
	if (userData.accessToken) {
		storeToken(userData.accessToken);
	}
	storeRole(userData.userType);
	storeName(`${userData.name} ${userData.lastname}`);
	user.name = `${userData.name} ${userData.lastname}`;
	setUserRole(userData.userType);
}