import { Link, useParams } from "react-router-dom";
import { PublicationInfoType } from "../../admin/adminTypes";
import { useUserRoleContext } from "../../../context/UserRoleContext";

type PublicationCardProps = {
	publicationInfo: PublicationInfoType;
	filter: string;
};

function PublicationCard({ publicationInfo, filter }: PublicationCardProps) {
	//Se usa para modificar la ruta de los enlaces dependiendo del tipo de usuario que pulsa.
	const { userRole } = useUserRoleContext();
	let subRoute = "";
	if (userRole === "ADMIN") {
		subRoute = "admin";
	} else if (userRole === "USER") {
		subRoute = "user";
	} else {
		subRoute = "producer";
	}
	const params = useParams();
	const pagination = params.id;

	//Este objeto contiene la información del filtro y nº de página actual, para que al volver desde AdminPublicationDetails se vuelvan a aplicar.
	const actualPageInfo = {
		filter,
		pagination
	};

	let stateColor: string;

	if (publicationInfo.authorizationStatus.state === "ACCEPTED") {
		stateColor = "bg-brandingDarkGreen";
	} else if (publicationInfo.authorizationStatus.state === "DECLINED") {
		stateColor = "bg-brightRed";
	} else {
		stateColor = "bg-brandingYellow";
	}

	return (
		<Link to={`/${subRoute}/publications/details/${publicationInfo.id}`} state={actualPageInfo} className="h-[100%]">
			<div
				className="w-[100%] h-[100%] p-[6.38%] rounded-2xl text-sans bg-brandingLightYellow
				custom-2500:rounded-3xl"
			>
				<div className="flex justify-center items-center overflow-hidden w-[100%] h-[67.27%] bg-publicationCardsBg bg-contain rounded-lg border-[2px] border-brandingDarkGreen border-solid">
					<img alt="Imagen principal" src={publicationInfo.mainImage?.url} className="object-cover" />
				</div>

				<div className="flex flex-col justify-between w-[100%] h-[34.2%]">
					{publicationInfo.title.length > 20 ? (
						<h3
							className="mt-[9.27px] text-center font-semibold text-[8px]
							custom-400:text-[10.2px] custom-500:text-[14px] custom-700:text-[16.4px] custom-1900:text-[20px] custom-2500:text-[24px] custom-3500:text-[28px]"
						>
							{publicationInfo.title}
						</h3>
					) : (
						<h3
							className="mt-[9.27px] text-center font-semibold text-[10.23px]
							custom-400:text-[12px] custom-500:text-[16px] custom-700:text-[19.74px] custom-1900:text-[24px] custom-2500:text-[28px] custom-3500:text-[32px]"
						>
							{publicationInfo.title}
						</h3>
					)}

					<div
						className="flex justify-between items-center w-[100%] font-light text-[8px]
						custom-400:text-[11px] custom-500:text-[12px] custom-1900:text-[16px] custom-2500:text-[19px] custom-3500:text-[22px]"
					>
						<div
							className="flex items-center w-[18px] h-[18px]
							custom-420:w-[18px] custom-500:w-[20px] custom-600:w-[23px] custom-1900:w-[40px] custom-2500:w-[50px] custom-3500:w-[60px]
							custom-420:h-[18px] custom-500:h-[20px] custom-600:h-[23px] custom-1900:h-[40px] custom-2500:h-[50px] custom-3500:h-[60px]"
						>
							<img alt="" src="/icons/like.png" className="w-full" />

							<p className="ml-[2px]">{publicationInfo.score}</p>
						</div>

						{userRole === "ADMIN" && (
							<div className="flex items-center">
								<p className="mr-[5px]">Estado</p>

								<div
									className={`w-[12px] h-[12px] rounded-full ${stateColor}
								custom-500:w-[15px] custom-1900:w-[25px] custom-3500:w-[30px]
								custom-500:h-[15px] custom-1900:h-[25px] custom-3500:h-[30px]`}
								></div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default PublicationCard;
