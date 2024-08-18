function SocialNetworks() {
	return (
		<>
			<div className="flex justify-center gap-8 w-full md:py-[2.5rem] pb-[1rem]">
				<a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center md:w-[100px] md:h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/Instagram.png" className="w-[70px] h-[70px] max-[767px]:w-[30px]  max-[767px]:h-[30px]" />
					</div>
				</a>

				<a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center md:w-[100px] md:h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/Facebook.png" className="w-[70px] h-[70px] max-[767px]:w-[30px]  max-[767px]:h-[30px]" />
					</div>
				</a>

				<a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center md:w-[100px] md:h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/LinkedIn.png" className="w-[70px] h-[70px] max-[767px]:w-[30px]  max-[767px]:h-[30px]" />
					</div>
				</a>

				<a href="https://twitter.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center md:w-[100px] md:h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300 ">
						<img alt="Instagram" src="icons/social_media/TwitterX.png" className="w-[70px] h-[70px] max-[767px]:w-[30px]  max-[767px]:h-[30px]" />
					</div>
				</a>
			</div>

			<p className="md:mt-[2.4rem] text-center md:text-grey700 md:text-[3.2rem] max-[767px]:text-[1.5rem] font-niramit md:font-normal font-bold">
				Encontranos en todas nuestras redes sociales
			</p>
		</>
	);
}

export default SocialNetworks;
