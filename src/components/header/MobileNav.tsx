import { Link } from "react-router-dom";
import { useUserRoleContext } from "../../context/UserRoleContext";
import { useEffect, useRef } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

type MobileNavProps = {
	toggleMobileMenuVisibility: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	handleLogoutClickMobile: (e: React.MouseEvent<HTMLDivElement>) => void;
	mobileNavStyles: "mounting" | "unmounting";
	handleOpenMustLoginWarning: () => void;
};

function MobileNav({
	toggleMobileMenuVisibility,
	handleLogoutClickMobile,
	mobileNavStyles,
	handleOpenMustLoginWarning
}: MobileNavProps) {
	const { userRole } = useUserRoleContext();
	const mainDivElement = useRef<HTMLDivElement>(null);
	const contentDivElement = useRef<HTMLDivElement>(null);

	let publicationsRoute = "/user/publications";
	let forumRoute = "/user/forum";

	if (userRole === "PRODUCER" || userRole === "PRODUCER_VIP") {
		publicationsRoute = "/producer/publications";
		forumRoute = "/producer/forum";
	} else if (userRole === "ADMIN") {
		publicationsRoute = "/admin/publications";
		forumRoute = "/admin/forum";
	}

	const mobileNavStylesTiemout = useRef<number>(0);

	useEffect(() => {
		if (mobileNavStyles === "mounting") {
			mobileNavStylesTiemout.current = window.setTimeout(() => {
				mainDivElement.current?.classList.replace("bg-transparent", "bg-screenDarkening");
				contentDivElement.current?.classList.replace("left-[-20.6rem]", "left-0");
			}, 0);
		} else {
			mainDivElement.current?.classList.replace("bg-screenDarkening", "bg-transparent");
			contentDivElement.current?.classList.replace("left-0", "left-[-20.6rem]");
		}

		return () => {
			clearTimeout(mobileNavStylesTiemout.current);
		};
	});

	return (
		<div
			ref={mainDivElement}
			onClick={toggleMobileMenuVisibility}
			className={`z-[900] fixed top-0 left-0 w-screen h-screen transition-all duration-700 ${mobileNavStyles === "mounting" ? "bg-transparent" : "bg-screenDarkening"} `}
		>
			<div
				ref={contentDivElement}
				className={`z-50 absolute top-0 ${mobileNavStyles === "mounting" ? "left-[-20.6rem]" : "left-0"} flex flex-col items-start w-[21rem] p-[1.6rem_0.8rem] rounded-tr-3xl rounded-br-3xl bg-terciary150 duration-700`}
			>
				<div className="flex justify-center w-full">
					<img src="/images/logos/LogoVerde.png" alt="" className="w-[6.624rem]" />
				</div>

				<hr className="w-[100%] my-[1.6rem] border-brandingDarkGreen" />

				<div className="flex justify-start items-center w-full mb-[1.6rem] px-[0.4rem] py-[0.8rem] text-brandingDarkGreen hover:text-yellow500 hover:bg-brandingDarkGreen cursor-pointer">
					{userRole === "ADMIN" ? (
						<>
							<div className="w-[24px] text-[24px]">
								<SupervisorAccountIcon color="inherit" fontSize="inherit" />
							</div>
							<Link to="/admin/users" className="ml-[0.8rem] text-[2rem]">
								Usuarios
							</Link>
						</>
					) : (
						<>
							<svg className="fill-current w-[24px]" viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M19.5 7.19094V1.25H15.75V3.98984L12 0.5L0 11.75H3V21.5H9.75V14H14.25V21.5H21V11.75H24L19.5 7.19094Z"
									fill="currentColor"
								/>
							</svg>
							<Link to="/" className="ml-[0.8rem] text-[2rem]">
								Home
							</Link>
						</>
					)}
				</div>

				<div className="flex justify-start items-center w-full mb-[1.6rem] px-[0.4rem] py-[0.8rem] text-brandingDarkGreen hover:text-yellow500 hover:bg-brandingDarkGreen cursor-pointer">
					<svg className="fill-current w-[24px]" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 0H16V1.5H4V0ZM2.5 2.25H17.5V3.75H2.5V2.25ZM19.75 18H0.25V4.5H19.75V18Z" fill="currentColor" />
					</svg>
					{userRole === "visitor" ? (
						<p onClick={handleOpenMustLoginWarning} className="ml-[0.8rem] text-[2rem]">
							Publicaciones
						</p>
					) : (
						<Link to={publicationsRoute} className="ml-[0.8rem] text-[2rem]">
							Publicaciones
						</Link>
					)}
				</div>

				<div className="flex justify-start items-center w-full mb-[1.6rem] px-[0.4rem] py-[0.8rem] text-brandingDarkGreen hover:text-yellow500 hover:bg-brandingDarkGreen cursor-pointer">
					<svg className="fill-current w-[24px]" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M18.125 0.25H3.875C2.9802 0.250993 2.12233 0.606891 1.48961 1.23961C0.856891 1.87233 0.500993 2.7302 0.5 3.625V12.625C0.500993 13.5198 0.856891 14.3777 1.48961 15.0104C2.12233 15.6431 2.9802 15.999 3.875 16H5V19C4.99996 19.1426 5.04058 19.2823 5.11709 19.4026C5.1936 19.5229 5.30284 19.619 5.43199 19.6794C5.56114 19.7399 5.70485 19.7623 5.84627 19.744C5.9877 19.7257 6.12097 19.6674 6.23047 19.5761L10.5191 16H18.125C19.0198 15.999 19.8777 15.6431 20.5104 15.0104C21.1431 14.3777 21.499 13.5198 21.5 12.625V3.625C21.499 2.7302 21.1431 1.87233 20.5104 1.23961C19.8777 0.606891 19.0198 0.250993 18.125 0.25ZM6.5 9.625C6.20333 9.625 5.91332 9.53703 5.66665 9.3722C5.41997 9.20738 5.22771 8.97311 5.11418 8.69902C5.00065 8.42494 4.97094 8.12334 5.02882 7.83236C5.0867 7.54139 5.22956 7.27412 5.43934 7.06434C5.64912 6.85456 5.91639 6.7117 6.20736 6.65382C6.49834 6.59594 6.79994 6.62565 7.07403 6.73918C7.34811 6.85271 7.58238 7.04497 7.7472 7.29164C7.91203 7.53832 8 7.82833 8 8.125C8 8.52282 7.84196 8.90436 7.56066 9.18566C7.27936 9.46696 6.89782 9.625 6.5 9.625ZM11 9.625C10.7033 9.625 10.4133 9.53703 10.1666 9.3722C9.91997 9.20738 9.72771 8.97311 9.61418 8.69902C9.50065 8.42494 9.47094 8.12334 9.52882 7.83236C9.5867 7.54139 9.72956 7.27412 9.93934 7.06434C10.1491 6.85456 10.4164 6.7117 10.7074 6.65382C10.9983 6.59594 11.2999 6.62565 11.574 6.73918C11.8481 6.85271 12.0824 7.04497 12.2472 7.29164C12.412 7.53832 12.5 7.82833 12.5 8.125C12.5 8.52282 12.342 8.90436 12.0607 9.18566C11.7794 9.46696 11.3978 9.625 11 9.625ZM15.5 9.625C15.2033 9.625 14.9133 9.53703 14.6666 9.3722C14.42 9.20738 14.2277 8.97311 14.1142 8.69902C14.0006 8.42494 13.9709 8.12334 14.0288 7.83236C14.0867 7.54139 14.2296 7.27412 14.4393 7.06434C14.6491 6.85456 14.9164 6.7117 15.2074 6.65382C15.4983 6.59594 15.7999 6.62565 16.074 6.73918C16.3481 6.85271 16.5824 7.04497 16.7472 7.29164C16.912 7.53832 17 7.82833 17 8.125C17 8.52282 16.842 8.90436 16.5607 9.18566C16.2794 9.46696 15.8978 9.625 15.5 9.625Z"
							fill="currentColor"
						/>
					</svg>
					{userRole === "visitor" ? (
						<p onClick={handleOpenMustLoginWarning} className="ml-[0.8rem] text-[2rem]">
							Foro
						</p>
					) : (
						<Link to={forumRoute} className="ml-[0.8rem] text-[2rem]">
							Foro
						</Link>
					)}
				</div>

				<hr className="w-[100%] my-[1.6rem] border-brandingDarkGreen" />

				<div className="flex justify-start items-center w-full mb-[1.6rem] px-[0.4rem] py-[0.8rem] text-brandingDarkGreen hover:text-yellow500 hover:bg-brandingDarkGreen cursor-pointer">
					<svg className="fill-current w-[24px]" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.5 3.375V8.25H13.6892L11.2198 5.78016C11.0851 5.63836 11.0111 5.44955 11.0136 5.25398C11.0161 5.0584 11.0949 4.87155 11.2332 4.73325C11.3715 4.59495 11.5584 4.51614 11.754 4.51364C11.9495 4.51114 12.1384 4.58513 12.2802 4.71984L16.0302 8.46984C16.1707 8.61048 16.2497 8.80117 16.2497 9C16.2497 9.19883 16.1707 9.38952 16.0302 9.53016L12.2802 13.2802C12.1384 13.4149 11.9495 13.4889 11.754 13.4864C11.5584 13.4839 11.3715 13.4051 11.2332 13.2668C11.0949 13.1285 11.0161 12.9416 11.0136 12.746C11.0111 12.5505 11.0851 12.3616 11.2198 12.2198L13.6892 9.75H6.5V14.625C6.50074 15.321 6.77754 15.9882 7.26967 16.4803C7.76179 16.9725 8.42904 17.2493 9.125 17.25H18.875C19.571 17.2493 20.2382 16.9725 20.7303 16.4803C21.2225 15.9882 21.4993 15.321 21.5 14.625V3.375C21.4993 2.67904 21.2225 2.01179 20.7303 1.51967C20.2382 1.02755 19.571 0.750744 18.875 0.75H9.125C8.42904 0.750744 7.76179 1.02755 7.26967 1.51967C6.77754 2.01179 6.50074 2.67904 6.5 3.375ZM1.25 8.25C1.05109 8.25 0.860322 8.32902 0.71967 8.46967C0.579018 8.61032 0.5 8.80109 0.5 9C0.5 9.19891 0.579018 9.38968 0.71967 9.53033C0.860322 9.67098 1.05109 9.75 1.25 9.75H6.5V8.25H1.25Z"
							fill="currentColor"
						/>
					</svg>

					<Link to="/login" className="ml-[0.8rem] text-[2rem]">
						Ingresa
					</Link>
				</div>

				<div className="flex justify-start items-center w-full mb-[1.6rem] px-[0.4rem] py-[0.8rem] text-brandingDarkGreen hover:text-yellow500 hover:bg-brandingDarkGreen cursor-pointer">
					<svg className="fill-current w-[24px]" viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M13.5925 2.02719C12.6803 1.04234 11.4063 0.5 10 0.5C8.58627 0.5 7.30799 1.03906 6.40002 2.01781C5.48221 3.00734 5.03502 4.35219 5.14002 5.80437C5.34815 8.66937 7.52831 11 10 11C12.4717 11 14.6481 8.66984 14.8596 5.80531C14.966 4.36625 14.516 3.02422 13.5925 2.02719ZM18.25 21.5H1.75002C1.53405 21.5028 1.32017 21.4574 1.12394 21.3672C0.927715 21.2769 0.754072 21.1441 0.615649 20.9783C0.310961 20.6141 0.188149 20.1167 0.279086 19.6137C0.674711 17.4191 1.9094 15.5755 3.85002 14.2812C5.57409 13.1323 7.75799 12.5 10 12.5C12.2421 12.5 14.426 13.1328 16.15 14.2812C18.0906 15.575 19.3253 17.4186 19.721 19.6133C19.8119 20.1162 19.6891 20.6136 19.3844 20.9778C19.246 21.1437 19.0724 21.2766 18.8762 21.367C18.6799 21.4573 18.466 21.5028 18.25 21.5Z"
							fill="currentColor"
						/>
					</svg>

					<Link to="/register" className="ml-[0.8rem] text-[2rem]">
						Regístrate
					</Link>
				</div>

				<hr className="w-[100%] my-[1.6rem] border-brandingDarkGreen" />

				<div
					onClick={handleLogoutClickMobile}
					className="flex justify-start items-center w-full mb-[1.6rem] px-[0.4rem] py-[0.8rem] text-brandingDarkGreen hover:text-yellow500 hover:bg-brandingDarkGreen cursor-pointer"
				>
					<svg className="fill-current w-[24px]" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.75 14.625V9.75H7.95312C7.75421 9.75 7.56345 9.67098 7.4228 9.53033C7.28214 9.38968 7.20312 9.19891 7.20312 9C7.20312 8.80109 7.28214 8.61032 7.4228 8.46967C7.56345 8.32902 7.75421 8.25 7.95312 8.25H14.75V3.375C14.7493 2.67904 14.4725 2.01179 13.9803 1.51967C13.4882 1.02755 12.821 0.750744 12.125 0.75H3.125C2.42904 0.750744 1.76179 1.02755 1.26967 1.51967C0.777545 2.01179 0.500744 2.67904 0.5 3.375V14.625C0.500744 15.321 0.777545 15.9882 1.26967 16.4803C1.76179 16.9725 2.42904 17.2493 3.125 17.25H12.125C12.821 17.2493 13.4882 16.9725 13.9803 16.4803C14.4725 15.9882 14.7493 15.321 14.75 14.625ZM18.9392 9.75L16.4698 12.2198C16.3351 12.3616 16.2611 12.5505 16.2636 12.746C16.2661 12.9416 16.3449 13.1285 16.4832 13.2668C16.6215 13.4051 16.8084 13.4839 17.004 13.4864C17.1995 13.4889 17.3884 13.4149 17.5302 13.2802L21.2802 9.53016C21.4207 9.38952 21.4997 9.19883 21.4997 9C21.4997 8.80117 21.4207 8.61048 21.2802 8.46984L17.5302 4.71984C17.3884 4.58513 17.1995 4.51114 17.004 4.51364C16.8084 4.51614 16.6215 4.59495 16.4832 4.73325C16.3449 4.87155 16.2661 5.0584 16.2636 5.25398C16.2611 5.44955 16.3351 5.63836 16.4698 5.78016L18.9392 8.25H14.75V9.75H18.9392Z"
							fill="currentColor"
						/>
					</svg>

					<p className="ml-[0.8rem] text-[2rem]">Cerrar sesión</p>
				</div>
			</div>
		</div>
	);
}

export default MobileNav;
