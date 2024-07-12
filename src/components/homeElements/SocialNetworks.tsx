
function SocialNetworks() {
	return (
		<>
			<div className="flex justify-center gap-6 w-full">
				<a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] bg-brandingLightYellow border-solid border-2 border-black rounded-[50%] hover:opacity-60 duration-200">
						<img alt="Instagram"
							src="icons/social_media/Instagram.png"
							className="w-[70px] h-[70px]"
						/>
					</div>
				</a>

				<a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] bg-brandingLightYellow border-solid border-2 border-black rounded-[50%] hover:opacity-60 duration-200">
						<img alt="Instagram"
							src="icons/social_media/Facebook.png"
							className="w-[70px] h-[70px]"
						/>
					</div>
				</a>

				<a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] bg-brandingLightYellow border-solid border-2 border-black rounded-[50%] hover:opacity-60 duration-200">
						<img alt="Instagram"
							src="icons/social_media/LinkedIn.png"
							className="w-[70px] h-[70px]"
						/>
					</div>
				</a>

				<a href="https://twitter.com/" rel="noreferrer" target="_blank">
					<div className="flex justify-center items-center w-[100px] h-[100px] bg-brandingLightYellow border-solid border-2 border-black rounded-[50%] hover:opacity-60 duration-200">
						<img alt="Instagram"
							src="icons/social_media/TwitterX.png"
							className="w-[70px] h-[70px]"
						/>
					</div>
				</a>
			</div>

			<p className="text-center mt-12 text-semiTansparentBlack text-2xl">
				Encontranos en todas nuestras redes sociales
			</p>
		</>
	);
}

export default SocialNetworks;