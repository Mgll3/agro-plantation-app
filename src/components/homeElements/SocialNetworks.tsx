function SocialNetworks() {
	return (
		<>
			<div className="flex justify-center gap-6 w-full py-[2.5rem]">
				<a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/Instagram.png" className="w-[70px] h-[70px]" />
					</div>
				</a>

				<a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/Facebook.png" className="w-[70px] h-[70px]" />
					</div>
				</a>

				<a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/LinkedIn.png" className="w-[70px] h-[70px]" />
					</div>
				</a>

				<a href="https://twitter.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] border-black rounded-[50%] hover:opacity-80 hover:scale-125 duration-300">
						<img alt="Instagram" src="icons/social_media/TwitterX.png" className="w-[70px] h-[70px]" />
					</div>
				</a>
			</div>

			<p className="mt-[2.4rem] text-center text-grey700 text-[3.2rem] font-niramit font-normal">
				Encontranos en todas nuestras redes sociales
			</p>
		</>
	);
}

export default SocialNetworks;
