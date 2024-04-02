import { useEffect, useRef, useState } from "react";
import { checkOpenSession } from "../../interfaces/checkOpenSession";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { Outlet, useNavigate } from "react-router-dom";
import { UserDataType, isAuthorizedType } from "./ProtectedRoutesTypes";
import { user } from "../../data/userData";
import { CircularProgress } from "@mui/material";
import { getStoredToken } from "../../utils/getStoredToken";



function ProtectedRouteUser() {
	const { setUserRole } = useUserRoleContext();
	const [isAuthorized, setIsAuthorized] = useState<isAuthorizedType>("loading");

	const axiosController = useRef<AbortController>();
	const navigate = useNavigate();
	let navigateTimer: number = 0;


	useEffect(() => {
		axiosController.current = new AbortController();
		const storedToken = getStoredToken();

		if (storedToken) {
			checkOpenSession(storedToken, axiosController.current)
				.then((userData: UserDataType) => {
					user.name = `${userData.name} ${userData.lastname}`;
					setUserRole(userData.userType);
					setIsAuthorized("authorized");
				})
				.catch(() => {
					user.name = "";
					setUserRole("visitor");
					setIsAuthorized("notAuthorized");
				});
		} else {
			user.name = "";
			setUserRole("visitor");
			setIsAuthorized("notAuthorized");
		}

		return () => {
			axiosController.current?.abort();
		};
	}, []);

	useEffect( () => {
		if (isAuthorized === "notAuthorized") {
			navigateTimer = window.setTimeout(() => {
				navigate("/login", {replace: true});
			}, 500);
		}

		return () => {
			clearTimeout(navigateTimer);
		};
	});
	
	return (
		<>
			{
				isAuthorized === "loading" || isAuthorized === "notAuthorized"
					? <CircularProgress color="success" />
					: <Outlet />
			}
		</>
	);
}

export default ProtectedRouteUser;
