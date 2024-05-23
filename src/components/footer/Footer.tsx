import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="flex justify-between items-center w-full h-[284px] py-[50px] px-2 bg-brandingLightGreen">
			<img alt=""
				src="/images/logos/Logo_beige.png"
				className="w-[170px]"	
			/>

			<div className="flex justify-center gap-x-10 text-[12px] font-bold">
				<Link 
					to="/helpDesk"
					reloadDocument
					className="hover:opacity-60 hover:scale-110 duration-200"
				>
					Help Desk
				</Link>

				<Link 
					to="/community"
					reloadDocument
					className="hover:opacity-60 hover:scale-110 duration-200"
				>
					Community
				</Link>

				<Link 
					to="/company"
					reloadDocument
					className="hover:opacity-60 hover:scale-110 duration-200"
				>
					Company
				</Link>
			</div>

			<Link 
				to="/copyright"
				reloadDocument
				className=" font-montserrat text-[12px] hover:opacity-60"
			>
				Todos los derechos reservados para Plant-In © 2024
			</Link>
		</footer>
	);
}

export default Footer;
