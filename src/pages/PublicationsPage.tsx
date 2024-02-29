import Header from "../components/header/Header";


function PublicationsPage() {
	const bgImageTailwind = "bg-headerBg";
	const logoSrc = "images/logo-plant-in.png";

	return (
		<>
			<div className="w-full" >
				<Header bgImageTailwind={bgImageTailwind} logoSrc={logoSrc} />
			</div>

			PUBLICATIONS!
		</>
	);
}

export default PublicationsPage;
