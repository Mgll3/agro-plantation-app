import { ReactElement } from "react";
import { ProducerRequestsListType } from "../adminTypes";
import ProducerRequestCard from "./ProducerRequestCard";

type ProducerRequestsListProps = {
	requestsList: ProducerRequestsListType;
	onClickShowDetails: () => void;
};

function ProducerRequestsList({ requestsList, onClickShowDetails }: ProducerRequestsListProps) {
	function renderRequestsList() {
		const listElements: ReactElement[] = [];
		if (requestsList.length === 0) {
			return (
				<p
					className="text-[1.4rem] text-center
					custom-500:text-[1.6rem] custom-700:text-[2rem] custom-900:text-[2.4rem]  custom-1200:text-[2.8rem] custom-1900:text-[3.2rem] custom-2500:text-[3.8rem] custom-3500:text-[4.5rem]"
				>
					- No hay solicitudes pendientes -
				</p>
			);
		} else {
			for (let i = 0; i < requestsList.length; i++) {
				listElements.push(
					<ProducerRequestCard
						key={requestsList[i].id}
						request={requestsList[i]}
						onClickShowDetails={onClickShowDetails}
					/>
				);
			}
			return listElements;
		}
	}

	return (
		<>
			<h1
				className="mb-[3.2rem] text-[1.6rem] text-center font-semibold
							custom-1900:mb-[4.5rem] custom-2500:mb-[8rem] custom-3500:mb-[10rem]
							custom-500:text-[2rem] custom-700:text-[2.5rem] custom-900:text-[3rem] custom-1200:text-[3.5rem] custom-1900:text-[4rem] custom-2500:text-[5rem] custom-3500:text-[7rem]"
			>
				Aprueba nuevos perfiles de productores
			</h1>
			<div
				className="w-full
				custom-500:w-[90%] custom-700:w-[80%] custom-1000:w-[70%] custom-1200:w-[65%] custom-1400:w-[59.67%] custom-1900:w-[54%] custom-3500:w-[45%]"
			>
				{renderRequestsList()}
			</div>
		</>
	);
}

export default ProducerRequestsList;
