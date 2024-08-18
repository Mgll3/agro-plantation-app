import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="relative flex flex-col items-center w-full h-[8rem] pt-[2rem] md:h-[13.5rem] bg-brandingLightGreen
		md:flex-row md:py-[5rem] md:px-[1.6rem] ">
			<img alt="" src="/images/logos/Logo_beige.png" className="absolute md:w-[12rem] w-[5rem] left-5 
			" />

			<div className="flex justify-center font-bold gap-4 text-[1.2rem] w-full pl-[12%]
			md:gap-x-[1rem] md:text-[1.5rem]">
				{/**<h1 className="hidden md:block md:pr-8 font-loginFont">
					PLANT - IN
					</h1>	 */}
				<Link to="/helpDesk" reloadDocument className="hover:opacity-60 hover:scale-110 duration-200">
					Help Desk
				</Link>

				<Link to="/community" reloadDocument className="hover:opacity-60 hover:scale-110 duration-200">
					Community
				</Link>

				<Link to="/company" reloadDocument className="hover:opacity-60 hover:scale-110 duration-200">
					Company
				</Link>
			</div>

			<Link to="/copyright" reloadDocument className="w-[40%] font-montserrat text-[.8rem]
			md:text-[1.5rem] hover:opacity-60 max-[767px]:text-center">
				Todos los derechos reservados para Plant-In © 2024
			</Link>
		</footer>
	);
}

export default Footer;
