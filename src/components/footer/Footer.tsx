import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="flex justify-center items-center w-full py-[5rem] px-[1.6rem] bg-brandingLightGreen">
			<img alt="" src="/images/logos/Logo_beige.png" className="w-[17rem]" />

			<div className="flex justify-center gap-x-[10rem] w-full pl-[13%] text-[1.5rem] font-bold">
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

			<Link to="/copyright" reloadDocument className="w-[40%] font-montserrat text-[1.5rem] hover:opacity-60">
				Todos los derechos reservados para Plant-In © 2024
			</Link>
		</footer>
	);
}

export default Footer;
