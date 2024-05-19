import { useEffect, useRef, useState } from "react";
import { checkOpenSession } from "../../interfaces/checkOpenSession";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { Outlet, useNavigate } from "react-router-dom";
import { UserDataType, isAuthorizedType } from "./ProtectedRoutesTypes";
import { CircularProgress } from "@mui/material";
import { getStoredToken } from "../../utils/getStoredToken";
import { updateUserData } from "../../utils/updateUserData";
import { resetUserData } from "../../utils/resetUserData";


function ProtectedRouteProducer() {
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
					if (userData.userType === "PRODUCER" || userData.userType === "PRODUCER_VIP") {
						updateUserData(userData, setUserRole);
						setIsAuthorized("authorized");
					} else {
						setIsAuthorized("notAuthorized");
					}
				})
				.catch(() => {
					resetUserData(setUserRole);
					setIsAuthorized("notAuthorized");
				});
		} else {
			resetUserData(setUserRole);
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
			}, 1500);
		}

		return () => {
			clearTimeout(navigateTimer);
		};
	}, [isAuthorized]);


	
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

export default ProtectedRouteProducer;