import { useEffect, useRef } from "react";
import { checkOpenSession } from "../../interfaces/checkOpenSession";
import { UserRoleType } from "../../context/UserRoleContext";
import { Navigate, Outlet } from "react-router-dom";
import { getStoredToken } from "../../utils/getStoredToken";

type UserDataType = {
	userName: string,
	userRole: UserRoleType
}

function ProtectedRouteProducer() {
	const axiosController = useRef<AbortController>();

	async function checkAuthorization() {
		axiosController.current = new AbortController();
		const storedToken = getStoredToken();

		if (storedToken) {
			try {
				const userData: UserDataType = await checkOpenSession(storedToken, axiosController.current);
	
				if (userData.userRole === "PRODUCER" || userData.userRole === "ADMIN") {
					return <Outlet />;
				} else {
					return (
						<Navigate to="/login" replace />
					);
				}
	
			} catch {
				return (
					<Navigate to="/login" replace />
				);
			}
		} else {
			return (
				<Navigate to="/login" replace />
			);
		}
	}

	useEffect(() => {

		return () => {
			axiosController.current?.abort();
		};
	});

	return (
		<>
			{checkAuthorization()}
		</>
	);
}

export default ProtectedRouteProducer;