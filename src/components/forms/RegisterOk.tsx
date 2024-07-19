function RegisterOk() {
	return (
		<div className="z-50 absolute flex justify-center items-center w-screen bg-screenDarkening h-screen">
			<div className="flex items-center flex-col w-[551px] h-[488px] p-[64px_32px] bg-white rounded-2xl text-black text-center font-sans">
				<img src="/icons/modals/ok-with-border.png" alt="" className="w-[149px]" />
				<h3 className="mt-[64px] font-sans text-[49px]">¡Listo!</h3>
				<p className="mt-[32px] text-[24px]">Tu registro se completo con éxito</p>
			</div>
		</div>
	);
}

export default RegisterOk;
