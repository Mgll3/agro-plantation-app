import { UserType } from "./adminTypes";
import { PublicationType } from "../publicationsList/publicationsListTypes";

type ViewerPropsType = {
	itemsList: UserType[] | PublicationType[]
}

function Viewer( {itemsList}: ViewerPropsType) {


	return (
		<div className="">
			
			{/* {
				if (email in itemsList) {
					itemsList.map( (user) => {

					});
				}
			} */}

		</div>
	);
}

export default Viewer;
