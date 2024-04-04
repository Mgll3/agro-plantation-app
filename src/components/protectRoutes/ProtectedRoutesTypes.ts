import { UserRoleType } from "../../context/UserRoleContext";

export type UserDataType = {
	accessToken: string,
	name: string,
	lastname: string,
	userType: UserRoleType
}

export type isAuthorizedType = "loading" | "authorized" | "notAuthorized";