type PublicationStateModifiedProps = {
	newState: "approved" | "rejected" | "pending";
};

function PublicationStateModified({ newState }: PublicationStateModifiedProps) {
	return (
		<div
			className="z-[1000] fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen"
			id="psModifiedModalMainContainer"
		>
			<div
				id="psModifiedModalSecondaryContainer"
				className="flex items-center flex-col justify-between w-[300px] aspect-square pt-[4.646rem] pb-[9.2rem] px-[2.323rem] bg-white text-center text-black font-sans rounded-3xl
				custom-400:w-[400px] custom-1400:w-[500px] custom-2500:w-[600px]
				custom-600:aspect-[551/488]
				custom-1400:py-[6.4rem]
				custom-1400:px-[3.2rem]"
			>
				<div
					id="psModifiedModalImgContainer"
					className="w-[110px]
					custom-1400:w-[135px] custom-2500:w-[165px]"
				>
					{newState === "rejected" ? (
						<img id="psModifiedModalImgKo" src="/icons/modals/ko-with-border.png" />
					) : (
						<img id="psModifiedModalImgOk" src="/icons/modals/ok-with-border.png" />
					)}
				</div>

				<h3
					className="text-[3.5rem] font-regular pt-[4.646rem]
					custom-1400:pt-[6.4rem]
					custom-600:text-[4rem] custom-1400:text-[4.9rem] custom-2500:text-[5.5rem]"
				>
					¡Listo!
				</h3>

				{newState === "approved" && (
					<p
						className="text-[1.742rem] pt-[1.5rem]
						custom-1400:pt-[3.2rem]
						custom-600:text-[2rem] custom-1400:text-[2.4rem] custom-2500:text-[3rem]"
					>
						Publicación Aprobada
					</p>
				)}

				{newState === "rejected" && (
					<p
						className="text-[1.742rem] pt-[1rem]
					custom-600:text-[2rem] custom-1400:text-[2.4rem] custom-2500:text-[3rem]"
					>
						Publicación Rechazada
					</p>
				)}

				{newState === "pending" && (
					<p
						className="text-[1.742rem] pt-[1rem]
					custom-1400:text-[2.4rem]"
					>
						Publicación Pendiente
					</p>
				)}
			</div>
		</div>
	);
}

export default PublicationStateModified;
