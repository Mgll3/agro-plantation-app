import AdminHomeBanner from "../../components/admin/AdminHomeBanner";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import SocialNetworks from "../../components/homeElements/SocialNetworks";

function AdminHome() {
	return (
		<div className="flex flex-col min-h-[100vh]">
			<div className="w-full">
				<Header />
			</div>

			<main
				className="mt-[2.4rem] mb-[1.6rem]
				custom-500:mt-[3.5rem] custom-700:mt-[5rem] custom-1000:mt-[8rem] custom-1200:mt-[10rem] custom-1400:mt-[12.4rem]
				custom-500:mb-[3.5rem] custom-700:mb-[5rem] custom-1000:mb-[8rem] custom-1200:mb-[10rem] custom-1400:mb-[12rem]"
			>
				<div
					className="mx-[5px]
					custom-400:mx-[18px] custom-500:mx-[30px] custom-700:mx-[80px] custom-1000:mx-[100px] custom-1400:mx-[120px] custom-1900:mx-[15vw] custom-3000:mx-[17vw]"
				>
					<AdminHomeBanner />
				</div>
				<div
					className="w-full px-[10px] mt-[3.2rem]
						custom-600:mt-[6rem] custom-1000:mt-[8rem] custom-1400:mt-[10.5rem] custom-1900:mt-[15rem] custom-2500:mt-[22rem] custom-3000:mt-[27rem]"
				>
					<SocialNetworks />
				</div>
			</main>

			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
}

export default AdminHome;
