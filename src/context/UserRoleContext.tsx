import { createContext, useContext, useState } from "react";

export type UserRoleType = "visitor" | "USER" | "producer" | "admin"

type UserRoleDataType = {
	userRole: UserRoleType,
	setUserRole: React.Dispatch<React.SetStateAction<UserRoleType>>
}

const userRoleData: UserRoleDataType = {
	userRole: "visitor",
	setUserRole: () => { }
};


const UserRoleContext = createContext<UserRoleDataType>(userRoleData);

type UserRoleProviderProps = {
	children: React.ReactNode
}


export function UserRoleProvider({ children }: UserRoleProviderProps) {
	const [userRole, setUserRole] = useState<UserRoleType>("visitor");

	const userRoleData: UserRoleDataType = {
		userRole: userRole,
		setUserRole: setUserRole
	};

	return (
		<UserRoleContext.Provider value={userRoleData}>
			{children}
		</UserRoleContext.Provider>
	);
}


export function useUserRoleContext() {
	const context = useContext(UserRoleContext);

	if (!context) {
		throw new Error("useUserRoleContext must be used inside the ThemeProvider");
	}

	return context;
}