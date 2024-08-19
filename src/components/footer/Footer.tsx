import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer
			className="flex items-center w-full p-[1.095rem_1.3rem] font-sans text-[0.9rem] tracking-[0.15rem] bg-brandingLightGreen
			custom-800:py-[2rem] custom-1200:py-[3.5rem] custom-1400:py-[5rem]
			custom-1200:pl-[1.6rem] custom-2000:pl-[2.6rem]
			custom-900:pr-[5vw] custom-1300:pr-[2.6rem]
			custom-600:text-[1.2rem] custom-1000:text-[1.5rem] custom-1600:text-[2rem] custom-2500:text-[2.7rem] custom-3500:text-[3.7rem]
			custom-1300:font-montserrat
			custom-1300:tracking-[-0.05rem]"
		>
			<img
				alt=""
				src="/images/logos/Logo_beige.png"
				className="w-[12.717%] max-w-[17rem]
				custom-2000:max-w-[25rem]"
			/>

			<div
				className="flex flex-col justify-center items-center grow
				custom-1300:flex-row custom-1300:relative"
			>
				<div
					className="flex justify-center gap-[0.8rem] mb-[0.8rem] font-bold
					custom-600:gap-[2.5rem] custom-1000:gap-[8rem] custom-1600:gap-[10rem] custom-2000:gap-[12rem]
					custom-900:mb-[1.4rem] custom-1300:mb-[0rem]
					custom-1300:mr-[12vw] custom-1600:mr-[10vw] custom-2500:mr-[9vw]"
				>
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

				<div className="custom-1300:absolute custom-1300:right-0">
					<Link to="/copyright" reloadDocument className="relative opacity-80 hover:opacity-40">
						<span
							className="absolute left-[-1rem] text-[0.8rem]
					custom-600:text-[1rem] custom-1000:text-[1.3rem]"
						>
							©
						</span>
						<span>&nbsp;Plant-In 2024.</span>
						<span className="hidden custom-1300:inline">&nbsp;Todos los derechos reservados</span>
					</Link>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
