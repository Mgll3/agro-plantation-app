type PublicationStateModifiedProps = {
	newState: "approved" | "rejected" | "pending";
};

function PublicationStateModified({ newState }: PublicationStateModifiedProps) {
	return (
		<div className="z-50 fixed top-0 left-0 flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col justify-between w-[500px] py-[4rem] px-[2rem] bg-white text-center text-black font-sans rounded-xl">
				<div className="w-[160px]">
					{newState === "rejected" ? (
						<img src="/icons/modals/ko-with-border.png" />
					) : (
						<img src="/icons/modals/ok-with-border.png" />
					)}
				</div>

				<h3 className="text-[49px] font-regular pt-[3rem]">¡Listo!</h3>

				{newState === "approved" && <p className="text-[24px] pt-[1rem]">Publicación Aprobada</p>}

				{newState === "rejected" && <p className="text-[24px] pt-[1rem]">Publicación Rechazada</p>}

				{newState === "pending" && <p className="text-[24px] pt-[1rem]">Publicación Pendiente</p>}
			</div>
		</div>
	);
}

export default PublicationStateModified;
